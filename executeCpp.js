const {exec} = require('child_process');
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');


const compiler = require('compilex');

compiler.init();


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, input=false) =>
{

    // const jobId = path.basename(filepath).split(".")[0];
    // const outPath =path.join(outputPath, `${jobId}.out`);
    
    // return new Promise((resolve, reject) => {
    //     exec(`g++ ${filepath} -o ${outPath} && ${outPath}`, (error, stdout, stderr) => {
    //         error && reject({error, stderr})
    //         stderr && reject(stderr);
    //         resolve(stdout);
    //     })
    // })

    //if windows  
    var envData = { OS : "windows" , cmd : "g++"}; // (uses g++ command to compile )
    //else
    var envData = { OS : "linux" , cmd : "g++" }; // ( uses gcc command to compile )
    compiler.compileCPPWithInput(envData , code , input , function (data) {
        console.log(data)
        return data;
    });
        

};



module.exports =
{
    executeCpp
}