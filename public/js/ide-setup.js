//  Editor Textarea 
const editorTextarea = document.getElementById("editor-textarea");
const langSelector = document.getElementById("lang-selector");


// Initializing Values
let lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "cpp";
langSelector.value = lang;


// Change Syntax Highlighting according to the selected language
function changeHighlight(lang) {

    // will store the syntax highlighting mode
    let langSyntaxMode;

    switch (lang) {
        case "cpp":
            langSyntaxMode = 'c_cpp'
            break;

        case "c":
            langSyntaxMode = 'c_cpp'
            break;

        case "py":
            langSyntaxMode = 'python'
            break;

        case "go":
            langSyntaxMode = 'golang'
            break;

        case "f90":
            langSyntaxMode = 'fortran'
            break;
    }

    editor.session.setMode(`ace/mode/${langSyntaxMode}`);
}



// To change saved code in local storage
function changeCode(lang) {
    
    let storedCode; // Code from localstorage

    if (localStorage.getItem(lang) != null){
        storedCode = localStorage.getItem(lang)
    }
    else{
        switch (lang) {
            case "cpp":
                storedCode  = boiler_plate_cpp_code
                break;

            case "c":
                storedCode  = boiler_plate_c_code
                break;

            case "py":
                storedCode  = boiler_plate_py_code
                break;

            case "go":
                storedCode  = boiler_plate_go_code
                break;

            case "f90":
                storedCode  = boiler_plate_fortran_code
                break;
        }
    }

    editor.getSession().setValue(storedCode);
}



// On Language Change
function langChange(e){

    lang = langSelector.value;
    localStorage.setItem("language", lang);
    changeHighlight(lang);
    changeCode(lang);

}




function onCodeSubmit (){

    let code = editor.getSession().getValue();
    editorTextarea.value = code;
    localStorage.setItem(lang, code)

    return false;
}




// To save Code as we write
editor.session.on('change', function() {
    let newCode = editor.getSession().getValue();
    localStorage.setItem(lang, newCode)
});







// ================== Boiler Plates for languages =====================

boiler_plate_cpp_code = `#include <iostream>

using namespace std;

int main(){

    cout << "Hello, World in C++!";

    return 0;
}`


boiler_plate_c_code = `#include <stdio.h>

int main(){

    printf("Hello, World! in C");

    return 0;
}`


boiler_plate_py_code = `print("Hello, World in Python!")`


boiler_plate_go_code = `package main

import "fmt"

func main() {

	fmt.Println("!... Hello World in Golang ...!")
}`


boiler_plate_fortran_code = `program hello
  ! This is a comment line; it is ignored by the compiler
  print *, 'Hello, World in Fortran!'
end program hello
`




// ================ Global Calls =================


changeCode(lang);
changeHighlight(lang);


// Don't Resend Code
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
