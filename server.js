// Modules
const express = require('express');
const path = require('path');
const fs = require('fs')

// Scripts for executing programming language
const { executeCpp } = require('./src/executeCpp');
const {executeC} = require('./src/executeC')
const { executePy } = require('./src/executePy');
const { executeGo } = require('./src/executeGo');
const { executeFortran } = require('./src/executeFortran');

// Generating File
const { generateFile } = require('./src/generateFile');

const app = express();

const jsonParser = express.json();


// Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Landing Page Route
app.get("/", (req, res) => 
{
    return res.render('index');

})


// Compiler Route
app.get("/compiler", (req, res) => {
    return res.render('compiler', {output: '$ // Output will be displayed here'})
})
app.get("/readme", (req, res) => {
    return res.render('readme', {output: 'README Page'})
})


// Request To Compile the Given code
app.post("/compiler", async (req, res) =>
{
    
    const language = req.body.language;
    let code = req.body.code_ide;
    const userInp = req.body.userInput;

    // To make sure there is some code entered

    if (code === "null input"){
        return res.status(200).render("compiler", {output: "$ No input given!"})
    }

    if(code === undefined || code === " " || code === "\t" || code === "\n")
    {
        return res.status(200).render("compiler", {output: "$ Empty Code Body!"});
    }


    try{
    
    // to generate a temporary code file for given code 
    let pathArr = generateFile(language, code, userInp);

    let filepath = pathArr[0];
    let inputFilePath = pathArr[1];

    let output; // Output after code execution
    let jobId;  // Job ID (the filename generated without extension)

    let outPath;   // Path to the output files generated
    let inPath;

    const outputPath = path.join(__dirname, "src/outputs"); // Folder where outputs are generated
    const inputPath = path.join(__dirname, "src/inputs");

    function deleteTempFiles() {
        jobId = path.basename(filepath).split(".")[0];
        outPath =path.join(outputPath, `${jobId}.out`);
        inPath = path.join(inputPath, `${jobId}.txt`)

        fs.unlink(outPath, (err) => {
            if (err) throw err;
        });

        fs.unlink(inPath, (err) => {
            if (err) throw err;
        })
    }

    
    switch (language) {
        case "cpp":
            output = await executeCpp(filepath, inputFilePath);
            deleteTempFiles();
            break;

        case "c":
            output = await executeC(filepath, inputFilePath);
            deleteTempFiles();
            break;

        case "py":
            output = await executePy(filepath, inputFilePath);
            jobId = outPath = false;
            break;

        case "go":
            output = await executeGo(filepath, inputFilePath);
            jobId = outPath = false;
            break;

        case "f90":
            output = await executeFortran(filepath, inputFilePath);
            deleteTempFiles();
            break;
    }
    
    
    
    // Deleting the temp files if any
    fs.unlink(filepath, (err) => {
        if (err) throw err;
    });
    
    return res.status(200).render("compiler", {output: output})
    }
    catch(e){

        return res.status(200).render("compiler", {output: e.stderr})
    }

});



const port = 5000

// Port Message
app.listen(port, () =>
{
    console.log(`Port running on ${port}`);
});




