#!/usr/bin/env node
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { compileStyleSpec, type CompileTarget } from '../index';

const require = createRequire(import.meta.url);

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('style-spec-compile')
    .option('target', {
      type: 'string',
      choices: ['griffel', 'web-components', 'css-modules'] as const,
      demandOption: true,
    })
    .option('spec', {
      type: 'string',
      description: 'Path to a JS/TS module exporting the spec, or a JSON file',
      demandOption: true,
    })
    .option('out', {
      type: 'string',
      description: 'Output directory',
      demandOption: true,
    })
    .option('check', {
      type: 'boolean',
      description: 'Compare generated output to files on disk without writing',
      default: false,
    })
    .option('export', {
      type: 'string',
      description: 'Named export to use when loading a JS/TS module',
      default: 'default',
    })
    .strict()
    .help()
    .parse();

  const specPath = resolve(String(argv.spec));
  const outDir = resolve(String(argv.out));
  const target = argv.target as CompileTarget;

  const spec = loadSpec(specPath, String(argv.export));
  const files = compileStyleSpec(spec, { target });

  let mismatched = false;
  for (const file of files) {
    const outPath = resolve(outDir, file.fileName);
    if (argv.check) {
      if (!existsSync(outPath)) {
        console.error(`Missing generated file: ${outPath}`);
        mismatched = true;
        continue;
      }
      const existing = readFileSync(outPath, 'utf8');
      if (existing !== file.contents) {
        console.error(`Generated file is out of date: ${outPath}`);
        mismatched = true;
      }
    } else {
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, file.contents, 'utf8');
      console.log(`Wrote ${outPath}`);
    }
  }

  if (mismatched) {
    process.exitCode = 1;
  }
}

function loadSpec(specPath: string, exportName: string) {
  if (specPath.endsWith('.json')) {
    return JSON.parse(readFileSync(specPath, 'utf8'));
  }
  // Dynamic require so the CLI works for CJS/TS-transpiled modules in the workspace
  const mod = require(specPath);
  const spec = exportName === 'default' ? mod.default ?? mod : mod[exportName];
  if (!spec) {
    throw new Error(`Export "${exportName}" not found in ${specPath}`);
  }
  return spec;
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
