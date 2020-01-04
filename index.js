
let { basename, extname, dirname, join } = require('path')
  ,  { readFile } = require('fs')
;

module.exports = function splintered () {
  return {
    async markup ({ content, filename }) {
      let dir = dirname(filename)
        , bn = basename(filename, extname(filename))
      ;
      return new Promise((resolve, reject) => {
        makeFileReader(dir, bn, 'mjs', 'script context="module"', (err, mod) => {
          if (err) return reject(err);
          makeFileReader(dir, bn, 'js', 'script', (err, js) => {
            if (err) return reject(err);
            makeFileReader(dir, bn, 'css', 'style', (err, css) => {
              if (err) return reject(err);
              resolve({ code: `\n${[mod, js, css].filter(Boolean).join('')}${content}` });
            });
          });
        });
      });
    },
  };
};

function makeFileReader (directory, base, extension, elName, cb) {
  readFile(join(directory, `${base}.${extension}`), 'utf8', (err, data) => {
    if (err) return cb(null); // if we can't read it's actually fine
    cb(null, `<${elName}>\n${data}</${elName.replace(/\s.*/, '')}>\n\n`);
  });
}
