const fs = require('fs'); 
const { resolve } = require('path');

let data = fs.readFileSync(resolve('input.csv'), 'utf-8').split('\r\n');
let splitedArr = data.map(user => user.split(','));

let outPutArr = [
  [ 'Name /\ Date' ]
]

for (let i = 1; i < splitedArr.length; i += 1 ) {
  if (outPutArr[0][outPutArr[0].length-1] !== splitedArr[i][1]) outPutArr[0].push(splitedArr[i][1]); // date's row
  let idDate = outPutArr[0].indexOf(splitedArr[i][1]); // position of current date in date's row  
  if (!outPutArr.some(name => name[0] === splitedArr[i][0])) { // currentName !== AllPreviousNames
    let tempArr = [splitedArr[i][0]];
    if (idDate === 1) tempArr.splice(idDate, 0, splitedArr[i][2]); // add some hours at first cell
    if (idDate > 1) {
      for (let k = 1; k < idDate; k += 1) {
        tempArr.push(0); // push 0 hours idDate times after first cell
      }
      tempArr.push(splitedArr[i][2]); // push some hours after first cell
    }
    outPutArr.push(tempArr);
  } else {
    outPutArr.forEach(name => {
      if (name[0] === splitedArr[i][0]) { // currentName === AllPreviousNames
        let diff = (idDate-(name.length-1));
        if (diff > 1) {
          for (let k = 1; k < diff; k += 1) {
            name.push(0); // push 0 hours diff times after first cells
          }
          name.push(splitedArr[i][2]); // push some hours after first cells
        } else {
          name.push(splitedArr[i][2]); // push some hours after first cells
        }
      } 
    })
  }
}

for (let i = 0; i < splitedArr.length; i += 1 ) {  
  outPutArr.forEach(name => {
    if (name[0] === splitedArr[i][0]) {
      let countOfZero = (outPutArr[0].length-1) - (name.length-1);
        for (let k = 1; k <= countOfZero; k += 1) {
          name.push(0); // push 0 hours countOfZero after all cell
        }
    } 
  })  
}

outPutArr[0].map((date, index) => { // MM DD YYYY to YYYY-MM-DD
  if (index >= 1) {
    outPutArr[0][index] = new Date(date + ' 10:00').toISOString().slice(0,10);
  }
})

let csvStr = outPutArr.join('\r\n');

fs.writeFile('output.csv', csvStr, error => {
  if (error) {
    console.error(error);
    return
  } else {
    console.log('All is fine');
  }
})
