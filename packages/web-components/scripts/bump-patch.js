#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

// you can pass the preid ("beta") or "stable" as first arg; defaults to "beta"
const [, , preid = 'beta'] = process.argv;

const pkgPath = path.resolve(process.cwd(), 'package.json');
const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const version = pkg.version;

const re  = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z\-]+)\.(\d+))?$/;
const m   = version.match(re);
if (!m) {
  console.error(`Could not parse version "${version}"`);
  process.exit(1);
}

let [ , major, minor, patch, existingPreid, prenum ] = m;
major = +major; minor = +minor; patch = +patch;

let newVersion;
if (preid === 'stable') {
  // plain patch bump for your v2.x "latest" line
  newVersion = `${major}.${minor}.${patch + 1}`;
} else {
  // bump or start a beta prerelease for your v3.x "beta" line
  if (existingPreid === preid && prenum != null) {
    newVersion = `${major}.${minor}.${patch}-${preid}.${+prenum + 1}`;
  } else {
    newVersion = `${major}.${minor}.${patch}-${preid}.0`;
  }
}

pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`version bumped: ${version} → ${newVersion}`);
