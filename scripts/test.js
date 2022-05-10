const execSync = require('child_process').execSync;

const out = execSync('git rev-list HEAD --max-count=1 --skip=1');
const commitSha = out.toString().trim();

execSync(`yarn lage info --since ${out}`);
