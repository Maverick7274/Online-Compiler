const {exec} = require('child_process');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


const outputPath = path.join(__dirname, "outputs");
// const inputPath = path.join(__dirname, "inputs");

if (!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeC = (filepath, inputFilePath) =>
{

    const jobId = path.basename(filepath).split(".")[0];
    const outPath =path.join(outputPath, `${jobId}.out`);
    
    return new Promise((resolve, reject) => {
        exec(`gcc ${filepath} -o ${outPath} && ${outPath} < ${inputFilePath}`, (error, stdout, stderr) => {
            error && reject({error, stderr})
            stderr && reject(stderr);
            resolve(stdout);
        })
    })
        

};



module.exports =
{
    executeC
}