import * as ejs from 'ejs';
import { readFileSync } from 'node:fs';
import { join, posix, win32 } from 'node:path';

const templatePath = join(__dirname, '../files/tsconfig.json.template');
const template = readFileSync(templatePath, 'utf-8');

describe('tsconfig template', () => {
  it.each([
    { name: 'Windows', path: win32 },
    { name: 'POSIX', path: posix },
  ])('preserves $name paths, quotes and backslashes as JSON strings', ({ path }) => {
    const relativePathToProjectRoot = path.join('..', '..', 'origin "quoted"', 'back\\slash');
    const usedNodeModulesDirRelative = path.join('..', 'react "root"', 'back\\slash');
    const tsconfig = {
      pathToProjectConfig: path.join('config "quoted"', 'tsconfig.json'),
      target: 'ES2021',
      moduleResolution: 'node',
      lib: ['ES2021', 'DOM', 'quoted"\\value'],
      strictMode: false,
      relativeExcludePaths: [path.join(relativePathToProjectRoot, 'excluded', '**')],
      relativeIncludePaths: [path.join(relativePathToProjectRoot, 'src', '**', '*.ts')],
      relativeFilesPaths: [path.join(relativePathToProjectRoot, 'src', 'file "quoted"\\name.ts')],
    };

    const rendered = ejs.render(
      template,
      { relativePathToProjectRoot, usedNodeModulesDirRelative, tsconfig },
      { filename: templatePath },
    );

    expect(JSON.parse(rendered)).toEqual({
      extends: `${relativePathToProjectRoot}/${tsconfig.pathToProjectConfig}`,
      compilerOptions: {
        target: 'ES2021',
        module: 'esnext',
        moduleResolution: 'node',
        lib: tsconfig.lib,
        strict: false,
        pretty: true,
        noEmit: true,
        isolatedModules: true,
        jsx: 'react',
        skipLibCheck: true,
        types: [],
        typeRoots: [`${usedNodeModulesDirRelative}/node_modules/@types`],
        baseUrl: '.',
        paths: {
          'react/jsx-runtime': [`${usedNodeModulesDirRelative}/node_modules/@types/react/jsx-runtime.d.ts`],
          react: [`${usedNodeModulesDirRelative}/node_modules/@types/react/index.d.ts`],
          'react-dom': [`${usedNodeModulesDirRelative}/node_modules/@types/react-dom/index.d.ts`],
        },
      },
      references: [],
      exclude: tsconfig.relativeExcludePaths,
      include: tsconfig.relativeIncludePaths,
      files: tsconfig.relativeFilesPaths,
    });
  });

  it('preserves empty arrays and boolean strict mode', () => {
    const rendered = ejs.render(template, {
      relativePathToProjectRoot: '../..',
      usedNodeModulesDirRelative: '..',
      tsconfig: {
        pathToProjectConfig: 'tsconfig.lib.json',
        target: 'ES2020',
        moduleResolution: 'node',
        lib: [],
        strictMode: true,
        relativeExcludePaths: [],
        relativeIncludePaths: [],
        relativeFilesPaths: [],
      },
    });
    expect(JSON.parse(rendered)).toMatchObject({
      compilerOptions: { strict: true, lib: [] },
      exclude: [],
      include: [],
      files: [],
    });
  });
});
