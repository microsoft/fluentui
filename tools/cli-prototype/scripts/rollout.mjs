import { existsSync, lstatSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { suiteAlias } from '../packages.mjs';

const playgroundRootValue = process.env.FLUENTUI_PLAYGROUND_ROOT;
if (!playgroundRootValue) {
  fail('FLUENTUI_PLAYGROUND_ROOT is required');
}

const playgroundRoot = resolve(playgroundRootValue);
const cliBin = join(playgroundRoot, 'node_modules/@fluentui/cli/bin/fluentui-cli.js');
const configPath = join(playgroundRoot, 'fluentui.config.json');
const missingConfigPath = join(playgroundRoot, 'fixtures/missing-catalog.config.json');
const probeModule = join(playgroundRoot, 'scripts/module-probe.cjs');
const resultsRoot = join(playgroundRoot, 'artifacts/cli-rollout');
const packManifestPath = resolve(dirname(fileURLToPath(import.meta.url)), '../.artifacts/pack-manifest.json');

for (const path of [cliBin, configPath, missingConfigPath, probeModule, packManifestPath]) {
  if (!existsSync(path)) {
    fail(`Missing rollout prerequisite ${path}`);
  }
}

rmSync(resultsRoot, { recursive: true, force: true });
mkdirSync(resultsRoot, { recursive: true });

const commands = [];
const apiResults = [];
const denseOutput = [];
const manifest = runJson('manifest', ['manifest', '--json']);
assertEnvelope(manifest.response, 'manifest');
const apiHelp = runCli('api-help', ['api', '--help'], { probeNoTypeScript: true }).stdout;
if (
  !apiHelp.includes('--from') ||
  !apiHelp.includes('--dense') ||
  /--(?:package|entrypoint|namespace)\b/.test(apiHelp)
) {
  fail('Normal API help must advertise --from without advanced selectors');
}
const apiContract = manifest.response.data.commands.find(command => command.command === 'api [symbol]');
if (
  !apiContract?.options.from ||
  !apiContract.options.dense ||
  !apiContract.responses.includes('fluentui.api-detail.dense') ||
  !apiContract.responses.includes('fluentui.api-index.dense') ||
  ['package', 'entrypoint', 'namespace'].some(name => !apiContract.options[name]?.hidden)
) {
  fail('The JSON manifest must retain advanced selectors with their visibility metadata');
}
for (const [name, args, code] of [
  ['invalid-from', ['--from', '../button'], 'CLI_API_FROM_INVALID'],
  ['conflicting-package', ['--from', '@fluentui/react-button', '--package', '@fluentui/react-button'], 'CLI_USAGE'],
  ['conflicting-entrypoint', ['--from', '@fluentui/react-button', '--entrypoint', '.'], 'CLI_USAGE'],
]) {
  const failure = runJson(`api-${name}`, ['api', 'Button', ...args, '--json', '--dense'], {
    expectFailure: true,
    probeNoTypeScript: true,
  });
  if (failure.record.status !== 2 || failure.response.data.code !== code) {
    fail(`${name} must fail with an actionable usage error before loading declarations`);
  }
}
for (const entrypoint of ['.', './unstable']) {
  const packageName = '@fluentui/react-components';
  const from = `${packageName}${entrypoint === '.' ? '' : entrypoint.slice(1)}`;
  const result = runJson(
    `api-from-${entrypoint === '.' ? 'root' : 'subpath'}-index`,
    ['api', '--from', from, '--metadata-mode', 'required', '--json'],
    { probeNoTypeScript: true },
  );
  const routes = result.response.data.result;
  if (
    !routes.length ||
    routes.some(route => route.entrypoint !== entrypoint || route.requestedPackage !== packageName)
  ) {
    fail(`--from ${from} must list only that exact public import path`);
  }
  const dense = runJson(`${result.record.name}-dense`, [...result.record.command.slice(1), '--dense'], {
    probeNoTypeScript: true,
  });
  const expectedRoutes = new Set(
    routes.map(route =>
      JSON.stringify({
        name: route.export,
        namespace: route.namespace,
        importPath: from,
        version: route.version,
        exportKind: route.exportKind,
        typeOnly: route.typeOnly,
        authority: route.metadata ? 'metadata' : 'declarations',
      }),
    ),
  );
  if (
    dense.response.type !== 'fluentui.api-index.dense' ||
    dense.response.data.result.length !== expectedRoutes.size ||
    dense.response.data.result.some(route => !expectedRoutes.has(JSON.stringify(route)))
  ) {
    fail('Dense listings must group conditions without erasing public bindings or authority');
  }
}

const styledButton = runApiQuery('api-styled-button', 'Button', '@fluentui/react-button', '.', 'value');
const headlessButton = runApiQuery(
  'api-headless-button',
  'Button',
  '@fluentui/react-headless-components-preview',
  './button',
  'value',
  'headless',
);
const suiteButton = runApiQuery('api-suite-button', 'Button', '@fluentui/react-components', '.', 'value', 'fluent-v9');
const buttonSignatures = {
  styled: assertBoundButtonSignature(styledButton, 'styled Button'),
  headless: assertBoundButtonSignature(headlessButton, 'headless Button'),
  suite: assertBoundButtonSignature(suiteButton, 'suite Button'),
};

const humanIndex = runCli('api-human-index', ['api', '--system', 'fluent-v9'], { probeNoTypeScript: true }).stdout;
const listedExports = humanIndex.split('\n').filter(line => /^\| `[^`]+` \| (?:value|type) \|/.test(line));
if (!listedExports.length || new Set(listedExports).size !== listedExports.length) {
  fail('Human API index is empty or contains duplicate visible exports');
}
const humanButton = runCli('api-human-button', ['api', 'Button', '--system', 'fluent-v9'], {
  probeNoTypeScript: true,
}).stdout;
if (
  runCli('api-human-dense-button', ['api', 'Button', '--system', 'fluent-v9', '--dense'], {
    probeNoTypeScript: true,
  }).stdout !== humanButton
) {
  fail('--dense without --json must leave Markdown output unchanged');
}
for (const pattern of [
  /^\| `appearance` \| .*"primary".* \| `'secondary'` \|/m,
  /^\| `disabled` \| `boolean` \| `false` \|/m,
  /^\| `size` \| .*"small".* \| `'medium'` \|/m,
]) {
  if (!pattern.test(humanButton)) {
    fail(`Human Button output is missing an enumerated prop: ${pattern}`);
  }
}
const humanButtonLines = humanButton.split('\n').length;
if (
  !humanButton.startsWith('# `Button`\n') ||
  !humanButton.includes('## Props\n') ||
  !humanButton.includes('| Prop | Type | Default | Description |') ||
  !humanButton.includes('"secondary" \\| "primary"') ||
  !humanButton.includes("| `icon` | `Slot<'span'>` |") ||
  humanButton.includes('WithSlotShorthandValue') ||
  !humanButton.includes('Control-defined (') ||
  !humanButton.includes('Inherited React/DOM (') ||
  !humanButton.includes('--include-inherited') ||
  /^\| `(aria-[\w-]+|onClick)` \|/m.test(humanButton) ||
  humanButton.indexOf('| `disabled` |') > humanButton.indexOf('Inherited React/DOM (') ||
  humanButtonLines > 100 ||
  humanButton.length > 12_000
) {
  fail(
    `Default Button output must prioritize controls and collapse native props (got ${humanButtonLines} lines, ${humanButton.length} characters)`,
  );
}
const humanExpanded = runCli(
  'api-human-button-inherited',
  ['api', 'Button', '--system', 'fluent-v9', '--include-inherited'],
  { probeNoTypeScript: true },
).stdout;
if (
  !/^\| `onClick` \| /m.test(humanExpanded) ||
  !/^\| `aria-label` \| /m.test(humanExpanded) ||
  !humanExpanded.includes("| `icon` | `Slot<'span'>` |") ||
  humanExpanded.indexOf('| `disabled` |') > humanExpanded.indexOf('| `aria-label` |')
) {
  fail('--include-inherited must expand native props after control-defined props');
}
const humanExpandedTypes = runCli(
  'api-human-button-expanded-types',
  ['api', 'Button', '--system', 'fluent-v9', '--expand-types'],
  { probeNoTypeScript: true },
).stdout;
if (
  !/^\| `icon` \| `WithSlotShorthandValue</m.test(humanExpandedTypes) ||
  /^\| `onClick` \|/m.test(humanExpandedTypes)
) {
  fail('--expand-types must restore the full slot type independently of inherited-member visibility');
}
const expandedTypesJson = runJson(
  'api-styled-button-expanded-types-json',
  [...apiArgs('Button', '@fluentui/react-button', '.'), '--expand-types'],
  { probeNoTypeScript: true },
);
if (JSON.stringify(expandedTypesJson.response.data) !== JSON.stringify(styledButton.response.data)) {
  fail('--expand-types must not replace full or presentation metadata in JSON');
}
const inheritedJson = runJson(
  'api-styled-button-inherited-json',
  [...apiArgs('Button', '@fluentui/react-button', '.'), '--include-inherited'],
  { probeNoTypeScript: true },
);
if (JSON.stringify(inheritedJson.response.data) !== JSON.stringify(styledButton.response.data)) {
  fail('--include-inherited must not change complete machine-readable API data');
}
if (
  !humanButton.includes('import { Button } from "@fluentui/react-components";') ||
  !humanButton.includes('Selected from your configured public catalogs.') ||
  /## (?:Import paths|All export routes)|\*\*(?:Package|Defined in):\*\*/.test(humanButton) ||
  /semantic reference spans|reader\.effectiveTypePartial|Record:/.test(humanButton)
) {
  fail(
    'Human Button output must recommend the configured suite, not expose implementation ownership as an import choice',
  );
}
const humanVerbose = runCli('api-human-button-verbose', ['api', 'Button', '--system', 'fluent-v9', '--verbose'], {
  probeNoTypeScript: true,
}).stdout;
if (
  (humanVerbose.match(/reader\.effectiveTypePartial:/g) ?? []).length !== 1 ||
  !humanVerbose.includes('`types, require`') ||
  !humanVerbose.includes('**Defined in:** `@fluentui/react-button@9.11.0`') ||
  !humanVerbose.includes('## All export routes') ||
  !humanVerbose.includes('| `@fluentui/react-components` | value | config |') ||
  !humanVerbose.includes("| `icon` | `Slot<'span'>` |") ||
  /^\| `onClick` \| /m.test(humanVerbose)
) {
  fail('Verbose output must retain condition information and deduplicated diagnostics');
}
const humanHeadless = runCli('api-human-headless-button', ['api', 'Button', '--system', 'headless'], {
  probeNoTypeScript: true,
}).stdout;
if (
  !/^\| `disabled` \| `boolean` \| `false` \|/m.test(humanHeadless) ||
  !humanHeadless.includes("| `icon` | `Slot<'span'>` |") ||
  !humanHeadless.includes('import { Button } from "@fluentui/react-headless-components-preview/button";') ||
  !humanHeadless.includes('Selected from your configured public catalogs.') ||
  /^\| `(appearance|shape|size)` \|/m.test(humanHeadless)
) {
  fail('Human headless Button props must retain disabled and omit styled-only props');
}
const humanProps = runCli('api-human-button-props', ['api', 'ButtonProps', '--system', 'fluent-v9'], {
  probeNoTypeScript: true,
}).stdout;
if (
  !/^\| `appearance` \| .*"primary"/m.test(humanProps) ||
  /^\| `onClick` \| /m.test(humanProps) ||
  !humanProps.includes("| `icon` | `Slot<'span'>` |") ||
  !humanProps.includes('import type { ButtonProps } from "@fluentui/react-components";')
) {
  fail('Direct props-type queries must prioritize control-defined members');
}
const policyImports = [];
for (const [system, symbol, expectedPath, human] of [
  ['fluent-v9', 'Button', '@fluentui/react-components', humanButton],
  ['headless', 'Button', '@fluentui/react-headless-components-preview/button', humanHeadless],
  ['fluent-v9', 'ButtonProps', '@fluentui/react-components', humanProps],
]) {
  const result = runJson(
    `api-recommended-${system}-${symbol}`,
    ['api', symbol, '--system', system, '--metadata-mode', 'required', '--json'],
    { probeNoTypeScript: true },
  );
  const detail = result.response.data.result;
  const recommendation = detail.recommendedImport;
  if (
    detail.importStatus !== 'selected' ||
    recommendation?.moduleSpecifier !== expectedPath ||
    recommendation.reason !== 'configured-catalog' ||
    !human.includes(recommendation.statement)
  ) {
    fail(`Human/JSON ${system} ${symbol} must share the same configured public import`);
  }
  if (
    system === 'fluent-v9' &&
    symbol === 'Button' &&
    (detail.package !== '@fluentui/react-button' ||
      !detail.routes.some(route => route.requestedPackage === '@fluentui/react-button') ||
      !detail.routes.some(route => route.requestedPackage === '@fluentui/react-components'))
  ) {
    fail('Selecting a public import must not erase implementation ownership or alternative routes from JSON');
  }
  policyImports.push(recommendation);
  const dense = assertDenseDetail(result);
  const members = dense.response.data.result.props?.[0]?.members ?? dense.response.data.result.members?.members;
  if (!members?.length || members.some(member => !human.includes(`| \`${member.name}\` |`))) {
    fail('Dense member selection must match the default Markdown view');
  }
  if (symbol === 'Button' && system === 'fluent-v9') {
    const denseBytes = Buffer.byteLength(dense.record.stdout);
    const fullBytes = Buffer.byteLength(result.record.stdout);
    if (denseBytes > 8_000 || denseBytes > Buffer.byteLength(human) * 2 || denseBytes > fullBytes * 0.1) {
      fail(
        `Dense Button must stay comparable to Markdown and at least 90% smaller than full JSON (${denseBytes}/${fullBytes} bytes)`,
      );
    }
    const appearance = members.find(member => member.name === 'appearance');
    const icon = members.find(member => member.name === 'icon');
    if (
      appearance?.default !== "'secondary'" ||
      appearance.required ||
      icon?.type !== "Slot<'span'>" ||
      icon.typeSummary !== 'slot'
    ) {
      fail('Dense Button must preserve documented defaults, optionality, and compact slot types');
    }
    assertDenseDetail(result, ['--include-inherited']);
    assertDenseDetail(result, ['--expand-types']);
    const verbose = assertDenseDetail(result, ['--verbose']);
    if (!verbose.response.data.workspaceRoot || !verbose.response.data.result.provenance?.routes?.[0]?.conditions) {
      fail('Verbose dense detail must retain compact provenance');
    }
    const output = join(resultsRoot, 'button.dense.json');
    const file = runCli('api-dense-file', [...result.record.command.slice(1), '--dense', '--output', output], {
      probeNoTypeScript: true,
    });
    if (file.stdout || readFileSync(output, 'utf8') !== dense.record.stdout) {
      fail('Dense --output must match stdout without emitting a second report');
    }
  }
}
const griffel = runJson(
  'api-recommended-external-make-styles',
  ['api', 'makeStyles', '--system', 'fluent-v9', '--metadata-mode', 'required', '--json'],
  { probeNoTypeScript: true },
);
assertUsableApiDetail(griffel.response, griffel.record.name);
assertLocalResolvedPackages(griffel.response, griffel.record.name);
const griffelDetail = griffel.response.data.result;
if (
  griffelDetail.package !== '@griffel/react' ||
  griffelDetail.recommendedImport?.moduleSpecifier !== '@fluentui/react-components' ||
  griffelDetail.recommendedImport.reason !== 'configured-catalog' ||
  griffelDetail.recommendedImport.typeOnly
) {
  fail('Bundled external APIs must preserve dependency ownership while recommending the configured public facade');
}
policyImports.push(griffelDetail.recommendedImport);
assertDenseDetail(griffel);
for (const symbol of ['Button', 'ButtonProps']) {
  const alias = runJson(
    `api-npm-alias-${symbol}`,
    ['api', symbol, '--from', suiteAlias.name, '--metadata-mode', 'required', '--json'],
    { probeNoTypeScript: true },
  );
  assertUsableApiDetail(alias.response, alias.record.name);
  const recommendation = alias.response.data.result.recommendedImport;
  if (
    recommendation?.moduleSpecifier !== suiteAlias.name ||
    recommendation.reason !== 'explicit-from' ||
    recommendation.typeOnly !== (symbol === 'ButtonProps')
  ) {
    fail('An explicit npm alias must remain the recommended import, not be rewritten to its canonical package');
  }
  policyImports.push(recommendation);
  assertDenseDetail(alias);
}
for (const symbol of ['ButtonSlots', 'ButtonState', 'useButton_unstable']) {
  const full = runJson(`api-dense-source-${symbol}`, apiArgs(symbol, '@fluentui/react-button', '.'), {
    probeNoTypeScript: true,
  });
  assertDenseDetail(full);
}
const humanSlots = runCli('api-human-button-slots', ['api', 'ButtonSlots', '--from', '@fluentui/react-button'], {
  probeNoTypeScript: true,
}).stdout;
if (
  !humanSlots.includes("| `icon` | `Slot<'span'>` |") ||
  !humanSlots.includes("NonNullable<Slot<ARIAButtonSlotProps<'a'>>>")
) {
  fail('Direct slots queries must preserve compact slot types and root constraints');
}
for (const result of [styledButton, headlessButton, suiteButton]) {
  const props = result.response.data.result.symbol.props?.[0]?.type;
  if (!props || !props.members.some(member => member.name === 'disabled') || props.status.status === 'unsupported') {
    fail(`${result.record.name} lacks usable machine-readable component props`);
  }
  if (
    props.members.find(member => member.name === 'icon')?.presentation?.summary !== "Slot<'span'>" ||
    !props.members.find(member => member.name === 'icon')?.type?.text.includes('WithSlotShorthandValue') ||
    props.members.find(member => member.name === 'disabled')?.defaultValue !== 'false' ||
    !props.members
      .find(member => member.name === 'disabled')
      ?.declarationPackages?.includes('@fluentui/react-button') ||
    JSON.stringify(props.members.find(member => member.name === 'onClick')?.declarationPackages) !==
      JSON.stringify(['@types/react']) ||
    !props.members.some(member => member.name === 'aria-label')
  ) {
    fail(`${result.record.name} must retain inherited props and actual declaration provenance in JSON`);
  }
}

const markdownFile = join(resultsRoot, 'button.md');
const fileOutput = runCli('api-markdown-file', ['api', 'Button', '--system', 'fluent-v9', '--output', markdownFile], {
  probeNoTypeScript: true,
});
if (fileOutput.stdout || readFileSync(markdownFile, 'utf8') !== humanButton) {
  fail('API --output must write the same Markdown as stdout without printing a second report');
}
const humanDoctor = runCli('doctor-human', ['doctor'], { probeNoTypeScript: true }).stdout;
if (
  !humanDoctor.startsWith('# Fluent UI catalog doctor\n') ||
  !humanDoctor.includes('| API records | Selected via | Systems |') ||
  !/Not checked \(\d+ advertised\)/.test(humanDoctor) ||
  !humanDoctor.includes('| auto-discovered |') ||
  !humanDoctor.includes('| configured |') ||
  !humanDoctor.includes(`| \`${suiteAlias.name}\` (alias of \`${suiteAlias.package}@`) ||
  humanDoctor.includes('Discovered via')
) {
  fail('Doctor must distinguish catalogue selection and npm alias identity without implying shallow record checks');
}
const humanManifest = runCli('manifest-human', ['manifest'], { probeNoTypeScript: true }).stdout;
if (!humanManifest.startsWith('# Fluent UI CLI commands\n') || !humanManifest.includes('| Option | Description |')) {
  fail('Manifest must use Markdown headings and option tables');
}
const humanApiContract = humanManifest.split('## `api [symbol]`')[1]?.split('## `doctor`')[0];
if (!humanApiContract?.includes('| `--from` |') || /--(?:package|entrypoint|namespace)\b/.test(humanApiContract)) {
  fail('The human API manifest must expose the same simplified options as normal help');
}
const humanValidation = runCli(
  'metadata-validate-human',
  ['metadata', 'validate', '--input', join(playgroundRoot, 'node_modules/@fluentui/react-button')],
  { probeNoTypeScript: true },
).stdout;
if (!humanValidation.startsWith('# API metadata validation\n') || !humanValidation.includes('API metadata is valid.')) {
  fail('Metadata validation must use Markdown');
}

const headlessButtonProps = runApiQuery(
  'api-headless-button-props',
  'ButtonProps',
  '@fluentui/react-headless-components-preview',
  './button',
  'type',
  'headless',
);

for (const route of [
  { name: 'styled', packageName: '@fluentui/react-accordion', entrypoint: '.', system: undefined },
  {
    name: 'headless',
    packageName: '@fluentui/react-headless-components-preview',
    entrypoint: './accordion',
    system: 'headless',
  },
  {
    name: 'suite',
    packageName: '@fluentui/react-components',
    entrypoint: '.',
    system: 'fluent-v9',
  },
]) {
  for (const symbol of ['Accordion', 'AccordionItem', 'AccordionHeader', 'AccordionPanel']) {
    runApiQuery(
      `api-${route.name}-${kebabCase(symbol)}`,
      symbol,
      route.packageName,
      route.entrypoint,
      'value',
      route.system,
    );
  }
}

const headlessAccordionProps = [];
for (const symbol of ['AccordionProps', 'AccordionItemProps', 'AccordionHeaderProps', 'AccordionPanelProps']) {
  headlessAccordionProps.push(
    runApiQuery(
      `api-headless-${kebabCase(symbol)}`,
      symbol,
      '@fluentui/react-headless-components-preview',
      './accordion',
      'type',
      'headless',
    ),
  );
}

const ambiguity = runJson(
  'api-ambiguity',
  ['api', 'Button', '--cwd', playgroundRoot, '--config', configPath, '--metadata-mode', 'required', '--json'],
  { expectFailure: true },
);
assertIncludes(ambiguity.response, ['Button', 'ambiguous']);
const narrowingCommands = ambiguity.response.data.details?.narrowingCommands;
if (!Array.isArray(narrowingCommands) || narrowingCommands.length !== 2) {
  fail('Styled/headless ambiguity must offer exactly two runnable choices');
}
const parseArgs = createRequire(cliBin)('yargs-parser');
const suggestedSystems = new Set();
for (const command of narrowingCommands) {
  if (!command.startsWith('fluentui-cli api ')) {
    fail(`Unexpected ambiguity command: ${command}`);
  }
  const parsed = parseArgs(command.slice('fluentui-cli api '.length), {
    string: ['cwd', 'config', 'metadata-mode'],
    array: [{ key: 'system', string: true }],
    configuration: { 'camel-case-expansion': false },
  });
  if (
    parsed.cwd !== playgroundRoot ||
    parsed.config !== configPath ||
    parsed['metadata-mode'] !== 'required' ||
    parsed._.length !== 1 ||
    parsed._[0] !== 'Button' ||
    parsed.system?.length !== 1 ||
    Object.keys(parsed).some(key => !['_', 'cwd', 'config', 'metadata-mode', 'system'].includes(key))
  ) {
    fail(`Ambiguity guidance must add only a system selector and retain the lookup context: ${command}`);
  }
  suggestedSystems.add(parsed.system[0]);
  const args = ['api', ...parsed._];
  for (const [flag, value] of Object.entries(parsed)) {
    if (flag !== '_') {
      for (const item of Array.isArray(value) ? value : [value]) {
        args.push(`--${flag}`, String(item));
      }
    }
  }
  const replay = runJson(`api-ambiguity-choice-${parsed.system[0]}`, [...args, '--json'], { probeNoTypeScript: true });
  assertUsableApiDetail(replay.response, replay.record.name);
}
if (!suggestedSystems.has('fluent-v9') || !suggestedSystems.has('headless')) {
  fail('Ambiguity choices must distinguish styled and headless APIs');
}

const doctor = runJson('doctor-deep', [
  'doctor',
  '--cwd',
  playgroundRoot,
  '--config',
  configPath,
  '--metadata-mode',
  'required',
  '--deep',
  '--json',
]);
assertIncludes(doctor.response, ['@fluentui/react-components', '@fluentui/react-headless-components-preview']);
if (
  doctor.response.status !== 'complete' ||
  doctor.response.coverage.status !== 'complete' ||
  doctor.response.coverage.declarationFallbackRoots !== 0 ||
  doctor.response.coverage.unavailableRoots !== 0 ||
  doctor.response.data.roots.some(
    root =>
      root.authority !== 'metadata' ||
      root.apiCoverage !== 'complete' ||
      root.status !== 'complete' ||
      root.recordsChecked !== root.recordsAdvertised,
  )
) {
  fail('Deep doctor must verify every advertised record with complete metadata coverage and no declaration fallback');
}

const missingCatalog = runJson(
  'doctor-missing-catalog',
  ['doctor', '--cwd', playgroundRoot, '--config', missingConfigPath, '--metadata-mode', 'required', '--deep', '--json'],
  { expectFailure: true },
);
assertIncludes(missingCatalog.response, ['@fluentui/missing-catalog']);

const packManifest = JSON.parse(readFileSync(packManifestPath, 'utf8'));
assertLocalTarballInstall(packManifest);
const metadataPortability = assertPackedMetadataPortability(packManifest);
const catalogCoverage = Object.fromEntries(
  packManifest.publicationAssertions.map(packageName => [packageName, assertPublishedCoverage(packageName)]),
);
for (const packageName of packManifest.publicationAssertions) {
  const packageRoot = join(playgroundRoot, 'node_modules', packageName);
  const validation = runJson(`metadata-validate-${safeName(packageName)}`, [
    'metadata',
    'validate',
    packageRoot,
    '--json',
  ]);
  assertIncludes(validation.response, [packageName]);
}

const usage = runJson(
  'report-usage',
  [
    'report',
    'usage',
    '--path',
    playgroundRoot,
    '--include',
    'src/**/*.{ts,tsx}',
    '--config',
    configPath,
    '--system',
    'fluent-v9',
    '--system',
    'headless',
    '--metadata-mode',
    'required',
    '--reporter',
    'json',
  ],
  { envelope: false },
);
const componentUsage = JSON.parse(readFileSync(join(playgroundRoot, 'src/component-usage.json'), 'utf8'));
for (const family of componentUsage.families) {
  const importPath = `${family.package}${family.entrypoint === '.' ? '' : family.entrypoint.slice(1)}`;
  assertIncludes(usage.response, [importPath, ...family.symbols]);
}

const blanketEffectiveTypeUnsupported = apiResults.every(result => result.effectiveType.status === 'unsupported');
if (blanketEffectiveTypeUnsupported) {
  fail('Matching-producer baseline invalidated every cached effective type');
}
const unsupportedEffectiveTypes = apiResults.filter(result => result.effectiveType.status === 'unsupported');
if (unsupportedEffectiveTypes.length > 0) {
  fail(
    `Matching-producer baseline left unsupported effective types: ${unsupportedEffectiveTypes
      .map(result => result.record.name)
      .join(', ')}`,
  );
}
for (const result of [headlessButtonProps, ...headlessAccordionProps]) {
  if (result.effectiveType.memberCount + result.effectiveType.signatureCount === 0) {
    fail(`${result.record.name} did not retain effective members or signatures`);
  }
}

const producerBaseline = JSON.parse(readFileSync(join(playgroundRoot, '.fluentui-producer-baseline.json'), 'utf8'));
const importsTypeChecked = checkRecommendedImports([
  ...policyImports,
  ...apiResults.map(result => result.response.data.result.recommendedImport),
]);
const summary = {
  completedAt: new Date().toISOString(),
  playgroundRoot,
  producerBaseline,
  forum: componentUsage.totals,
  buttonSignatures,
  denseOutput,
  metadataPortability,
  humanOutput: {
    configuredImportRecommendations: true,
    importsTypeChecked,
    importPathSelection: true,
    simplifiedHelp: true,
    minimalAmbiguityCommandsReplayed: true,
    compactSlots: true,
    expandedTypes: true,
    markdown: true,
    documentedDefaults: true,
    uniqueExports: listedExports.length,
    propsEnumerated: true,
    controlFirst: true,
    inheritedExpansion: true,
    defaultButtonLines: humanButtonLines,
    defaultButtonCharacters: humanButton.length,
    headlessOmissionsPreserved: true,
    diagnosticsDeduplicated: true,
  },
  pack: {
    packageCount: packManifest.packages.length,
    publicationAssertions: packManifest.publicationAssertions,
    totals: packManifest.totals,
    catalogCoverage,
  },
  apiEffectiveTypes: apiResults.map(result => ({
    name: result.record.name,
    status: result.effectiveType.status,
    memberCount: result.effectiveType.memberCount,
    signatureCount: result.effectiveType.signatureCount,
  })),
  blanketEffectiveTypeUnsupported,
  commands,
};
writeFileSync(join(resultsRoot, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
console.log(`Rollout CLI checks passed; evidence: ${resultsRoot}`);

function assertDenseDetail(full, flags = []) {
  const name = `${full.record.name}-dense${flags.length ? `-${flags.map(flag => flag.slice(2)).join('-')}` : ''}`;
  const dense = runJson(name, [...full.record.command.slice(1), '--dense', ...flags], { probeNoTypeScript: true });
  const source = full.response.data.result;
  const result = dense.response.data.result;
  if (
    dense.response.type !== 'fluentui.api-detail.dense' ||
    result.detailStatus !== 'available' ||
    result.symbol ||
    result.routes ||
    result.resolvedPackages ||
    JSON.stringify(result.recommendedImport) !== JSON.stringify(source.recommendedImport) ||
    result.importStatus !== source.importStatus ||
    ['diagnostics', 'coverage', 'status'].some(
      key => JSON.stringify(dense.response[key]) !== JSON.stringify(full.response[key]),
    )
  ) {
    fail(`${name} must preserve verified imports, health, and diagnostics without full metadata`);
  }
  const component = source.symbol.classifications.some(classification => classification.facet === 'component');
  const sourceViews = component
    ? source.symbol.props.map(props => props.type)
    : source.symbol.effectiveType
    ? [source.symbol.effectiveType]
    : [];
  const views = component ? result.props : result.members ? [result.members] : [];
  if (views?.length !== sourceViews.length) {
    fail(`${name} lost an effective member view`);
  }
  const platformPackages = new Set(['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript']);
  for (const [index, view] of views.entries()) {
    const sourceView = sourceViews[index];
    const isInherited = member =>
      member.declarationPackages?.length && member.declarationPackages.every(name => platformPackages.has(name));
    const inherited = sourceView.members.filter(isInherited);
    const expected = sourceView.members.filter(member => flags.includes('--include-inherited') || !isInherited(member));
    if (
      view.total !== sourceView.members.length ||
      view.omittedInherited !== (flags.includes('--include-inherited') ? 0 : inherited.length) ||
      JSON.stringify(view.status) !== JSON.stringify(sourceView.status) ||
      view.members.length !== expected.length
    ) {
      fail(`${name} must retain counts/status and expand inherited members only when requested`);
    }
    for (const member of expected) {
      const actual = view.members.find(candidate => candidate.name === member.name);
      const type = (!flags.includes('--expand-types') && member.presentation?.summary) || member.type?.text;
      if (
        !actual ||
        actual.required !== !member.optional ||
        actual.default !== member.defaultValue ||
        Boolean(actual.readonly) !== member.readonly ||
        actual.deprecated !== member.deprecated ||
        (type && actual.type !== type) ||
        actual.description !== (member.documentation ? member.documentation.replace(/\s+/g, ' ').trim() : undefined)
      ) {
        fail(`${name} changed useful API semantics for ${member.name}`);
      }
    }
  }
  const fullBytes = Buffer.byteLength(full.record.stdout);
  const denseBytes = Buffer.byteLength(dense.record.stdout);
  denseOutput.push({
    name,
    fullBytes,
    denseBytes,
    reductionPercent: Math.round((1 - denseBytes / fullBytes) * 1000) / 10,
  });
  return dense;
}

function runApiQuery(name, symbol, packageName, entrypoint, expectedNamespace, system) {
  const result = runJson(name, apiArgs(symbol, packageName, entrypoint, system), {
    probeNoTypeScript: true,
  });
  assertIncludes(result.response, [symbol, packageName]);
  assertUsableApiDetail(result.response, name);
  assertLocalResolvedPackages(result.response, name);
  assertNoFabricatedGuidance(result.response);
  if (!result.response.data.result.routes.some(route => route.namespace === expectedNamespace)) {
    fail(`${name} did not infer the expected ${expectedNamespace} binding`);
  }
  const recommendation = result.response.data.result.recommendedImport;
  const expectedPath = `${packageName}${entrypoint === '.' ? '' : entrypoint.slice(1)}`;
  if (
    recommendation?.moduleSpecifier !== expectedPath ||
    recommendation.exportName !== symbol ||
    recommendation.typeOnly !== (expectedNamespace === 'type') ||
    recommendation.reason !== 'explicit-from'
  ) {
    fail(`${name} must recommend its explicitly selected public import with the correct binding`);
  }

  const effectiveType = result.response.data.result.symbol.effectiveType;
  const enriched = {
    ...result,
    effectiveType: {
      status: effectiveType?.status?.status ?? 'unavailable',
      memberCount: effectiveType?.members?.length ?? 0,
      signatureCount: effectiveType?.signatures?.length ?? 0,
    },
  };
  apiResults.push(enriched);
  return enriched;
}

function checkRecommendedImports(recommendations) {
  const ts = createRequire(join(playgroundRoot, 'package.json'))('typescript');
  const statements = [...new Set(recommendations.map(value => value.statement))];
  const files = statements.map((statement, index) => {
    const file = join(resultsRoot, `recommended-import-${index}.ts`);
    writeFileSync(file, `${statement}\nexport {};\n`);
    return file;
  });
  const program = ts.createProgram(files, {
    noEmit: true,
    strict: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    types: [],
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length) {
    fail(
      ts.formatDiagnostics(diagnostics, {
        getCanonicalFileName: file => file,
        getCurrentDirectory: () => playgroundRoot,
        getNewLine: () => '\n',
      }),
    );
  }
  return statements.length;
}

function assertBoundButtonSignature(result, label) {
  const signatures = result.response.data?.result?.symbol?.effectiveType?.signatures;
  const signature = signatures?.find(candidate => candidate.kind === 'call');
  const props = signature?.parameters?.[0];
  const type = props?.type?.text;

  if (
    props?.name !== 'props' ||
    props.optional !== false ||
    typeof type !== 'string' ||
    type === 'P' ||
    !type.includes('ButtonProps') ||
    (signature.typeParameters?.length ?? 0) !== 0
  ) {
    fail(`${label} did not expose a required, checker-bound ButtonProps call parameter`);
  }

  return {
    optional: props.optional,
    type,
    typeParameterCount: signature.typeParameters.length,
  };
}

function apiArgs(symbol, packageName, entrypoint, system) {
  const args = [
    'api',
    symbol,
    '--cwd',
    playgroundRoot,
    '--from',
    `${packageName}${entrypoint === '.' ? '' : entrypoint.slice(1)}`,
    '--metadata-mode',
    'required',
    '--json',
  ];
  if (system) {
    args.push('--config', configPath, '--system', system);
  }
  return args;
}

function runCli(name, args, options = {}) {
  const probePath = join(resultsRoot, `${name}.probe.json`);
  const environment = { ...process.env };
  if (options.probeNoTypeScript) {
    environment.FLUENTUI_CLI_PROBE_OUTPUT = probePath;
    environment.NODE_OPTIONS = [environment.NODE_OPTIONS, `--require=${probeModule}`].filter(Boolean).join(' ');
  }

  const start = performance.now();
  const result = spawnSync('node', [cliBin, ...args], {
    cwd: playgroundRoot,
    encoding: 'utf8',
    env: environment,
    maxBuffer: 16 * 1024 * 1024,
  });
  const durationMs = Math.round((performance.now() - start) * 100) / 100;
  const record = {
    name,
    command: ['fluentui-cli', ...args],
    status: result.status,
    durationMs,
    stdout: result.stdout,
    stderr: result.stderr,
  };
  commands.push(record);
  writeFileSync(join(resultsRoot, `${name}.json`), `${JSON.stringify(record, null, 2)}\n`);

  if (options.expectFailure ? result.status === 0 : result.status !== 0) {
    fail(`${name} exited ${result.status}\n${result.stderr || result.stdout}`);
  }

  if (options.probeNoTypeScript) {
    const probe = JSON.parse(readFileSync(probePath, 'utf8'));
    if (probe.typeScriptModules.length > 0) {
      fail(`${name} loaded TypeScript graph modules: ${probe.typeScriptModules.join(', ')}`);
    }
    if (probe.generatorModules.length > 0) {
      fail(`${name} loaded API metadata generator modules: ${probe.generatorModules.join(', ')}`);
    }
  }

  return record;
}

function runJson(name, args, options = {}) {
  const record = runCli(name, args, options);
  let response;
  try {
    response = JSON.parse(record.stdout.trim());
  } catch {
    fail(`${name} did not emit pure JSON stdout\n${record.stdout}\n${record.stderr}`);
  }
  if (options.envelope !== false) {
    assertEnvelope(response, name);
  }
  return { record, response };
}

function assertEnvelope(response, name) {
  if (!response || typeof response !== 'object' || !response.apiVersion || !response.type || !('data' in response)) {
    fail(`${name} did not return the versioned CLI response envelope`);
  }
}

function assertUsableApiDetail(response, name) {
  const result = response.data?.result;
  if (
    response.type !== 'fluentui.api-detail' ||
    !result?.symbol ||
    !Array.isArray(result.symbol.declarations) ||
    result.symbol.declarations.length === 0 ||
    !Array.isArray(result.routes) ||
    result.routes.length === 0
  ) {
    fail(`${name} did not return usable source-backed API details`);
  }
}

function assertLocalResolvedPackages(response, name) {
  const resolvedPackages = response.data?.result?.resolvedPackages;
  if (!Array.isArray(resolvedPackages) || resolvedPackages.length === 0) {
    fail(`${name} did not report resolved package identities`);
  }
  for (const packageIdentity of resolvedPackages) {
    if (!packageIdentity.packageRoot.startsWith(`${playgroundRoot}/node_modules/`)) {
      fail(`${name} resolved a workspace package instead of the installed tarball: ${packageIdentity.packageRoot}`);
    }
  }
}

function assertIncludes(response, expectedValues) {
  const serialized = JSON.stringify(response).toLowerCase();
  for (const expected of expectedValues) {
    if (!serialized.includes(String(expected).toLowerCase())) {
      fail(`Response did not include ${expected}`);
    }
  }
}

function assertLocalTarballInstall(packManifest) {
  const lock = JSON.parse(readFileSync(join(playgroundRoot, 'package-lock.json'), 'utf8'));
  for (const packageDefinition of packManifest.packages) {
    const lockKey = `node_modules/${packageDefinition.packageName}`;
    const lockEntry = lock.packages?.[lockKey];
    const installedRoot = join(playgroundRoot, lockKey);
    if (
      !lockEntry?.resolved?.startsWith('file:') ||
      !existsSync(installedRoot) ||
      lstatSync(installedRoot).isSymbolicLink()
    ) {
      fail(`${packageDefinition.packageName} is not installed from an extracted local tarball`);
    }
    const installedManifest = JSON.parse(readFileSync(join(installedRoot, 'package.json'), 'utf8'));
    if (
      installedManifest.name !== packageDefinition.packageName ||
      installedManifest.version !== packageDefinition.version
    ) {
      fail(`${packageDefinition.packageName} installed identity does not match its packed tarball`);
    }
  }
}

function assertPackedMetadataPortability(packManifest) {
  const producerRoot = resolve(dirname(packManifestPath), '../../..');
  let fileCount = 0;

  for (const packageDefinition of packManifest.packages.filter(definition => definition.catalog)) {
    const installedRoot = join(playgroundRoot, 'node_modules', packageDefinition.packageName);
    for (const metadataFile of packageDefinition.metadataFiles) {
      const metadataPath = join(installedRoot, metadataFile);
      const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
      fileCount += 1;
      visit(metadata, `${packageDefinition.packageName}/${metadataFile}`);
    }
  }

  return {
    packageCount: packManifest.packages.filter(definition => definition.catalog).length,
    fileCount,
    producerRootAbsent: true,
    absoluteImportPathsAbsent: true,
  };

  function visit(value, location) {
    if (typeof value === 'string') {
      if (
        value.includes(producerRoot) ||
        value.startsWith('file:') ||
        isAbsolute(value) ||
        /^[A-Za-z]:[\\/]/.test(value) ||
        /import\(["']?(?:file:|\/|[A-Za-z]:[\\/])/.test(value)
      ) {
        fail(`${location} contains a producer-root or absolute import path: ${value}`);
      }
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(child => visit(child, location));
      return;
    }
    if (value && typeof value === 'object') {
      Object.values(value).forEach(child => visit(child, location));
    }
  }
}

function assertNoFabricatedGuidance(response) {
  visit(response);

  function visit(value) {
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    if (!value || typeof value !== 'object') {
      return;
    }
    for (const [key, child] of Object.entries(value)) {
      if (key === 'guidance' || key === 'examples') {
        const serialized = JSON.stringify(child).toLowerCase();
        if (
          (Array.isArray(child) && child.length > 0) ||
          serialized.includes('"status":"supported"') ||
          serialized.includes('"status":"complete"')
        ) {
          fail(`API response fabricated ${key} coverage`);
        }
      }
      visit(child);
    }
  }
}

function assertPublishedCoverage(packageName) {
  const packageRoot = join(playgroundRoot, 'node_modules', packageName);
  const packageJson = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  const metadataExport = packageJson.exports['./metadata.json'];
  if (metadataExport !== './dist/metadata/index.json') {
    fail(`${packageName} does not expose the shipped metadata string export`);
  }
  const metadataPath = metadataExport;
  const metadata = JSON.parse(readFileSync(resolve(packageRoot, metadataPath), 'utf8'));
  const diagnostics = {};
  for (const diagnostic of metadata.diagnostics ?? []) {
    diagnostics[diagnostic.code] = (diagnostics[diagnostic.code] ?? 0) + 1;
  }

  if (metadata.completeness?.api?.status !== 'complete') {
    fail(`${packageName} must advertise complete API coverage`);
  }
  for (const code of [
    'generator.routeNotGenerated',
    'generator.dependencyMetadataUnavailable',
    'generator.rolloutCoveragePartial',
  ]) {
    if (diagnostics[code]) {
      fail(`${packageName} has ${diagnostics[code]} unresolved rollout omissions (${code})`);
    }
  }
  return {
    status: metadata.completeness.api.status,
    records: metadata.records.length,
    diagnostics,
  };
}

function safeName(value) {
  return value.replace(/^@/, '').replaceAll('/', '-');
}

function kebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function fail(message) {
  throw new Error(`[cli-prototype rollout] ${message}`);
}
