//  Editor Textarea 
const editorTextarea = document.getElementById("editor-textarea");

function onCodeSubmit (){

    let code = editor.getSession().getValue();
    editorTextarea.value = code;
    localStorage.setItem("cpp", code)

    console.log(editorTextarea.value)

    return false;
}



// Local Storage

boiler_plate_cpp_code = `// You would be required to use the command                
//line input instead of 'cin', and input can be provided below
#include <iostream>;

using namespace std;

int main(int argc, char* argv[]){

    cout << "Hello, World!";

    return 0;
}`

// Code from localstorage
let storedCppCode;

if (localStorage.getItem("cpp") != null){
    storedCppCode = localStorage.getItem("cpp")
}
else{
    storedCppCode = boiler_plate_cpp_code;
}

editor.getSession().setValue(storedCppCode);

