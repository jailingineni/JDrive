const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const Jimp = require("jimp");
const path = require('path');
const multer = require ("multer");
var cors = require('cors')
const bodyParser = require('body-parser');
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


const {getPictureById, getImageMetadata, applyWatermark, getDetailsByFilename, getDeets} = require('./index.js');
const details = require('./details.js');
const { ExifImage } = require('exif');


// GET image/<filename>
// GET image/<filename>/metadata

// POST image/watermark 
  // return true/fals
 // -> returns base64 image of the watermarked thing

 // error codes
 // render images in response (see how to return b64)

 // GET image/list
    // returns an list of images in the directory []




/*

try{
    // code to run

    // send the success status code and response
}catch(ex){
    // send the api response with the status code
    // and error message
}
*/
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
    res.send({details});
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
    const { title, subtitle, id} = req.body;

    const newDetail = {
      title,
      subtitle, 
      id
    };
    details.push(newDetail);
  

  
    // const detailsString = `const details = ${JSON.stringify(details, null, 4)};\n\nmodule.exports = details;`;
  
    // fs.writeFile(detailsPath, detailsString, (err) => {
    //   if (err) {
    //     console.error('Failed to write to file', err);
    //     return res.status(500).json({ message: 'Failed to write to file' });
    //   }
      res.status(200).json({ message: 'New detail added successfully', title });

  });
  
  
//   app.get('/uploadImage', (req, res) => {
//     res.render("uploadImage");
//   });

  app.post('/uploadImage', upload.single('image'), (req, res) => {
const uniqueId = req.file.filename;
const modifiedId = uniqueId.replace('.jpg', '');
res.send(modifiedId);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})