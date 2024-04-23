import * as fs from 'node:fs';

import { workspaceRoot } from '@nx/devkit';

import { getRawMetadata } from './metadata-utils';

describe(`metadata-utils`, () => {
  it(`should fetch packageJson and project.json`, () => {
    const { root } = setup('react-one');
    const actual = getRawMetadata(root);

    expect(actual.packageJson).toMatchInlineSnapshot(`
      Object {
        "name": "@proj/react-one",
        "private": true,
        "version": "0.0.0",
      }
    `);
    expect(actual.project).toEqual({
      name: '@proj/react-one',
    });

    expect(actual.hasBabel()).toEqual(false);
    expect(actual.hasJest()).toEqual(false);
    expect(actual.hasSass()).toEqual(true);
  });
});

function setup(projectRootDirName: string) {
  function tmpFolder() {
    return `${workspaceRoot}/tmp`;
  }
  function tmpProjPath(path?: string) {
    return path ? `${tmpFolder()}/__tests__/proj/${path}` : `${tmpFolder()}/nx-e2e/proj`;
  }
  function cleanup() {
    fs.rmSync(tmpProjPath(), { recursive: true, force: true });
  }

  cleanup();

  const root = tmpProjPath(projectRootDirName);
  fs.mkdirSync(root, { recursive: true });

  fs.writeFileSync(
    `${root}/package.json`,
    JSON.stringify({ name: `@proj/${projectRootDirName}`, version: '0.0.0', private: true }),
  );
  fs.writeFileSync(`${root}/project.json`, JSON.stringify({ name: `@proj/${projectRootDirName}` }));

  fs.mkdirSync(`${root}/src/foo`, { recursive: true });
  fs.writeFileSync(`${root}/src/foo/hello.scss`, 'body { color: red; }', 'utf-8');

  return { root };
}
