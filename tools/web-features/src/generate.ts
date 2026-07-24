import * as fs from 'node:fs';
import * as path from 'node:path';

import { features as webFeaturesData } from 'web-features';
import type { FeatureData, Support } from 'web-features/types';
import yargs from 'yargs';

const DEFAULT_BROWSERS = ['chrome', 'edge', 'firefox', 'safari'];

type Baseline = 'high' | 'low' | false;

interface FeatureRequest {
  id: string;
  groupKey: string;
  compatKey: string | null;
  representativeCompatKey: string | null;
}

interface CliArgs {
  output: string[];
  browsers: string[];
  features: FeatureRequest[];
}

type WebFeature = FeatureData;
type WebFeatureStatus = FeatureData['status'];
type WebSupport = Support;

export interface NormalizedFeature {
  key: string;
  name: string;
  baseline: Baseline;
  baselineLowDate: string | null;
  baselineHighDate: string | null;
  partial: boolean;
  representativeBaseline: Baseline | null;
  representativeBaselineLowDate: string | null;
  support: Record<string, string | null>;
}

export function parseFeatureToken(token: string): FeatureRequest {
  const [id, source] = token.split('=');

  if (!source) {
    return { id, groupKey: id, compatKey: null, representativeCompatKey: null };
  }

  if (source.includes('::')) {
    const [groupKey, compatKey] = source.split('::');
    return { id, groupKey, compatKey, representativeCompatKey: null };
  }

  return { id, groupKey: id, compatKey: null, representativeCompatKey: source };
}

export function splitCsv(value: string): string[] {
  return value
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
}

function parseArgs(argv: string[]): CliArgs {
  const parsed = yargs(argv)
    .option('output', {
      type: 'string',
      array: true,
      demandOption: true,
      describe: 'Output JSON path(s), resolved relative to the cwd. Repeat to write the same data to several files.',
    })
    .option('browsers', {
      type: 'string',
      default: DEFAULT_BROWSERS.join(','),
      describe: 'Comma-separated browser ids for the support columns',
    })
    .option('features', {
      type: 'string',
      demandOption: true,
      describe: 'Comma-separated list of <key>, <key>=<representativeCompatKey>, or <id>=<group>::<compatKey>',
    })
    .strict().argv;

  return {
    output: parsed.output,
    browsers: splitCsv(parsed.browsers),
    features: splitCsv(parsed.features).map(parseFeatureToken),
  };
}

export function pickBrowsers(support: WebSupport | undefined, browsers: string[]): Record<string, string | null> {
  const versions = (support ?? {}) as Record<string, string | undefined>;
  const result: Record<string, string | null> = {};

  for (const browser of browsers) {
    result[browser] = versions[browser] ?? null;
  }

  return result;
}

export function normalizeFeature(
  request: FeatureRequest,
  browsers: string[],
  allFeatures: Record<string, WebFeature>,
): NormalizedFeature {
  const feature = allFeatures[request.groupKey];

  if (!feature) {
    throw new Error(`web-features has no feature "${request.groupKey}" — verify the key against the installed data.`);
  }

  const status = feature.status || ({} as WebFeatureStatus);

  if (request.compatKey) {
    const compat = status.by_compat_key && status.by_compat_key[request.compatKey];

    if (!compat) {
      throw new Error(`Compat key "${request.compatKey}" not found for "${request.groupKey}".`);
    }

    return {
      key: request.id,
      name: request.id,
      baseline: compat.baseline as Baseline,
      baselineLowDate: compat.baseline_low_date || null,
      baselineHighDate: compat.baseline_high_date || null,
      partial: false,
      representativeBaseline: null,
      representativeBaselineLowDate: null,
      support: pickBrowsers(compat.support, browsers),
    };
  }

  const hasAggregateSupport = Boolean(status.support && Object.keys(status.support).length > 0);

  let support = status.support;
  let representativeBaseline: Baseline | null = null;
  let representativeBaselineLowDate: string | null = null;

  if (!hasAggregateSupport && request.representativeCompatKey) {
    const compat = status.by_compat_key && status.by_compat_key[request.representativeCompatKey];

    if (!compat) {
      throw new Error(
        `Representative compat key "${request.representativeCompatKey}" not found for "${request.groupKey}".`,
      );
    }

    support = compat.support;
    representativeBaseline = compat.baseline as Baseline;
    representativeBaselineLowDate = compat.baseline_low_date || null;
  }

  return {
    key: request.id,
    name: feature.name,
    baseline: status.baseline as Baseline,
    baselineLowDate: status.baseline_low_date || null,
    baselineHighDate: status.baseline_high_date || null,
    partial: !hasAggregateSupport && Boolean(request.representativeCompatKey),
    representativeBaseline,
    representativeBaselineLowDate,
    support: pickBrowsers(support, browsers),
  };
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  const allFeatures = webFeaturesData as unknown as Record<string, WebFeature>;

  const version = JSON.parse(
    fs.readFileSync(path.join(path.dirname(require.resolve('web-features')), 'package.json'), 'utf8'),
  ).version;

  const features: Record<string, ReturnType<typeof normalizeFeature>> = {};

  for (const request of args.features) {
    features[request.id] = normalizeFeature(request, args.browsers, allFeatures);
  }

  const result = {
    generatedFrom: `web-features@${version}`,
    browsers: args.browsers,
    features,
  };

  const json = JSON.stringify(result, null, 2) + '\n';

  for (const output of args.output) {
    const outPath = path.resolve(process.cwd(), output);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, json);
    console.log(`Wrote ${path.relative(process.cwd(), outPath)} from web-features@${version}`);
  }
}

if (require.main === module) {
  main();
}
