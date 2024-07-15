/*
fileName = string
*/

const fs = require ("fs"); //import filesystem module
const path = require('path');
const jimp = require('jimp-watermark');
const { error } = require("console");
const details = require('./details');
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
    return new Promise((resolve, reject) => {
        const directoryPath = path.join(__dirname, 'Sample Images');
        const filePath = path.join(directoryPath, fileName + '.jpg');

        if (fs.existsSync(filePath)) {
            try {
                new ExifImage({ image: filePath }, function (error, exifData) {
                    if (error) {
                        console.error('Error reading EXIF data:', error);
                        reject('Error processing metadata');
                    } else {
                        console.log('EXIF Data:', exifData); // Debugging step
                        const dates = {
                            ModifyDate: exifData.image.ModifyDate,
                            DateTimeOriginal: exifData.exif.DateTimeOriginal,
                            CreateDate: exifData.exif.CreateDate
                        };
                        resolve(dates);
                    }
                });
            } catch (error) {
                console.error('Error Processing Metadata', error);
                reject('Error Processing Metadata');
            }
        } else {
            console.log('File or Path does not exist');
            resolve(false);
        }
    });
}


function getDetailsByFilename(filename) {
const fileDetails = details.find(item => item.id === filename);
return fileDetails
}

function getDeets() {
    return details;
}

// function uploadImage (filename) {

// }

// function uploadDetails (filename) {

// }

// function getDetailsByIndex(index) {
//     if (index >= 0 && index < details.length) {
//         return details[index].title; // Return the title of the object at the specified index
//     } else {
//         throw new Error('Index out of bounds');
//     }
// }

// Example usage:
// const fileName = "canon-ixus.jpg";
// const index = 1;

// console.log("Details by filename:", getDetailsByFilename(fileName));
// console.log("Title by index:", getImageMetadata('olympus-d320l'));



module.exports = {
    getImageMetadata, getPictureById, applyWatermark, getDetailsByFilename, getDeets
}