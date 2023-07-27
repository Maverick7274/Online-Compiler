const {exec, spawn} = require('child_process');
const path = require('path');


const executeGo = (filepath, inputFilePath) =>
{
    return new Promise((resolve, reject) => {
        exec(`go run  ${filepath}  < ${inputFilePath}`, (error, stdout, stderr) => {
            error && reject({error, stderr})
            stderr && reject(stderr);
            resolve(stdout);
        })
    })

};



module.exports =
{
    executeGo
}