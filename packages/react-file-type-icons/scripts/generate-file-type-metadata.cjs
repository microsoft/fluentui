#!/usr/bin/env node
// @ts-check

const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const prettier = require('prettier');

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});

async function main() {
  const { values } = parseArgs({
    options: {
      project: { type: 'string' },
      check: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h' },
    },
  });
  if (values.help) {
    console.log(
      'Usage: node packages/react-file-type-icons/scripts/generate-file-type-metadata.cjs --project <react-file-type-icons|style-utilities> [--check]',
    );
    return;
  }
  if (values.project !== 'react-file-type-icons' && values.project !== 'style-utilities') {
    throw new Error('--project must be react-file-type-icons or style-utilities');
  }

  const { fileIconTypes, fileTypeIconMap, cdnBaseUrl } = require('@fluentui/react-icons-file-type/metadata.json');
  const types = [...fileIconTypes].sort((left, right) => left.value - right.value);
  const names = new Set();
  types.forEach((entry, index) => {
    if (entry.value !== index + 1 || !/^[a-zA-Z_$][\w$]*$/.test(entry.name) || names.has(entry.name)) {
      throw new Error(`Invalid file icon type: ${JSON.stringify(entry)}`);
    }
    names.add(entry.name);
    if (!Object.prototype.hasOwnProperty.call(fileTypeIconMap, entry.icon || 'genericfile')) {
      throw new Error(`Missing icon in catalog: ${entry.icon}`);
    }
  });
  if (typeof cdnBaseUrl !== 'string' || new URL(cdnBaseUrl).protocol !== 'https:') {
    throw new Error('Invalid CDN base URL');
  }

  const catalog = Object.fromEntries(
    Object.entries(fileTypeIconMap).map(([name, extensions]) => [name, extensions ? { extensions } : {}]),
  );
  const outputs =
    values.project === 'style-utilities'
      ? {
          'cdn.ts': `export const FLUENT_CDN_BASE_URL = ${JSON.stringify(cdnBaseUrl)};\n`,
        }
      : {
          'FileIconType.ts':
            `export enum FileIconType {\n` +
            types.map(entry => `${entry.name} = ${entry.value},`).join('\n') +
            `\n}\nexport type FileIconTypeInput = ${types.map(entry => entry.value).join(' | ')};\n`,
          'FileTypeIconMap.ts': `export const FileTypeIconMap: { [key: string]: { extensions?: string[] } } = ${JSON.stringify(
            catalog,
          )};\n`,
          'fileIconTypeNames.generated.ts': `export const TYPE_TO_ICON_NAME: ReadonlyArray<string> = ${JSON.stringify([
            '',
            ...types.map(entry => entry.icon || ''),
          ])};\n`,
        };
  const header =
    '// Generated from @fluentui/react-icons-file-type JSON metadata. Do not edit.\n' +
    '// Run yarn generate-metadata in this package to regenerate.\n\n';
  for (const [file, source] of Object.entries(outputs)) {
    const destination = path.join(__dirname, '..', '..', values.project, 'src', file);
    const content = await prettier.format(header + source, {
      ...(await prettier.resolveConfig(destination)),
      filepath: destination,
    });
    const current = fs.existsSync(destination) ? fs.readFileSync(destination, 'utf8') : undefined;
    if (current !== content) {
      if (values.check) {
        throw new Error(`Stale generated metadata: ${destination}. Run yarn generate-metadata.`);
      }
      fs.writeFileSync(destination, content);
    }
  }
  console.log(`${values.check ? 'Checked' : 'Generated'} ${values.project} metadata`);
}
