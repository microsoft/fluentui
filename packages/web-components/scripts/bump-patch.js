import fs   from 'fs';
import path from 'path';

// you can pass the preid (e.g. "beta") as first arg; defaults to "beta"
const [, , preid = 'beta'] = process.argv;

const pkgPath = path.resolve(process.cwd(), 'package.json');
const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

// Match either:
//  - 1,2,3 = major,minor,patch, 4=preid, 5=prenum
//  - or just 1,2,3 for plain releases
const re = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z\-]+)\.(\d+))?$/;
const m  = version.match(re);

if (!m) {
  console.error(`✘ Could not parse version "${version}"`);
  process.exit(1);
}

let [ , major, minor, patch, existingPreid, prenum ] = m;
major = +major; minor = +minor; patch = +patch;

// decide new version
let newVersion;
if (existingPreid === preid && prenum != null) {
  // bump existing prerelease counter
  newVersion = `${major}.${minor}.${patch}-${preid}.${+prenum + 1}`;
} else {
  // start a new prerelease off current patch
  newVersion = `${major}.${minor}.${patch}-${preid}.0`;
}

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');

console.log(`version bumped: ${version} → ${newVersion}`);
