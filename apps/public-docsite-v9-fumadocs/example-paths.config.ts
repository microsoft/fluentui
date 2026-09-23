import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import * as ts from 'typescript';
import { extractStoryOrder } from './vite-plugins/story-order';
import { examplePath } from './src/utils/examplePath';

/** Enumerate source exports without evaluating story modules outside Vite's build pipeline. */
export function getExamplePaths(): string[] {
  const root = fileURLToPath(new URL('../../', import.meta.url));
  const configPath = resolve(root, 'tsconfig.base.json');
  const config = ts.readConfigFile(configPath, ts.sys.readFile);
  if (config.error) {
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  }
  const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const paths = new Set<string>();

  for (const collection of ['react', 'headless']) {
    const contentRoot = fileURLToPath(new URL(`./content/${collection}/`, import.meta.url));
    for (const file of readdirSync(contentRoot, { recursive: true })) {
      if (typeof file !== 'string' || !file.endsWith('.mdx')) {
        continue;
      }
      const filename = resolve(contentRoot, file);
      const content = readFileSync(filename, 'utf8');
      const pages = [...content.matchAll(/<ComponentPage\b[^>]*\bstories=\{(\w+)\}/g)];
      if (!content.includes('<ComponentPage')) {
        continue;
      }
      if (pages.length === 0) {
        throw new Error(`${filename}: standalone examples require an imported story namespace`);
      }
      const slug = file
        .replace(/\\/g, '/')
        .replace(/\.mdx$/, '')
        .replace(/(?:^|\/)index$/, '');
      const pageUrl = `/${collection}${slug ? `/${slug}` : ''}`;
      for (const [, binding] of pages) {
        const imports = [...content.matchAll(/import\s+[^;]*?\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g)];
        const specifier = imports.find(([, name]) => name === binding)?.[2];
        if (!specifier) {
          throw new Error(`${filename}: cannot resolve story namespace ${binding}`);
        }
        const resolved = specifier.startsWith('@repo/')
          ? ts.resolveModuleName(`./${specifier.slice(6)}`, resolve(root, 'index.ts'), options, ts.sys)
          : ts.resolveModuleName(specifier, resolve(dirname(filename), 'index.ts'), options, ts.sys);
        const entry = resolved.resolvedModule?.resolvedFileName;
        if (!entry) {
          throw new Error(`${filename}: cannot resolve ${specifier}`);
        }
        const names = extractStoryOrder(readFileSync(entry, 'utf8'));
        if (names.length === 0) {
          throw new Error(`${entry}: no standalone story exports found`);
        }
        for (const name of names) {
          const path = examplePath(pageUrl, name);
          if (paths.has(path)) {
            throw new Error(`${filename}: duplicate standalone example ${name}`);
          }
          paths.add(path);
        }
      }
    }
  }
  return [...paths];
}
