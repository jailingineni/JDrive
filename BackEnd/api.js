const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
const Jimp = require("jimp");
const {getPictureById, getImageMetadata, applyWatermark, getListOfPictures} = require('./index.js');


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


app.get('/', (req, res) => {
    res.send("Hi");
  })

  app.get('/image/list', (req, res) => {
    const filenames = getListOfPictures();
    res.send(filenames);
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
  
    app.get('/image/:filename/metadata', (req, res) => {
    const filename = req.params.filename;
    const metadata = getImageMetadata(filename);
    if (metadata) {
        res.send(metadata)
    }
    else {
        res.status(404).send('File or Path does not Exist');
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})