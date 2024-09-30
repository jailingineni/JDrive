const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const Jimp = require("jimp");
const path = require('path');
const multer = require ("multer");
const bcrypt = require('bcryptjs');
var cors = require('cors')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const usersFilePath = path.join(__dirname, './data/users.json');
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
         cb(null, 'Sample Images');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage })
app.set('view engine', 'ejs');


const {getPictureById, getImageMetadata, applyWatermark, getDetailsByFilename, loadData, saveData, deleteData, getUserByEmail} = require('./index.js');
const details = require('./data/details');
const { ExifImage } = require('exif');



app.use(cors());
app.use(bodyParser.json());

app.get('/hi', (req, res) => {
    res.send("Hi");
  })

  app.get('/image/list', (req, res) => {
    const filenames = getListOfPictures();
    res.send(filenames);
});

app.get('/image/:filename/getDetails/:userid', (req, res) => {
    const filename = req.params.filename;
    const userID  = req.params.userid;
    
    // Call getDetailsByFilename to fetch details
    const details = getDetailsByFilename(userID,filename);
    
    if (details) {
        // If details are found, send them in the response
        res.send({
            title: details.title,
            subtitle: details.subtitle,
            date: details.date,
            Description: details.Description,
            // Include other properties as needed
        });
    } else {
        // If details are not found, send 404 Not Found status
        res.status(404).send('File details not found');
    }
});
app.get('/image/deets/:userid', (req, res) => {
    const userId = req.params.userid;
    const dataFilePath = path.join(__dirname, 'data', 'details', `${userId}.json`);
    const dataDeets = loadData(dataFilePath);
    res.json({dataDeets});
});

  app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    try {
        const data = getPictureById(filename);
        if (data) {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Content-Length': data.length
            });
            res.end(data);
        } else {
            res.status(404).send('File or Path does not Exist');
        }
    } catch (error) {
        console.error('Error in API endpoint:', error.toString());

        if(error.toString().includes("File or Path does not Exist")){
            res.status(404).send('File or Path does not Exist');
        }
        res.status(500).send('Internal Server Error');
    }
});
  
app.get('/image/:filename/metadata', async (req, res) => {
    const filename = req.params.filename;
    try {
        const metadata = await getImageMetadata(filename);
        if (metadata) {
            res.send(metadata);
        } else {
            res.status(404).send('File or Path does not Exist');
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



app.post('/image/:filename/watermark', (req, res) => {
    const filename = req.params.filename;
    const newImagePath = applyWatermark(filename);

    if (newImagePath) {
        try {
            const metadata = getPictureById(filename);
            return res.send(metadata);
        } catch (error) {
            console.error('Error getting picture:', error);
            res.status(500).send({ success: false, message: 'Watermarking failed' });
        }
    } else {
        res.status(404).send({ success: false, message: 'File not found or watermarking failed' });
    }
});

app.post('/image/addDetails/:userid', (req, res) => {
    const LoggedInUser = req.params.userid;
    const { title, subtitle, id, Description } = req.body;
  
    const newDetail = {
      title,
      subtitle, 
      id, 
      Description
    };
    const dataFilePath = path.join(__dirname, 'data', 'details', `${LoggedInUser}.json`);
    const newData = loadData(dataFilePath);
    newData.push(newDetail);
    saveData(dataFilePath,newData);
  
    res.status(200).json({ message: 'New detail added successfully', title });
  });
  
  
  

app.post('/uploadImage', upload.single('image'), (req, res) => {
const uniqueId = req.file.filename;
res.send(uniqueId);
});

app.delete('/deleteCard/:id/:userid', (req, res) => {
    const indexToDelete = req.params.data
    const userIndex = req.params.userid
    const deleted = deleteData(userIndex,indexToDelete)

res.send({deleteData})

});



app.post('/users/create', async (req, res) => {
  const { FirstName, LastName, Email, Password } = req.body;

  // Check if the email already exists
  const existingUsers = loadData(usersFilePath);
  const userExists = existingUsers.some(user => user.Email === Email);

  if (userExists) {
    return res.status(202).send('Email already exists. Please use a different email.');
  }

  // Generate a unique ID for the user
  const userId = uuidv4();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Construct user object with unique ID and hashed password
    const newUser = {
      id: userId,
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
    };

    // Save the new user to your data store
    existingUsers.push(newUser);
    saveData(usersFilePath, existingUsers);

    const filePath = path.join(__dirname, 'data', 'details', `${userId}.json`);
    fs.writeFile(filePath, '[]', (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Empty file created successfully with ID:');
        }
    });


    res.status(201).send('User created successfully');
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).send('Error creating user');
  }
});


app.get('/users/:email/userDetails', (req, res) => {
    const email = req.params.email;

    // Function to find user by email

    // Fetch user details
    const user = getUserByEmail(email);

    if (user) {
        // Check if user has details array and is not empty
        if (user.details && user.details.length > 0) {
            res.send(user.details);
        } else {
            res.status(404).send('User details not found');
        }
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/users/checkEmail/:email', (req, res) => {
    const email = req.params.email;

    // Read the users file
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ error: 'Unable to read users file' });
        }

        let users;
        try {
            users = JSON.parse(data); // Parse the JSON data
        } catch (parseError) {
            console.error(parseError);
            return res.status(500).send({ error: 'Error parsing users file' });
        }

        // Check if any user has the given email
        const userExists = users.some(user => user.Email === email);

        res.send({ exists: userExists });
    });
});

app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Load user data
    const users = loadData(usersFilePath);
  
    // Find user by email
    const user = users.find(user => user.Email === email);
  
    if (user) {
      // Compare password using bcrypt.compare
      try {
        const passwordMatch = await bcrypt.compare(password, user.Password);
  
        if (passwordMatch) {
            loggedInUserId = user.id;
            const filePath = path.join(__dirname, 'data', 'details', `${user.id}.json`);
    
            // Read the file content
            fs.readFile(filePath, 'utf8', (err, data) => {
              if (err) {
                console.error('Error reading file:', err);
                res.status(500).send('Error reading user details');
                return;
              }
              
              // Send file content
              res.json({
                userId: user.id,
                details: JSON.parse(data)
            });
        });
          } else {
          // Password does not match
          res.status(401).send('Incorrect password');
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).send('Error comparing passwords');
      }
    } else {
      // User not found
      res.status(404).send('User not found');
    }
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
