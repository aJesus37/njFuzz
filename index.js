const axios = require('axios');
const fs = require('fs');

//let path = readlineSync.question('What is the path to the wordlist?\n')
//let host = readlineSync.question('What is the host? Include protocol.')
let path = "tests/wordlist"
let host = "https://github.com"
let responses = [200,204,301,302,307,401,403]
let fileTypes = ['','.html','.php','.txt']
let verbose = 0;
//fileTypes.push('.html','.php','.txt')
let array = fs.readFileSync(path).toString().split('\n');

for (value of array){
    for (type of fileTypes){
        axios.head(`${host}/${value}${type}`)
            .then((response) => {
                if (responses.includes(response.status) || verbose==1){
                    console.log(`${response.request.path} (Status: ${response.status})`)
                }
            })
            .catch((error) => {
                if (responses.includes(error.response.status) || verbose==1){
                    console.log(`${error.request.path} (Status: ${error.response.status})`)
                }
            })
    }
    
}