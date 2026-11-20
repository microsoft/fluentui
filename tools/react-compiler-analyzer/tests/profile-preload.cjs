const fs = require('node:fs');
const v8 = require('node:v8');
const Module = require('node:module');

const output = process.env.RCA_PROFILE_SAMPLES;
const started = performance.now();
let transforms = 0;
let parses = 0;
let stage = 'startup';
let lastFile;
function sample() {
  const memory = process.memoryUsage();
  fs.appendFileSync(
    output,
    `${JSON.stringify({
      elapsedMs: performance.now() - started,
      stage,
      transforms,
      parses,
      ...memory,
      heapLimit: v8.getHeapStatistics().heap_size_limit,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    })}\n`,
  );
}

const originalLoad = Module._load;
const adapted = new WeakMap();
Module._load = function (request, ...args) {
  const loaded = originalLoad.call(this, request, ...args);
  if (request !== 'oxc-transform-react' && request !== 'oxc-parser') {
    return loaded;
  }
  if (!adapted.has(loaded)) {
    const wrapped = { ...loaded };
    for (const key of request === 'oxc-parser' ? ['parseSync'] : ['transform', 'transformSync']) {
      if (typeof loaded[key] !== 'function') {
        continue;
      }
      wrapped[key] = (...parameters) => {
        stage = key;
        if (key === 'parseSync') {
          parses++;
        } else {
          transforms++;
        }
        if (parameters[0] !== lastFile) {
          lastFile = parameters[0];
          fs.writeFileSync(`${output}.last-file`, String(lastFile));
        }
        if (transforms % 100 === 0 || parses % 100 === 0) {
          sample();
        }
        return loaded[key](...parameters);
      };
    }
    adapted.set(loaded, wrapped);
  }
  return adapted.get(loaded);
};

sample();
const timer = setInterval(sample, 500);
timer.unref();
process.once('SIGTERM', () => {
  sample();
  process.exit(124);
});
process.once('exit', sample);
