// @ts-check
const fs = require('fs');

// @ts-ignore
const flamebearer = require('flamebearer');

module.exports = function(buf) {
  console.time('Parsed JSON in');
  let json = {};
  try {
    json = JSON.parse(buf.toString('utf8'));
  } catch (e) {
    // noop
  }
  if (!json.code || !json.ticks) {
    console.log('Invalid input; expected a V8 log in JSON format. Produce one with:');
    console.log('node --prof-process --preprocess -j isolate*.log');
    return;
  }
  console.timeEnd('Parsed JSON in');

  console.time('Processed V8 log in');
  const { names, stacks } = flamebearer.v8logToStacks(json);
  const levels = flamebearer.mergeStacks(stacks);
  console.timeEnd('Processed V8 log in');

  const vizSrc = fs.readFileSync(require.resolve('flamebearer/viz.js'), 'utf8');
  const src = fs
    .readFileSync(require.resolve('flamebearer/index.html'), 'utf8')
    .toString()
    .split('<script src="viz.js"></script>')
    .join(`<script>${vizSrc}</script>`)
    .split('/* BIN_SPLIT */')
    .filter((str, i) => i % 2 === 0)
    .join('')
    .split('/* BIN_PLACEHOLDER */')
    .join(`names = ${JSON.stringify(names)};\n` + `levels = ${JSON.stringify(levels)};\n` + `numTicks = ${stacks.length};`);

  return src;
};
