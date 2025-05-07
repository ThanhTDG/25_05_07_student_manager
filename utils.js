const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getLine(promptText) {
    return new Promise((resolve) => {
        rl.question(promptText, (input) => {
            resolve(input);
        });
    });
}

function saveFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}


async function getKeyboardInputValid(validateFunc, promptText, errorText, convertToNumber = false) {
    do {
        const input = await getLine(promptText);
        let value = input.trim();
        if (convertToNumber) {
            value = Number(value);
        }
        if (validateFunc(value)) {
            return value;
        }
        console.log(errorText);
    } while (true);
}
function loadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseError) {
                    reject(parseError);
                }
            }
        });
    })
}
module.exports = {
    getLine,
    rl,
    saveFile,
    loadFile,
    getKeyboardInputValid,
}