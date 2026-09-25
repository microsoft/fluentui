import { existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

import { fingerprintMetadata, serializeMetadata } from './serialize';
import type { GeneratorResult } from './types';
import { assertValidPackageIndex, validateCatalog } from './validate';

export interface WrittenMetadataArtifacts {
  indexPath: string;
  recordPaths: string[];
}

export function writeGeneratedMetadata(
  result: Pick<GeneratorResult, 'index' | 'records'>,
  outputDirectory: string,
): WrittenMetadataArtifacts {
  const validation = validateCatalog(result.index, result.records);
  if (!validation.valid) {
    throw new Error(
      `Cannot write invalid API metadata:\n${validation.diagnostics
        .map(diagnostic => `${diagnostic.path}: ${diagnostic.message}`)
        .join('\n')}`,
    );
  }

  const { index, records } = validation.value;
  const root = resolve(outputDirectory);
  const recordsById = new Map(records.map(record => [record.recordId, record]));
  const recordWrites = index.records.map(descriptor => {
    const record = recordsById.get(descriptor.id);
    if (!record || descriptor.kind !== 'api') {
      throw new Error(`Missing generated API record ${descriptor.id}`);
    }
    const fingerprint = fingerprintMetadata(record);
    if (fingerprint.value !== descriptor.fingerprint.value) {
      throw new Error(`Generated API record ${descriptor.id} does not match its index fingerprint`);
    }
    return {
      path: resolveContained(root, descriptor.path),
      serialized: serializeMetadata(record),
    };
  });
  const indexPath = join(root, 'index.json');
  mkdirSync(root, { recursive: true });
  const physicalRoot = realpathSync(root);
  assertExistingPathContained(root, physicalRoot, indexPath);
  const previous = existsSync(indexPath)
    ? assertValidPackageIndex(JSON.parse(readFileSync(indexPath, 'utf8')))
    : undefined;
  if (previous && previous.package.name !== index.package.name) {
    throw new Error(`Cannot replace metadata belonging to ${previous.package.name} with ${index.package.name}`);
  }
  const currentPaths = new Set(recordWrites.map(write => write.path));
  const obsoletePaths = (previous?.records ?? [])
    .filter(descriptor => descriptor.kind === 'api')
    .map(descriptor => resolveContained(root, descriptor.path))
    .filter(file => !currentPaths.has(file));
  for (const outputPath of [indexPath, ...currentPaths, ...obsoletePaths]) {
    assertExistingPathContained(root, physicalRoot, outputPath);
  }
  for (const write of recordWrites) {
    mkdirSync(dirname(write.path), { recursive: true });
  }
  for (const outputPath of [indexPath, ...recordWrites.map(write => write.path)]) {
    assertExistingPathContained(root, physicalRoot, outputPath);
  }
  for (const write of recordWrites) {
    writeFileSync(write.path, write.serialized, 'utf8');
  }
  writeFileSync(indexPath, serializeMetadata(index), 'utf8');
  for (const obsoletePath of obsoletePaths) {
    if (existsSync(obsoletePath)) {
      unlinkSync(obsoletePath);
    }
  }
  const recordPaths = recordWrites.map(write => write.path);
  return { indexPath, recordPaths };
}

function resolveContained(root: string, path: string): string {
  if (isAbsolute(path)) {
    throw new Error(`Metadata output paths must be relative: ${path}`);
  }
  const resolved = resolve(root, path);
  const relativePath = relative(root, resolved);
  if (relativePath === '..' || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) {
    throw new Error(`Metadata output path escapes its root: ${path}`);
  }
  return resolved;
}

function assertExistingPathContained(root: string, physicalRoot: string, path: string): void {
  const relativePath = relative(root, path);
  let candidate = root;
  for (const segment of relativePath.split(sep)) {
    candidate = join(candidate, segment);
    try {
      lstatSync(candidate);
    } catch (error) {
      if (isMissingPathError(error)) {
        continue;
      }
      throw error;
    }
    let physicalCandidate: string;
    try {
      physicalCandidate = realpathSync(candidate);
    } catch {
      throw new Error(`Metadata output path contains an unresolved symlink: ${relativePath}`);
    }
    const physicalRelativePath = relative(physicalRoot, physicalCandidate);
    if (
      physicalRelativePath === '..' ||
      physicalRelativePath.startsWith(`..${sep}`) ||
      isAbsolute(physicalRelativePath)
    ) {
      throw new Error(`Metadata output path escapes its root through a symlink: ${relativePath}`);
    }
  }
}

function isMissingPathError(error: unknown): error is NodeJS.ErrnoException {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT';
}
