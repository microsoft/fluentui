import { type ExecutorContext, normalizePath } from '@nx/devkit';
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';
import { globSync } from 'fast-glob';

export interface SharedStorybookManifest {
  hash: string;
  groups: Record<string, string[]>;
}

function isHostRelativePath(path: unknown): path is string {
  return (
    typeof path === 'string' &&
    path.length > 0 &&
    !isAbsolute(path) &&
    !path.includes('\\') &&
    !path.includes(':') &&
    path.split('/').every(part => part.length > 0 && part !== '.' && part !== '..')
  );
}

export function resolveSharedGroups(
  projects: readonly string[],
  hostRoot: string,
  context: ExecutorContext,
): Record<string, string[]> {
  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error('Shared Storybook requires a nonempty list of virtual projects');
  }
  const selected = new Set<string>();
  const groups: Record<string, string[]> = {};
  for (const name of [...projects].sort()) {
    if (typeof name !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9_-]*-vrt$/.test(name)) {
      throw new Error(`Shared Storybook project ${String(name)} must be a named virtual *-vrt project`);
    }
    if (selected.has(name)) {
      throw new Error(`Shared Storybook project ${name} is a duplicate selection`);
    }
    selected.add(name);
    const project = context.projectGraph.nodes[name];
    if (!project) {
      throw new Error(`Shared Storybook project ${name} is not in the project graph`);
    }
    const metadata = project.data.metadata?.visualRegression as { hostRoot?: unknown } | undefined;
    const options = project.data.targets?.['build-vr-storybook']?.options;
    if (metadata?.hostRoot !== hostRoot || options?.hostRoot !== hostRoot) {
      throw new Error(
        `Shared Storybook project ${name} has an invalid hostRoot in metadata or build-vr-storybook options`,
      );
    }
    if (!Array.isArray(options.stories) || !options.stories.length || !options.stories.every(isHostRelativePath)) {
      throw new Error(`Shared Storybook project ${name} needs nonempty, safe host-relative stories`);
    }
    groups[name] = [...new Set<string>(options.stories)].sort();
  }
  return groups;
}

function assertRegularFile(hostPath: string, relativePath: string): void {
  let current = hostPath;
  for (const segment of relativePath.split('/')) {
    current = join(current, segment);
    if (lstatSync(current, { throwIfNoEntry: false })?.isSymbolicLink()) {
      throw new Error(`Storybook importPath crosses a symlink: ${relativePath}`);
    }
  }
  if (!lstatSync(current, { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`Storybook importPath is missing or not a file: ${relativePath}`);
  }
}

function compiledFiles(outputPath: string): string[] {
  const files: string[] = [];
  const visit = (directory: string, prefix: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const filename = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isSymbolicLink()) {
        throw new Error(`Shared Storybook output contains a symlink: ${filename}`);
      }
      if (entry.isDirectory()) {
        visit(join(directory, entry.name), filename);
      } else if (entry.isFile()) {
        if (filename !== 'vrt-shared.json') {
          files.push(filename);
        }
      } else {
        throw new Error(`Shared Storybook output contains a non-file: ${filename}`);
      }
    }
  };
  visit(outputPath, '');
  return files.sort();
}

function fingerprint(outputPath: string): string {
  const hash = createHash('sha256');
  for (const filename of compiledFiles(outputPath)) {
    const pathBytes = Buffer.from(filename);
    const contents = readFileSync(join(outputPath, filename));
    hash.update(String(pathBytes.length)).update(':').update(pathBytes);
    hash.update(String(contents.length)).update(':').update(contents);
  }
  return hash.digest('hex');
}

export function writeSharedManifest(
  outputPath: string,
  hostPath: string,
  groups: Record<string, string[]>,
): SharedStorybookManifest {
  if (!groups || !Object.keys(groups).length) {
    throw new Error('Shared Storybook manifest requires nonempty groups');
  }
  const owners = new Map<string, string[]>();
  const storyIds: Record<string, string[]> = {};
  for (const name of Object.keys(groups).sort()) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*-vrt$/.test(name)) {
      throw new Error(`Shared Storybook group ${name} must be a named virtual *-vrt project`);
    }
    const patterns = groups[name];
    if (!Array.isArray(patterns) || !patterns.length || !patterns.every(isHostRelativePath)) {
      throw new Error(`Shared Storybook group ${name} needs nonempty, safe host-relative stories`);
    }
    storyIds[name] = [];
    for (const pattern of [...new Set(patterns)].sort()) {
      for (const file of globSync(pattern, { cwd: hostPath, onlyFiles: true, followSymbolicLinks: false })) {
        const normalized = normalizePath(file);
        if (!isHostRelativePath(normalized)) {
          throw new Error(`Shared Storybook group ${name} matched an invalid story path: ${file}`);
        }
        assertRegularFile(hostPath, normalized);
        owners.set(normalized, [...new Set([...(owners.get(normalized) ?? []), name])]);
      }
    }
    if (![...owners.values()].some(names => names.includes(name))) {
      throw new Error(`Shared Storybook group ${name} matches no stories`);
    }
  }

  const indexPath = join(outputPath, 'index.json');
  const index: unknown = JSON.parse(readFileSync(indexPath, 'utf8'));
  if (
    !index ||
    typeof index !== 'object' ||
    !('v' in index) ||
    index.v !== 5 ||
    !('entries' in index) ||
    !index.entries ||
    typeof index.entries !== 'object' ||
    Array.isArray(index.entries)
  ) {
    throw new Error(`Shared Storybook requires a v5 index.json with entries: ${indexPath}`);
  }
  for (const [key, value] of Object.entries(index.entries)) {
    if (
      !value ||
      typeof value !== 'object' ||
      !('type' in value) ||
      (value.type !== 'story' && value.type !== 'docs')
    ) {
      throw new Error(`Storybook index entry ${key} has an invalid type`);
    }
    if (value.type === 'docs') {
      continue;
    }
    if (!('id' in value) || typeof value.id !== 'string' || !value.id || value.id !== key) {
      throw new Error(`Storybook story ${key} has an invalid id`);
    }
    if (
      !('importPath' in value) ||
      typeof value.importPath !== 'string' ||
      !value.importPath.startsWith('./') ||
      !isHostRelativePath(value.importPath.slice(2))
    ) {
      throw new Error(`Storybook story ${key} has an invalid importPath`);
    }
    const importPath = value.importPath.slice(2);
    assertRegularFile(hostPath, importPath);
    const matches = owners.get(importPath) ?? [];
    if (matches.length !== 1) {
      throw new Error(`Storybook story ${key} needs exactly one owner; found ${matches.length}: ${matches.join(', ')}`);
    }
    storyIds[matches[0]].push(value.id);
  }
  for (const [name, ids] of Object.entries(storyIds)) {
    if (!ids.length) {
      throw new Error(`Shared Storybook group ${name} has no story entries in index.json`);
    }
    ids.sort();
  }
  const manifest: SharedStorybookManifest = { hash: fingerprint(outputPath), groups: storyIds };
  const manifestPath = join(outputPath, 'vrt-shared.json');
  if (existsSync(manifestPath) && !lstatSync(manifestPath).isFile()) {
    throw new Error(`Shared Storybook manifest path is not a regular file: ${manifestPath}`);
  }
  writeFileSync(manifestPath, JSON.stringify(manifest));
  return manifest;
}
