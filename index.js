
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
        makeFileReader(dir, bn, 'mjs', 'script context="module"', (err, mod, modDep) => {
          if (err) return reject(err);
          makeFileReader(dir, bn, 'js', 'script', (err, js, jsDep) => {
            if (err) return reject(err);
            makeFileReader(dir, bn, 'css', 'style', (err, css, cssDep) => {
              if (err) return reject(err);
              let dependencies = [modDep, jsDep, cssDep].filter(Boolean);
              resolve({ code: `\n${[mod, js, css].filter(Boolean).join('')}${content}`, dependencies });
            });
          });
        });
      });
    },
  };
};

function makeFileReader (directory, base, extension, elName, cb) {
  let file = join(directory, `${base}.${extension}`);
  readFile(file, 'utf8', (err, data) => {
    if (err) return cb(null); // if we can't read it's actually fine
    cb(null, `<${elName}>\n${data}</${elName.replace(/\s.*/, '')}>\n\n`, file);
  });
}
