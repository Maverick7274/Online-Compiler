// Modules
const fs = require('fs');
const path = require("path");
const { v4 : uuid } = require('uuid');

const dirCodes = path.join(__dirname, "codes");
const dirInput = path.join(__dirname, "inputs")


if (!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes, {recursive: true});
}

if (!fs.existsSync(dirInput))
{
    fs.mkdirSync(dirInput, {recursive: true});
}


// File is being Generated, with a file name of format : I.D.(unique I.D.).extenstion(format)
const generateFile = (format, content, userInput) =>
{
    console.log(userInput)
    const jobId = uuid();
    const filename = `${jobId}.${format}`;
    const inpFileName = `${jobId}.txt`;
    const inpFilePath = path.join(dirInput, inpFileName);
    const filepath = path.join(dirCodes, filename);
    fs.writeFileSync(filepath, content);
    fs.writeFileSync(inpFilePath, userInput);
    return [filepath, inpFilePath];
};

module.exports = 
{
    generateFile,
};