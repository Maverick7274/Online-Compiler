const {exec, spawn} = require('child_process');
const path = require('path');


const executeGo = (filepath) =>
{
    return new Promise((resolve, reject) => {
        exec(`go run  ${filepath}`, (error, stdout, stderr) => {
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