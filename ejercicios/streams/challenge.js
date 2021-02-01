const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback){
        str = chunk.toString();
        const camelCase = camelize(str);
        this.push(camelCase);
        callback();
    }
})



function camelize(str) {
    return str.replace(/\W+(.)/g, function(match, chr)
     {
          return chr.toUpperCase();
      });
  }

process.stdin.pipe(transformStream).pipe(process.stdout);