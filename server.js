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


// Request To Compile the Given code
app.post("/compiler", async (req, res) =>
{
    
    const language = req.body.language;
    const code = req.body.code_ide;

    // To make sure there is some code entered
    if(code === undefined || code === "" || code === " " || code === "\t" || code === "\n")
    {
        return res.status(200).render("compiler", {output: "$ Empty Code Body!"});
    }

    if (code === "null input"){
        return res.status(200).render("compiler", {output: "$ User input is still in development, Stay Tuned for the Updates!"})
    }


    try{
    
    // to generate a temporary code file for given code 
    const filepath = generateFile(language, code);

    let output; // Output after code execution
    let jobId;  // Job ID (the filename generated without extension)

    let outPath;   // Path to the output files generated
    const outputPath = path.join(__dirname, "src/outputs"); // Folder where outputs are generated


    function deleteTempFiles() {
        jobId = path.basename(filepath).split(".")[0];
        outPath =path.join(outputPath, `${jobId}.out`);
        fs.unlink(outPath, (err) => {
            if (err) throw err;
        });
    }

    
    switch (language) {
        case "cpp":
            output = await executeCpp(filepath);
            deleteTempFiles();
            break;

        case "c":
            output = await executeC(filepath);
            deleteTempFiles();
            break;

        case "py":
            output = await executePy(filepath);
            jobId = outPath = false;
            break;

        case "go":
            output = await executeGo(filepath);
            jobId = outPath = false;
            break;

        case "f90":
            output = await executeFortran(filepath);
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




