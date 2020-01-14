
let { join } = require('path')
  , { equal, deepEqual } = require('assert')
  , { readFile, accessSync } = require('fs')
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
          resolve({
            code,
            expected,
            dependencies: result.dependencies,
            expectedDependencies: listDeps(base),
          });
        });
      }, reject);
    });
  });
}

function listDeps (base) {
  return ['mjs', 'js', 'css']
    .map(ext => join(__dirname, 'fixtures', `${base}.${ext}`))
    .filter(f => {
      try {
        accessSync(f);
        return true;
      }
      catch (e) {
        return false;
      }
    })
  ;
}

describe('preprocessing', () => {
  it('handles all at once', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('all');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
  it('handles empty', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('empty');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
  it('handles modules', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('module');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
  it('handles nothing', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('nothing');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
  it('handles script', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('script');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
  it('handles style', async () => {
    let { code, expected, dependencies, expectedDependencies } = await runFixture('style');
    equal(code, expected);
    deepEqual(dependencies, expectedDependencies);
  });
});
