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
const dataFilePath = path.join(__dirname, 'data.json');
const usersFilePath = path.join(__dirname, 'users.json');
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


const {getPictureById, getImageMetadata, applyWatermark, getDetailsByFilename, loadData, saveData, deleteData} = require('./index.js');
const details = require('./details.js');
const { ExifImage } = require('exif');



app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hi");
  })

  app.get('/image/list', (req, res) => {
    const filenames = getListOfPictures();
    res.send(filenames);
});

app.get('/image/:filename/getDetails', (req, res) => {
    const filename = req.params.filename;
    
    // Call getDetailsByFilename to fetch details
    const details = getDetailsByFilename(filename);
    
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
app.get('/image/deets', (req, res) => {
    const dataDeets = loadData();
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

app.post('/image/addDetails', (req, res) => {
    const { title, subtitle, id, Description } = req.body;
  
  
    const newDetail = {
      title,
      subtitle, 
      id, 
      Description
    };
  
    const newData = loadData();
    newData.push(newDetail);
    saveData(newData);
  
    res.status(200).json({ message: 'New detail added successfully', title });
  });
  
  
  

app.post('/uploadImage', upload.single('image'), (req, res) => {
const uniqueId = req.file.filename;
res.send(uniqueId);
});

app.delete('/deleteCard/:id', (req, res) => {
    const indexToDelete = req.params.data
    const deleted = deleteData(indexToDelete)

res.send({deleteData})

});

app.post('/users/create', (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
  
    // Generate a unique ID for the user
    const userId = uuidv4();
    
    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          res.status(500).send('Error creating user');
          return;
        }
  
    // Construct user object with unique ID
    const newUser = {
      id: userId,
      FirstName,
      LastName,
      Email,
      Password: hashedPassword
    };
  
    // Convert user object to JSON string
    const userData = JSON.stringify(newUser, null, 2);
  
    // Ensure the 'users' folder exists

  
    // Write to a JSON file within the 'users' folder
    fs.writeFile(usersFilePath, userData, (err) => {
      if (err) {
        console.error('Error writing user data to file:', err);
        res.status(500).send('Error saving user');
        return;
      }
      console.log(`User data saved to ${usersFilePath}`);
      res.status(200).send('User created successfully');
    });
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
