#!/usr/bin/env node

const { execSync } = require('node:child_process');
const { readdirSync, readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');

const REPO_ROOT = process.cwd();
const STORIES_ROOT = join(REPO_ROOT, 'apps/vr-tests-react-components/src/stories');

const aliasTokensByPackage = {
  'react-table': ['DataGrid'],
  'react-datepicker-compat': ['DatePicker', 'Datepicker'],
  'react-calendar-compat': ['Calendar'],
  'react-timepicker-compat': ['TimePicker', 'Timepicker'],
  'react-message-bar': ['MessageBar'],
  'react-infolabel': ['InfoLabel'],
  'react-spinbutton': ['SpinButton'],
};

function isDebugEnabled(args) {
  const value = args.debug;
  return value === true || value === 'true' || value === '1';
}

function debugLog(enabled, ...parts) {
  if (!enabled) {
    return;
  }

  console.log('[vr-selective][debug]', ...parts);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const current = argv[i];
    if (!current.startsWith('--')) {
      continue;
    }

    const [key, inlineValue] = current.slice(2).split('=');
    if (inlineValue !== undefined) {
      args[key] = inlineValue;
      continue;
    }

    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      args[key] = next;
      i++;
      continue;
    }

    args[key] = 'true';
  }

  return args;
}

function listStoryFiles(dir) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const info = statSync(fullPath);
    if (info.isDirectory()) {
      result.push(...listStoryFiles(fullPath));
      continue;
    }

    if (entry.endsWith('.stories.tsx')) {
      result.push(fullPath);
    }
  }

  return result;
}

function extractTitle(filePath) {
  const file = readFileSync(filePath, 'utf8');
  const match = file.match(/title\s*:\s*['\"]([^'\"]+)['\"]/);
  return match ? match[1] : null;
}

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function packageToTokens(packageName) {
  const shortName = packageName.replace('@fluentui/', '');
  const base = shortName.replace(/^react-/, '');
  const baseToken = base
    .split('-')
    .filter(Boolean)
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');

  const aliases = aliasTokensByPackage[shortName] ?? [];
  return [baseToken, ...aliases].filter(Boolean);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getChangedFiles(base, head) {
  const diffRange = head ? `${base}...${head}` : `${base}...HEAD`;
  const output = execSync(`git diff --name-only ${diffRange}`, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });

  return output
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}

function getChangedPackages(changedFiles) {
  const result = new Set();

  for (const file of changedFiles) {
    const match = file.match(/^packages\/react-components\/(react-[^/]+)\//);
    if (match) {
      result.add(match[1]);
    }
  }

  return result;
}

function writeGithubOutput(name, value) {
  const outputPath = process.env.GITHUB_OUTPUT;
  if (!outputPath) {
    return;
  }

  const line = `${name}=${value}\n`;
  require('node:fs').appendFileSync(outputPath, line);
}

function main() {
  const args = parseArgs(process.argv);
  const debug = isDebugEnabled(args);
  const base = args.base || process.env.NX_BASE;
  const head = args.head || process.env.NX_HEAD;

  debugLog(debug, 'Base SHA:', base || '(missing)');
  debugLog(debug, 'Head SHA:', head || '(default HEAD)');

  if (!base) {
    console.log('No base SHA found. Falling back to full VR run.');
    debugLog(debug, 'Reason: no base SHA detected from args or NX_BASE');
    writeGithubOutput('exclude_patterns', '');
    return;
  }

  const changedFiles = getChangedFiles(base, head);
  debugLog(debug, 'Changed files count:', changedFiles.length);
  if (changedFiles.length) {
    debugLog(debug, 'Changed files sample:', changedFiles.slice(0, 20).join(', '));
  }

  const changedPackages = getChangedPackages(changedFiles);
  debugLog(debug, 'Changed package candidates:', [...changedPackages].join(', ') || '(none)');

  if (!changedPackages.size) {
    console.log('No react-components package changes detected. Falling back to full VR run.');
    debugLog(debug, 'Reason: changed files did not match packages/react-components/react-* paths');
    writeGithubOutput('exclude_patterns', '');
    return;
  }

  const selectedTokens = new Set();
  for (const pkg of changedPackages) {
    for (const token of packageToTokens(pkg)) {
      selectedTokens.add(normalize(token));
    }
  }
  debugLog(debug, 'Selected normalized tokens:', [...selectedTokens].join(', ') || '(none)');

  const files = listStoryFiles(STORIES_ROOT);
  debugLog(debug, 'Story files discovered:', files.length);
  const allTitles = new Set();
  for (const file of files) {
    const title = extractTitle(file);
    if (title) {
      allTitles.add(title);
    }
  }

  const includedTitles = [];
  for (const title of allTitles) {
    const normalizedTitle = normalize(title);
    if ([...selectedTokens].some(token => normalizedTitle.includes(token))) {
      includedTitles.push(title);
    }
  }

  if (!includedTitles.length) {
    console.log('No deterministic story title matches for changed packages. Falling back to full VR run.');
    debugLog(debug, 'Reason: no story titles matched selected tokens');
    writeGithubOutput('exclude_patterns', '');
    return;
  }

  const excludedPatterns = [...allTitles]
    .filter(title => !includedTitles.includes(title))
    .map(title => `^${escapeRegex(title)}\\.`);

  const value = excludedPatterns.join(',');
  console.log(`Selective v9 VR enabled. Included titles: ${includedTitles.length}/${allTitles.size}`);
  debugLog(debug, 'Included titles sample:', includedTitles.slice(0, 20).join(' | '));
  debugLog(debug, 'Excluded regex count:', excludedPatterns.length);
  debugLog(debug, 'Excluded regex sample:', excludedPatterns.slice(0, 20).join(' | '));
  writeGithubOutput('exclude_patterns', value);
}

main();
