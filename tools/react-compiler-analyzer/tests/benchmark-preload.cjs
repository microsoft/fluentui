const fs = require('node:fs');
const Module = require('node:module');

const originalLoad = Module._load;
let transforms = 0;
const adapted = new WeakMap();
Module._load = function (request, ...args) {
  const loaded = originalLoad.call(this, request, ...args);
  if (
    request !== 'oxc-transform-react' &&
    request !== '@babel/core' &&
    !request.endsWith('/@babel/core/lib/index.js')
  ) {
    return loaded;
  }
  if (!adapted.has(loaded)) {
    const wrapped = { ...loaded };
    for (const key of ['transform', 'transformSync', 'transformAsync', 'transformFromAstAsync']) {
      if (typeof loaded[key] === 'function') {
        wrapped[key] = (...parameters) => {
          transforms++;
          return loaded[key](...parameters);
        };
      }
    }
    adapted.set(loaded, wrapped);
  }
  return adapted.get(loaded);
};

process.once('exit', () => {
  fs.writeFileSync(
    process.env.RCA_BENCHMARK_METRICS,
    JSON.stringify({ maxRSSKiB: process.resourceUsage().maxRSS, transforms }),
  );
});
