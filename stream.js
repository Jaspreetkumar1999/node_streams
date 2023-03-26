const { Readable, Writable } = require('stream');

const readableStream = new Readable({
    highWaterMark: 2,
    read() { }
})

const writeableStream = new Writable({
    write(s) {
        console.log("writing", s)
    }
});

readableStream.on('data', (chunk) => {
    // console.log("Chunk", chunk.toString())
    writeableStream.write(chunk)
})


// readableStream.push("hello from coders")

