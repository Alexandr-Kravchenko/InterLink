const fs = require('fs'); 
const { resolve } = require('path');

let data = fs.readFileSync(resolve('input.csv'), 'utf-8');
let dataToArr = data.split('\r\n');
let arr = [];
for (let i = 0; i <= dataToArr.length - 1; i += 1 ) {
  arr.push(dataToArr[i].split(','));
}

let outPutArr = [
  [ 'Name /\ Date' ]
]

for (let i = 1; i < arr.length; i += 1 ) {
  if (outPutArr[0][outPutArr[0].length-1] !== arr[i][1]) outPutArr[0].push(arr[i][1]);
  if (outPutArr.some(name => name[0] === arr[i][0]) === false) {
    let tempArr = [arr[i][0]];
    let idDate = outPutArr[0].indexOf(arr[i][1]);
    if (idDate === 1) tempArr.splice(idDate, 0, arr[i][2]);
    if (idDate > 1) {
      tempArr.fill('0', 1, idDate);
      for (let k = 1; k < idDate; k += 1) {
        tempArr.push(0);
      }
      tempArr.push(arr[i][2]);
    }
    outPutArr.push(tempArr);
  } else {
    outPutArr.map(name => {
      if (name[0] === arr[i][0]) {
        let idDate = outPutArr[0].indexOf(arr[i][1])
        let diff = (idDate-(name.length-1));
        if (diff > 1) {
          for (let k = 1; k < diff; k += 1) {
            name.push(0);
          }
          name.push(arr[i][2]);
        } else {
          name.push(arr[i][2]);
        }
      } 
    })  
  }
}

for (let i = 0; i < arr.length; i += 1 ) {  
  outPutArr.map(name => {
    if (name[0] === arr[i][0]) {
      let countOfZero = (outPutArr[0].length-1) - (name.length-1);
        for (let k = 1; k <= countOfZero; k += 1) {
          name.push(0);
        }
    } 
  })  
}

outPutArr[0].map((date, index) => {
  let isoDate;
  if  (index >= 1) {
    isoDate = new Date(date + ' 10:00');
    outPutArr[0][index] = isoDate.toISOString().slice(0,10);
  }
})

let csvStr = ''
for (let i = 0; i < outPutArr.length; i += 1 ) {
  csvStr = csvStr.concat(outPutArr[i].toString(), '\n');
}

fs.writeFile('output.csv', csvStr, error => {
  if (error) {
    console.error(error);
    return
  } else {
    console.log('All is fine');
  }
})
