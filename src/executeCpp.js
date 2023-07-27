const {exec} = require('child_process');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputFilePath) =>
{

    const jobId = path.basename(filepath).split(".")[0];
    const outPath =path.join(outputPath, `${jobId}.out`);
    
    return new Promise((resolve, reject) => {
        exec(`g++ ${filepath} -o ${outPath} && ${outPath} < ${inputFilePath}`, (error, stdout, stderr) => {
            error && reject({error, stderr})
            stderr && reject(stderr);
            resolve(stdout);
        })
    })
        

};



module.exports =
{
    executeCpp
}