
let { join } = require('path')
  , { equal } = require('assert')
  , { readFile } = require('fs')
  , pp = require('..')()
;

async function runFixture (base) {
  let filename = join(__dirname, 'fixtures', `${base}.svelte`);
  return new Promise((resolve, reject) => {
    readFile(filename, 'utf8', (err, content) => {
      if (err) return reject(err);
      pp.markup({ filename, content }).then((result) => {
        readFile(join(__dirname, 'fixtures', `${base}.expected`), 'utf8', (err, expected) => {
          if (err) return reject(err);
          let code = result.code.replace(/\s+$/, '\n');
          resolve({ code, expected });
        });
      }, reject);
    });
  });
}

describe('preprocessing', () => {
  it('handles all at once', async () => {
    let { code, expected } = await runFixture('all');
    // console.log(`<${code}><${expected}>`);
    equal(code, expected);
  });
  it('handles empty', async () => {
    let { code, expected } = await runFixture('empty');
    equal(code, expected);
  });
  it('handles modules', async () => {
    let { code, expected } = await runFixture('module');
    equal(code, expected);
  });
  it('handles nothing', async () => {
    let { code, expected } = await runFixture('nothing');
    equal(code, expected);
  });
  it('handles script', async () => {
    let { code, expected } = await runFixture('script');
    equal(code, expected);
  });
  it('handles style', async () => {
    let { code, expected } = await runFixture('style');
    equal(code, expected);
  });
});
