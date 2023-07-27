const {exec, spawn} = require('child_process');
const path = require('path');


const executePy = (filepath, inputFilePath) =>
{
    return new Promise((resolve, reject) => {
        exec(`python3 -u ${filepath}  < ${inputFilePath}`, (error, stdout, stderr) => {
            error && reject({error, stderr})
            stderr && reject(stderr);
            resolve(stdout);
        })
    })

};



module.exports =
{
    executePy
}