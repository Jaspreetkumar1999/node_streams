const http = require('http');
const fs = require('fs');
const { Transform } = require('stream')
const PORT = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url !== "/") {

        return res.end();
    }
    // Not recommended
    // const file = fs.readFileSync("data.txt");
    // return res.end(file);

    // optimal way to stream video file
    // const readableStream = fs.createReadStream("video_file.mp4");
    // res.writeHead(200, { 'Content-Type': 'video/mp4' });
    // readableStream.pipe(res);


    // copy with not recommended Methods
    // const file = fs.readFileSync("data.txt")
    // fs.writeFileSync("output.txt", file);


    // copy with recommended Methods
    // const readableStream = fs.createReadStream("data.txt")
    // const writeStream = fs.createWriteStream("output.txt")

    // readableStream.on("data", (chunk) => {
    //     writeStream.write(chunk)
    // })


    const transformSteam = new Transform({
        transform(chunk, encoding, callback) {
            console.log('chunk', chunk.toString());
            const toUpperCaseString = chunk.toString().toUpperCase();
            callback(null, toUpperCaseString)
        }
    })

    // Streams To process data
    const sampleReadStream = fs.createReadStream("data.txt")
    const outputWritableStream = fs.createWriteStream("output.txt")

    // sampleReadStream.on('data', (chunk) => {
    //     console.log("ssss", chunk.toString())
    //     const toUpperCaseString = chunk.toString().toUpperCase();
    //     const finalString = toUpperCaseString.replaceAll(/stream/gi, "cool")

    //     outputWritableStream.write(finalString)
    // })

    sampleReadStream.pipe(transformSteam).pipe(outputWritableStream)





    res.end();
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});