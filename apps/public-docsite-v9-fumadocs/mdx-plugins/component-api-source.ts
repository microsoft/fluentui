import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const paths: Record<string, string[]> = JSON.parse(readFileSync(join(repoRoot, 'tsconfig.base.all.json'), 'utf8'))
  .compilerOptions.paths;
const typeFiles = new Map<string, string[]>();

export function componentApiSource(storyImport: string, component: string): { path: string; name: string } {
  const packageName = storyImport.match(/^(@fluentui\/[^/]+)\/src\//)?.[1];
  const mapping = packageName && paths[packageName]?.[0];

  if (!mapping) {
    throw new Error(`No source mapping for story package ${storyImport}`);
  }

  const library = join(dirname(join(repoRoot, mapping)), '../../library/src');

  let files = typeFiles.get(library);

  if (!files) {
    files = readdirSync(library, { recursive: true, encoding: 'utf8' }).filter(file => file.endsWith('.types.ts'));
    typeFiles.set(library, files);
  }

  const candidates = files.filter(file => file.split(/[\\/]/).pop() === `${component}.types.ts`);

  if (candidates.length === 1) {
    return { path: join(library, candidates[0]), name: `${component}Props` };
  }

  const componentBarrel = join(library, 'components', component, 'index.ts');

  if (existsSync(componentBarrel)) {
    return { path: componentBarrel, name: `${component}Props` };
  }

  const barrel = join(library, 'index.ts');

  if (existsSync(barrel) && packageName !== '@fluentui/react-headless-components-preview-stories') {
    return { path: barrel, name: `${component}Props` };
  }

  throw new Error(`Cannot resolve ${component}Props in ${library}`);
}
