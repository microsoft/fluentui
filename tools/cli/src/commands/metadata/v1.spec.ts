import * as fs from 'node:fs';
import * as path from 'node:path';

import { API_METADATA_DEFAULT_BOUNDS, fingerprintMetadata, type ApiRecord } from '@fluentui/api-metadata';

import { loadMetadataGenerator } from '../../utils/metadata-generator';
import { validateMetadataInput } from './v1';

const fixtureRoot = path.resolve(__dirname, '__fixtures__/v1-package');
const outputRoot = path.resolve(__dirname, '__fixtures__/__v1-output__');
const installedRoot = path.resolve(__dirname, '__fixtures__/__v1-installed__');
const oversizedPath = path.resolve(__dirname, '__fixtures__/__v1-oversized__.json');
const { generateApiMetadata, writeGeneratedMetadata } = loadMetadataGenerator();

describe('metadata v1 validation', () => {
  beforeEach(() => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    fs.rmSync(installedRoot, { recursive: true, force: true });
    fs.rmSync(oversizedPath, { force: true });
  });

  afterAll(() => {
    fs.rmSync(outputRoot, { recursive: true, force: true });
    fs.rmSync(installedRoot, { recursive: true, force: true });
    fs.rmSync(oversizedPath, { force: true });
  });

  it('strictly validates every advertised generated record', async () => {
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    writeGeneratedMetadata(generated, outputRoot);

    expect(validateMetadataInput(outputRoot)).toEqual(
      expect.objectContaining({
        valid: true,
        kind: 'package-index',
        package: { name: '@fluentui/cli-v1-fixture', version: '1.0.0' },
        recordsAdvertised: generated.records.length,
        recordsValidated: generated.records.length,
      }),
    );
  });

  it('rejects a missing advertised record instead of reporting partial success', async () => {
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    const written = writeGeneratedMetadata(generated, outputRoot);
    fs.unlinkSync(written.recordPaths[0]);

    const result = validateMetadataInput(outputRoot);

    expect(result.valid).toBe(false);
    expect(result.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: 'CLI_METADATA_RECORD_MISSING' }),
        expect.objectContaining({ code: 'catalog.missingRecord' }),
      ]),
    );
  });

  it('validates an individual API record', async () => {
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    const written = writeGeneratedMetadata(generated, outputRoot);

    expect(validateMetadataInput(written.recordPaths[0])).toEqual(
      expect.objectContaining({
        valid: true,
        kind: 'api-record',
        recordsAdvertised: 1,
        recordsValidated: 1,
      }),
    );
  });

  it('rejects record content that does not match its advertised fingerprint', async () => {
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    const written = writeGeneratedMetadata(generated, outputRoot);
    const record = JSON.parse(fs.readFileSync(written.recordPaths[0], 'utf8'));
    record.diagnostics.push({ code: 'fixture.changed', severity: 'warning', message: 'changed' });
    fs.writeFileSync(written.recordPaths[0], `${JSON.stringify(record)}\n`, 'utf8');

    expect(validateMetadataInput(outputRoot).diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'CLI_METADATA_RECORD_FINGERPRINT' })]),
    );
  });

  it('rejects oversized metadata before reading it', () => {
    const file = fs.openSync(oversizedPath, 'w');
    fs.ftruncateSync(file, API_METADATA_DEFAULT_BOUNDS.maxBytes + 1);
    fs.closeSync(file);

    expect(validateMetadataInput(oversizedPath)).toEqual(
      expect.objectContaining({
        valid: false,
        diagnostics: [expect.objectContaining({ code: 'CLI_METADATA_FILE_TOO_LARGE' })],
      }),
    );
  });

  it('explicitly rejects advertised record kinds the strict validator cannot validate', async () => {
    const generated = await generateApiMetadata({ packageRoot: fixtureRoot });
    writeGeneratedMetadata(generated, outputRoot);
    const indexPath = path.join(outputRoot, 'index.json');
    const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    index.records.push({
      id: 'guidance',
      kind: 'guidance',
      path: 'guidance.json',
      fingerprint: { algorithm: 'sha256', value: 'a'.repeat(64) },
    });
    fs.writeFileSync(indexPath, `${JSON.stringify(index)}\n`, 'utf8');

    expect(validateMetadataInput(outputRoot)).toEqual(
      expect.objectContaining({
        valid: false,
        recordsAdvertised: generated.records.length + 1,
        diagnostics: expect.arrayContaining([
          expect.objectContaining({ code: 'CLI_METADATA_RECORD_KIND_UNSUPPORTED' }),
        ]),
      }),
    );
  });

  it('validates installed package identity and current declaration fingerprints', async () => {
    await createInstalledPackage();

    expect(validateMetadataInput(installedRoot)).toEqual(
      expect.objectContaining({
        valid: true,
        package: { name: '@fluentui/cli-v1-fixture', version: '1.0.0' },
      }),
    );
  });

  it('validates more than one query fanout of independent record artifacts', async () => {
    const extraRecords = 70;
    await createInstalledPackage(extraRecords);

    const result = validateMetadataInput(installedRoot);
    expect(result.valid).toBe(true);
    expect(result.recordsAdvertised).toBeGreaterThan(64);
    expect(result.recordsValidated).toBe(result.recordsAdvertised);
    expect(result.diagnostics).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'reader.maxFanout' })]),
    );
  });

  it('rejects metadata for the wrong installed package identity', async () => {
    await createInstalledPackage();
    const manifestPath = path.join(installedRoot, 'package.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = '2.0.0';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest), 'utf8');

    expect(validateMetadataInput(installedRoot).diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'reader.packageIdentityMismatch' })]),
    );
  });

  it('rejects stale installed declaration inputs', async () => {
    await createInstalledPackage();
    fs.appendFileSync(path.join(installedRoot, 'dist/index.d.ts'), '\nexport interface Changed {}\n', 'utf8');

    expect(validateMetadataInput(installedRoot).diagnostics).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: 'reader.declarationDrift' })]),
    );
  });

  it('rejects package metadata exports that escape the package root', async () => {
    await createInstalledPackage();
    const manifestPath = path.join(installedRoot, 'package.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.exports['./metadata.json'] = '../outside/index.json';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest), 'utf8');

    expect(() => validateMetadataInput(installedRoot)).toThrow(
      expect.objectContaining({ code: 'CLI_METADATA_EXPORT_ESCAPE' }),
    );
  });
});

async function createInstalledPackage(extraRecordCount = 0): Promise<void> {
  fs.cpSync(fixtureRoot, installedRoot, { recursive: true });
  const manifestPath = path.join(installedRoot, 'package.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.fluentuiCatalog = './metadata.json';
  manifest.exports['./metadata.json'] = './dist/metadata/index.json';
  fs.writeFileSync(manifestPath, JSON.stringify(manifest), 'utf8');
  const generated = await generateApiMetadata({ packageRoot: installedRoot });
  if (extraRecordCount > 0) {
    const sourceRecord = generated.records[0];
    for (let index = 0; index < extraRecordCount; index++) {
      const record: ApiRecord = {
        ...sourceRecord,
        recordId: `fanout-${index}`,
      };
      generated.records.push(record);
      generated.index.records.push({
        id: record.recordId,
        kind: 'api',
        path: `api/${record.recordId}.json`,
        fingerprint: fingerprintMetadata(record),
        symbols: record.symbols.map(symbol => symbol.id),
      });
    }
  }
  writeGeneratedMetadata(generated, path.join(installedRoot, 'dist/metadata'));
}
