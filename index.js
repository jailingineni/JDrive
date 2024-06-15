/*
fileName = string
*/
function getPictureById(fileName) 
{
    const fs = require ("fs"); //import filesystem module
    const path = require('path');
    const directoryPath = 'Sample Images'
    const filePath = path.join(directoryPath, fileName);
    try {
        const data = fs.readFileSync(filePath); // variable data stores 
        const base64Data = data.toString('base64');
        console.log('64 Data', base64Data);
        return base64Data;
    } catch (err) {
        console.log('Error reading file:', err);
    }
}
function applyWatermark(fileName) {

   const jimp = require('jimp-watermark');
   const path = require('path');
   const directoryPath = 'Sample Images'
   const outputDirectory = 'outputs';
   const filePath = path.join(directoryPath, fileName);
   const outputFilePath = path.join(outputDirectory, fileName);
   let options = {
    'text': 'JDRIVE',
    'textSize' : 7, 
    'opacity' : 0,
    'dstPath' : './outputs'

   }
   
   jimp.addTextWatermark(filePath, options)
}

function getImageMetadata(fileName) {

    var ExifImage = require('exif').ExifImage;
    const path = require('path');
    const directoryPath = 'Sample Images'
    const filePath = path.join(directoryPath, fileName);
    new ExifImage({ image : filePath }, function (error, exifData) {
        console.log(exifData);
    });
   

}

applyWatermark("canon-ixus.jpg");
// Methods