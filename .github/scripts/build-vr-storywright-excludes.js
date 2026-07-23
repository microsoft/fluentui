#!/usr/bin/env node

const { execFileSync } = require('node:child_process');
const { readdirSync, readFileSync, statSync } = require('node:fs');
const { join } = require('node:path');

const REPO_ROOT = process.cwd();
const SUITE_CONFIG = {
  'vr-tests-react-components': {
    storiesRoot: 'apps/vr-tests-react-components/src/stories',
    storyFilePattern: /\.stories\.(ts|tsx|js|jsx|mjs)$/,
    changedMatchers: [/^packages\/react-components\/(react-[^/]+)\//],
    aliasTokensByPackage: {
      'react-table': ['DataGrid'],
      'react-datepicker-compat': ['DatePicker', 'Datepicker'],
      'react-calendar-compat': ['Calendar'],
      'react-timepicker-compat': ['TimePicker', 'Timepicker'],
      'react-message-bar': ['MessageBar'],
      'react-infolabel': ['InfoLabel'],
      'react-spinbutton': ['SpinButton'],
    },
  },
  'vr-tests': {
    storiesRoot: 'apps/vr-tests/src/stories',
    storyFilePattern: /\.stories\.(ts|tsx|js|jsx|mjs)$/,
    changedMatchers: [
      /^packages\/react\/src\/components\/([^/]+)\//,
      /^packages\/react-experiments\/src\/components\/([^/]+)\//,
      /^packages\/charts\/[^/]+\/src\/components\/([^/]+)\//,
      /^packages\/react\/([^/]+)\//,
      /^packages\/react-experiments\/([^/]+)\//,
      /^packages\/charts\/([^/]+)\//,
    ],
    aliasTokensByPackage: {
      charting: ['Chart', 'Charts'],
      piechart: ['PieChart'],
      sparklinechart: ['SparklineChart'],
    },
  },
  'vr-tests-web-components': {
    storiesRoot: 'apps/vr-tests-web-components/src/stories',
    storyFilePattern: /\.stories\.(ts|tsx|js|jsx|mjs)$/,
    changedMatchers: [
      /^packages\/web-components\/src\/([^/]+)\//,
      /^packages\/web-components\/src\/components\/([^/]+)\//,
      /^packages\/web-components\/([^/]+)\//,
    ],
    aliasTokensByPackage: {
      menulist: ['MenuList'],
      textinput: ['TextInput'],
      progressbar: ['ProgressBar'],
      radiogroup: ['RadioGroup'],
    },
  },
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

function listStoryFiles(dir, storyFilePattern) {
  const result = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const info = statSync(fullPath);
    if (info.isDirectory()) {
      result.push(...listStoryFiles(fullPath, storyFilePattern));
      continue;
    }

    if (storyFilePattern.test(entry)) {
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

function packageToTokens(packageName, aliasTokensByPackage) {
  const shortName = packageName.replace('@fluentui/', '');
  const base = shortName.replace(/^react-/, '');
  const baseToken = base
    .split('-')
    .filter(Boolean)
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');

  const aliases = aliasTokensByPackage[shortName] ?? aliasTokensByPackage[normalize(baseToken)] ?? [];
  return [baseToken, ...aliases].filter(Boolean);
}

function toIdentifierTokens(value) {
  const raw = value
    .replace(/\.[^.]+$/, '')
    .replace(/[\\/]+/g, '-')
    .split('-')
    .flatMap(part => part.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g) ?? [])
    .map(token => token.trim())
    .filter(Boolean);

  const pascal = raw.map(token => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase()).join('');
  return [...new Set([pascal, ...raw])];
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getChangedFiles(base, head) {
  try {
    const diffRange = head ? `${base}...${head}` : `${base}...HEAD`;
    const output = execFileSync('git', ['diff', '--name-only', diffRange, '--'], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });

    return output
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getChangedPackages(changedFiles, changedMatchers) {
  const result = new Set();

  for (const file of changedFiles) {
    for (const matcher of changedMatchers) {
      const match = file.match(matcher);
      if (match?.[1]) {
        result.add(match[1]);
        break;
      }
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
  const suite = args.suite || 'vr-tests-react-components';
  const suiteConfig = SUITE_CONFIG[suite];
  const base = args.base || process.env.NX_BASE;
  const head = args.head || process.env.NX_HEAD;

  if (!suiteConfig) {
    console.log(`Unknown suite '${suite}'. Falling back to full VR run.`);
    writeGithubOutput('exclude_patterns', '');
    process.exitCode = 0;
    return;
  }

  const storiesRoot = join(REPO_ROOT, suiteConfig.storiesRoot);

  debugLog(debug, 'Suite:', suite);
  debugLog(debug, 'Base SHA:', base || '(missing)');
  debugLog(debug, 'Head SHA:', head || '(default HEAD)');
  debugLog(debug, 'Stories root:', storiesRoot);

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

  const changedPackages = getChangedPackages(changedFiles, suiteConfig.changedMatchers);
  debugLog(debug, 'Changed package candidates:', [...changedPackages].join(', ') || '(none)');

  if (!changedPackages.size) {
    console.log(`No relevant package changes detected for suite '${suite}'. Falling back to full VR run.`);
    debugLog(debug, 'Reason: changed files did not match suite-specific changed path patterns');
    writeGithubOutput('exclude_patterns', '');
    return;
  }

  const selectedTokens = new Set();
  for (const pkg of changedPackages) {
    for (const token of packageToTokens(pkg, suiteConfig.aliasTokensByPackage)) {
      selectedTokens.add(normalize(token));
    }

    for (const token of toIdentifierTokens(pkg)) {
      selectedTokens.add(normalize(token));
    }
  }
  debugLog(debug, 'Selected normalized tokens:', [...selectedTokens].join(', ') || '(none)');

  const files = listStoryFiles(storiesRoot, suiteConfig.storyFilePattern);
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
  console.log(`Selective VR enabled for '${suite}'. Included titles: ${includedTitles.length}/${allTitles.size}`);
  debugLog(debug, 'Included titles sample:', includedTitles.slice(0, 20).join(' | '));
  debugLog(debug, 'Excluded regex count:', excludedPatterns.length);
  debugLog(debug, 'Excluded regex sample:', excludedPatterns.slice(0, 20).join(' | '));
  writeGithubOutput('exclude_patterns', value);
}

main();
