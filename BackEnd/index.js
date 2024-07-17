/*
fileName = string
*/

const fs = require ("fs"); //import filesystem module
const path = require('path');
const jimp = require('jimp-watermark');
const { error } = require("console");
const details = require('./details');
const dataFilePath = path.join(__dirname, 'data.json');
var ExifImage = require('exif').ExifImage;

function getPictureById(fileName, folder) 
{
    const directoryPath = 'Sample Images'
    
    if (folder) {
        const directoryPath = folder
    }
        const filePath = path.join(directoryPath, fileName);
    
    
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
   const filePath = path.join(directoryPath, fileName);
   const outputFilePath = path.join(outputDirectory, fileName);
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
        const filePath = path.join(directoryPath, fileName);

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
    const data = loadData();
    const fileDetails = data.find(item => item.id === filename);
    return fileDetails;
}



function loadData() {
    if (fs.existsSync(dataFilePath)) {
      const rawData = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(rawData);
    }
    return [];
  }



  function saveData(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  function deleteData(IDToDelete) {
    let currData = loadData();
    const indexToDelete = currData.find(item => item.id === IDToDelete);

    if (IDToDelete !== -1) {
        // Remove item from array
        currData.splice(IDToDelete, 1);
         // Save updated data
         saveData(currData);
         return true; 
    }return false;


}
  

module.exports = {
    getImageMetadata, getPictureById, applyWatermark, getDetailsByFilename, loadData, saveData, deleteData
}