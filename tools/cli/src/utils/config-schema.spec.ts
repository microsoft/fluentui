import * as fs from 'node:fs';
import * as path from 'node:path';
import Ajv from 'ajv';
import { validateCatalogConfig } from './config';
import { validateExtensionDescriptor } from '../commands/init/extensions';

const ajv = new Ajv({ strict: false, allErrors: true });
const schemaRoot = path.resolve(__dirname, '../../schemas');

describe('shipped JSON Schema contracts', () => {
  const config = ajv.compile(JSON.parse(fs.readFileSync(path.join(schemaRoot, 'fluentui.config.schema.json'), 'utf8')));
  const extension = ajv.compile(
    JSON.parse(fs.readFileSync(path.join(schemaRoot, 'fluentui-extension.schema.json'), 'utf8')),
  );
  const system = { catalogs: [{ package: '@acme/ui' }] };
  const base = { schemaVersion: 1, systems: { acme: system } };

  it.each([
    base,
    { schemaVersion: 1, systems: {} },
    { ...base, $schema: './schema.json', extensions: ['@acme/ui'], preferences: { headlessStyling: 'css-modules' } },
    { ...base, extensions: [], preferences: { headlessStyling: 'tailwind' } },
    { schemaVersion: 1, systems: { product: { packages: ['*', '@Acme/ui-*'], exclusions: ['@Acme/private'] } } },
    { schemaVersion: 1, systems: { disabled: { disabled: true, catalogs: [], packages: [], exclusions: [] } } },
    { schemaVersion: 1, systems: { local: { catalogs: [{ path: '../catalog' }] } } },
  ])('accepts the same valid configuration as the runtime: %j', value => {
    expect(config(value)).toBe(true);
    expect(() => validateCatalogConfig(value)).not.toThrow();
  });

  it.each([
    { ...base, $schema: false },
    { ...base, $schema: '' },
    { ...base, schemaVersion: 2 },
    { ...base, unknown: true },
    { ...base, extensions: ['@acme/*'] },
    { ...base, extensions: ['@acme/ui', '@acme/ui'] },
    { ...base, extensions: Array.from({ length: 17 }, (_, index) => `package-${index}`) },
    { ...base, preferences: { headlessStyling: 'griffel' } },
    { ...base, preferences: { unknown: true } },
    { ...base, systems: { 'bad name': system } },
    { ...base, systems: { acme: { disabled: true, ...system } } },
    { ...base, systems: { acme: { disabled: false } } },
    { ...base, systems: { acme: { packages: [], exclusions: ['a'] } } },
    { ...base, systems: { acme: { catalogs: [{ package: '@acme/ui', path: './ui' }] } } },
    { ...base, systems: { acme: { catalogs: [{ package: '@acme/ui' }, { package: '@acme/ui' }] } } },
    { ...base, systems: { acme: { packages: ['x', 'x'] } } },
  ])('rejects the same invalid configuration as the runtime: %j', value => {
    expect(config(value)).toBe(false);
    expect(() => validateCatalogConfig(value)).toThrow();
  });

  it.each([
    { schemaVersion: 1, system: 'acme', skill: './guidance/SKILL.md' },
    { schemaVersion: 1, system: 'acme.ui', skill: './SKILL.md', references: ['./references/buttons.md'] },
  ])('accepts valid extension descriptors: %j', value => {
    expect(extension(value)).toBe(true);
    expect(() => validateExtensionDescriptor(value)).not.toThrow();
  });

  it.each([
    { schemaVersion: 2, system: 'acme', skill: './SKILL.md' },
    { schemaVersion: 1, system: 'bad/name', skill: './SKILL.md' },
    { schemaVersion: 1, system: 'acme', skill: '../SKILL.md' },
    { schemaVersion: 1, system: 'acme', skill: './guide/../../SKILL.md' },
    { schemaVersion: 1, system: 'acme', skill: './guide.js' },
    { schemaVersion: 1, system: 'acme', skill: './SKILL.md', run: './plugin.js' },
    { schemaVersion: 1, system: 'acme', skill: './SKILL.md', references: ['./A.md', './A.md'] },
  ])('rejects invalid extension descriptors: %j', value => {
    expect(extension(value)).toBe(false);
    expect(() => validateExtensionDescriptor(value)).toThrow();
  });
});
