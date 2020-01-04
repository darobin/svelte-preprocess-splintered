
let { basename, extname, dirname, join } = require('path')
  ,  { readFile } = require('fs')
;

export default function splintered () {
  return {
    async markup ({ content, filename }) {
      let dir = dirname(filename)
        , bn = basename(filename, extname(filename))
      ;
      makeFileReader(dir, bn, 'mjs', 'script context="module"', (err, mod) => {
        if (err) throw err;
        makeFileReader(dir, bn, 'js', 'script', (err, js) => {
          if (err) throw err;
          makeFileReader(dir, bn, 'css', 'style', (err, css) => {
            if (err) throw err;
            return { code: `\n${[mod, js, css].filter(Boolean).join('')}${content}` };
          });
        });
      });
    },
  };
}

function makeFileReader (directory, base, extension, elName, cb) {
  readFile(join(directory, `${base}.${extension}`, 'utf8'), (err, data) => {
    if (err) return cb(null); // if we can't read it's actually fine
    cb(null, `<${elName}>\n${data}\n</${elName.replace(/\s.*/, '')}>\n\n`);
  });
}
