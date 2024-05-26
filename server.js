console.log('hello world')

const os = require('os');

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(
            path.join(__dirname, 'starter.txt'), 'utf-8');
        console.log(data)
        await fsPromises.writeFile(
            path.join(__dirname, 'promiseWrite.txt'), data);
        await fsPromises.appendFile(
                path.join(
                    __dirname, 'promiseWrite.txt'), '\n\nNice to meet you');
        await fsPromises.rename(
            path.join(__dirname, 'promiseWrite.txt'), path.join(
                __dirname, 'promiseComplete.txt'));
        const newData = await fsPromises.readFile(
            path.join(__dirname, 'promiseComplete.txt'), 'utf-8');
            console.log(newData)
    } catch (err) {
        console.log(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, './starter.txt'), 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })

// fs.writeFile('./starter.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// })


// fs.writeFile(path.join(__dirname, './reply.txt'), 'nice to meet you', (err) => {
//     if (err) throw err;
//     console.log('write complete');
// })

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`)
    process.exit(1);
})