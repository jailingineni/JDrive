/*
fileName = string
*/
const fs = require ("fs"); //import filesystem module
const path = require('path');
const jimp = require('jimp-watermark');
const { error } = require("console");
var ExifImage = require('exif').ExifImage;

function getPictureById(fileName, folder) 
{
    const directoryPath = 'Sample Images'
    
    if (folder) {
        const directoryPath = folder
    }
        const filePath = path.join(directoryPath, fileName + '.jpg');
    
    
    if (fs.existsSync (filePath)) {
        try {

        const data = fs.readFileSync(filePath, "base64"); // variable data stores 
        const buffer = Buffer.from(data, "base64");
        return buffer;
    } catch(error) {
        console.error('Error Converting image', error);
        throw new Error ('Error Converting image');
    }

    }
    else {
        console.log('File or Path does not Exist');
        throw new Error('File or Path does not Exist');
    }
}
function applyWatermark(fileName) {

   const directoryPath = 'Sample Images'
   const outputDirectory = 'outputs';
   const filePath = path.join(directoryPath, fileName + '.jpg');
   const outputFilePath = path.join(outputDirectory, fileName + '.jpg');
   if (fs.existsSync (filePath)) {
    try {
        let options = {
            'text': 'JDRIVE',
            'textSize' : 7, 
            'opacity' : 0,
            'dstPath' : outputFilePath
           }
           
           jimp.addTextWatermark(filePath, options)
           return outputDirectory;
    } catch (error) {
        console.error('Error Processing image', error);
        throw new Error ('Error Processing image');
    } 
    } else {
        console.log('File or Path does not Exist');
        throw new Error('File or Path does not Exist');
    }
}

function getImageMetadata(fileName) {
    
    const directoryPath = 'Sample Images'
    const filePath = path.join(directoryPath, fileName + '.jpg');
    if (fs.existsSync (filePath)) {
        try {
    new ExifImage({ image : filePath }, function (error, exifData) {
    });
    } catch (error) {
        console.error('Error Processing Metadata', error);
        throw new Error ('Error Processing Metadata');
    }
    }
    else {
        console.log ('File or Path does not Exist');
        return false;
    }

}
getListOfPictures();


function getListOfPictures(){
    const testFolder = './Sample Images/';
    if (testFolder == false) {
        console.log ("Directory is Invalid")
        throw new Error ('Cannot Find Directory');
    }
    let fileList = [];
    
    fs.readdirSync(testFolder).forEach(file => {
        fileList.push(file);
    });
    return fileList;
   



}





module.exports = {
    getImageMetadata, getPictureById, applyWatermark, getListOfPictures
}