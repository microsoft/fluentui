const rawResults = require('../dist/results.json');
const path = require('path');
const fs = require('fs');

const results = Object.keys(rawResults).map(scenario => {
  const summary = rawResults[scenario].analysis.regression.summary.split(['\n']);
  const computeClassesResult = summary.find(x => x.includes('computeClasses'));
  const relativeTime = parseFloat(
    computeClassesResult.substring(computeClassesResult.length - 3, computeClassesResult.length - 1),
    10,
  );
  return {
    name: scenario,
    numTicks: rawResults[scenario].analysis.numTicks,
    relativeTime: relativeTime,
  };
});

console.log(results);

const filePath = path.resolve(__dirname, 'results.json');
if (!fs.existsSync(filePath)) {
  const initialResults = {};
  results.forEach(res => {
    initialResults[res.name] = {};
    initialResults[res.name].numTicks = [res.numTicks];
    initialResults[res.name].relativeTime = [res.relativeTime];
  });
  fs.writeFileSync(filePath, JSON.stringify(initialResults, null, 2));
} else {
  const content = JSON.parse(fs.readFileSync(filePath).toString());
  results.forEach(res => {
    content[res.name].numTicks.push(res.numTicks);
    content[res.name].relativeTime.push(res.relativeTime);
  });

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}
