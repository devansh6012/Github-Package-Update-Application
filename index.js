#!/usr/bin/env node

// myawesometool -i input.csv axios@0.23.0
// myawesometool -update -i input.csv axios@0.23.0
 
let inputArr = process.argv.slice(2);
const csv = require('csvtojson')
const axios = require('axios');
const jsdom = require('jsdom');
const fs = require('fs');
const { exec } = require("child_process");
var path = require('path');
const compareVersion = require('compare-versions');
const editJsonFile = require("edit-json-file");

console.log(inputArr[1]);
let updateCommand = false;

if (inputArr[0] == '-update') {
    console.log('update command');
    let packCommand = inputArr[3].split("@");

    const csvFilePath = inputArr[2] + '';
    updateCommand = true;

    csvAndUpdate(packCommand, csvFilePath, updateCommand);

}
else {
    let packCommand = inputArr[2].split("@");
    // let packToBeFound = packCommand[0];
    // let packVersion = packCommand[1];

    const csvFilePath = inputArr[1] + '';
    updateCommand = false;

    csvAndUpdate(packCommand, csvFilePath, updateCommand);
}

function csvAndUpdate(packCommand, csvFilePath, updateCommand) {
    let packToBeFound = packCommand[0];
    let packVersion = packCommand[1];

    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            let dtext = "";
            if (updateCommand) {
                dtext = "name,repo,version,version_satisfied,update_pr\n";
            } else {
                dtext = "name,repo,version,version_satisfied\n";
            }

            var j = 0; // folder number

            for (let i = 0; i < jsonObj.length; i++) {
                // jsonObj.length
                // console.log(jsonObj[i].repo);
                let newUrl = '';
                if (jsonObj[i].repo.slice(-1) == '/') {
                    newUrl = jsonObj[i].repo + 'blob/main/package.json'
                }
                else {
                    newUrl = jsonObj[i].repo + '/blob/main/package.json'
                }
                console.log(newUrl);

                let responseKaPromise = axios.get(newUrl);

                responseKaPromise.then((response) => {
                    let html = response.data;

                    let dom = new jsdom.JSDOM(html);
                    let document = dom.window.document;

                    let depList = document.querySelectorAll("tbody");

                    let str = depList[0].textContent;
                    const tbodyObj = JSON.parse(str);
                    console.log(tbodyObj.dependencies);
                    console.log(tbodyObj.dependencies[packToBeFound] + '');
                    let foundPackVersion = tbodyObj.dependencies[packToBeFound].split("^")[1];
                    console.log(foundPackVersion);

                    let satisied = "";
                    let updatedPr = "";

                    if (compareVersion.compare(foundPackVersion, packVersion, '>') || compareVersion.compare(foundPackVersion, packVersion, '=')) {
                        console.log(true);
                        satisied = "true";
                        if(updateCommand){
                            dtext += jsonObj[i].name + "," + jsonObj[i].repo + "," + foundPackVersion + "," + satisied + "," + updatedPr + "\n";
                            fs.writeFileSync("output.csv", dtext, "utf-8");
                        }
                    }
                    else {
                        console.log(false);
                        satisied = "false";
                        if (updateCommand) {

                            let forkLink = "gh repo fork ";
                            let forkFolder = 'folder'+j;

                            let dirPath = path.join(forkFolder,'package.json');
                            let dirLock = path.join(forkFolder,'package-lock.json');
                            if (jsonObj[i].repo.slice(-1) == '/') {
                                forkLink += jsonObj[i].repo.slice(0, -1) + '.git --clone folder' + j;
                            }
                            else {
                                forkLink += jsonObj[i].repo + '.git --clone folder' + j;
                            }
                            

                            exec(forkLink, (error, stdout, stderr) => {
                                if (error) {
                                    console.log(`error1: ${error.message}`);
                                    return;
                                }
                                
                                console.log(`stdout1: ${stdout}`);
                                // file.pop("axios")
                                let file = editJsonFile(dirPath);
                                let depPack = "dependencies."+packToBeFound;
                                file.set(depPack, packVersion);
                                file.save();
                                fs.unlinkSync(dirLock);
                                // fs.writeFileSync(dirPath, json, "utf-8");
                                exec('npm i', { cwd: forkFolder }, (errors, stdos, stdes) => {
                                    if (errors) {
                                        console.log(`erro1.1r: ${errors.message}`);
                                        return;
                                    }

                                    console.log(`stdout2: ${stdos}`);
                                    exec('git add .', { cwd: forkFolder }, (err, stdo, stde) => {
                                        if (err) {
                                            console.log(`erro2r: ${err.message}`);
                                            return;
                                        }

                                        console.log(`stdout2: ${stdo}`);
                                        
                                        exec('git commit -m "Dependency Updated"', { cwd: forkFolder }, (erro, stdou, stder) => {
                                            if (erro) {
                                                console.log(`error3: ${erro.message}`);
                                                return;
                                            }
                                            if (stder) {
                                                console.log(`stderr3: ${stder}`);
                                                return;
                                            }
                                            console.log(`stdout3: ${stdou}`);

                                            exec('git push', { cwd: forkFolder }, (er, sto, ste) => {
                                                if (er) {
                                                    console.log(`error4: ${er.message}`);
                                                    return;
                                                }

                                                console.log(`stdout4: ${sto}`);
                                                let Commitmessage = '"Chore: update ' + packToBeFound + " to " + packVersion + '"';
                                                Commitmessage = 'gh pr create --title ' + Commitmessage + ' --body ' + Commitmessage;
                                                exec(Commitmessage, { cwd: forkFolder }, (e, so, se) => {
                                                    if (e) {
                                                        console.log(`error5: ${e.message}`);
                                                        return;
                                                    }
                                                    if (se) {
                                                        console.log(`stderr5: ${se}`);
                                                        return;
                                                    }
                                                    console.log(`stdout5: ${so}`);
                                                    updatedPr += `${so}` + "";
                                                    console.log(updatedPr);
                                                    dtext += jsonObj[i].name + "," + jsonObj[i].repo + "," + foundPackVersion + "," + satisied + "," + updatedPr + "\n";
                                                    fs.writeFileSync("output.csv", dtext, "utf-8");
                                                });

                                            });
                                        });
                                    });
                                });
                            });
                        }
                    }

                    j++;

                    console.log(updatedPr);
                    if (updateCommand) {
                        // dtext += jsonObj[i].name + "," + jsonObj[i].repo + "," + foundPackVersion + "," + satisied + "," + updatedPr + "\n";
                    }
                    else {
                        dtext += jsonObj[i].name + "," + jsonObj[i].repo + "," + foundPackVersion + "," + satisied + "\n";
                        fs.writeFileSync("output.csv", dtext, "utf-8");
                    }
                })
            }
        })
    const jsonArray = csv().fromFile(csvFilePath);
}