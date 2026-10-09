import { type Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { collectPublicExports } from './public-exports';

describe('collectPublicExports', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  function collect(files: Record<string, string>, entry = 'src/index.ts') {
    for (const [filePath, contents] of Object.entries(files)) {
      tree.write(filePath, contents);
    }

    return collectPublicExports(tree, entry);
  }

  it('collects named re-exports without following the module', () => {
    const { values } = collect({
      'src/index.ts': `export { useButtonBase_unstable, Button } from './Button';`,
    });

    expect([...values]).toEqual(['useButtonBase_unstable', 'Button']);
  });

  it('takes the exported alias rather than the local name', () => {
    const { values } = collect({
      'src/index.ts': `export { useFoo as useFooBase_unstable } from './Foo';`,
    });

    expect([...values]).toEqual(['useFooBase_unstable']);
  });

  it('collects local exported declarations', () => {
    const { values } = collect({
      'src/index.ts': [
        `export const useBadgeBase_unstable = () => {};`,
        `export function helper() {}`,
        `export class Thing {}`,
        `export enum Level {}`,
      ].join('\n'),
    });

    expect([...values].sort()).toEqual(['Level', 'Thing', 'helper', 'useBadgeBase_unstable']);
  });

  it('collects a namespace re-export binding', () => {
    const { values } = collect({
      'src/index.ts': `export * as utils from './utils';`,
      'src/utils.ts': `export const toDataAttributeValue = () => {};`,
    });

    expect([...values]).toEqual(['utils']);
  });

  describe('type only exports', () => {
    it('excludes an entire type only re-export', () => {
      const { values } = collect({
        'src/index.ts': `export type { ButtonProps, ButtonState } from './Button';`,
      });

      expect([...values]).toEqual([]);
    });

    it('excludes individually type only specifiers', () => {
      const { values } = collect({
        'src/index.ts': `export { type ButtonProps, useButtonBase_unstable } from './Button';`,
      });

      expect([...values]).toEqual(['useButtonBase_unstable']);
    });

    it('excludes interfaces and type aliases', () => {
      const { values } = collect({
        'src/index.ts': [`export interface ButtonProps {}`, `export type ButtonState = { a: 1 };`].join('\n'),
      });

      expect([...values]).toEqual([]);
    });
  });

  describe('star re-exports', () => {
    it('follows a relative star re-export', () => {
      const { values } = collect({
        'src/index.ts': `export * from './Button';`,
        'src/Button.ts': `export const useButtonBase_unstable = () => {};`,
      });

      expect([...values]).toEqual(['useButtonBase_unstable']);
    });

    it('follows a star re-export transitively', () => {
      const { values } = collect({
        'src/index.ts': `export * from './components';`,
        'src/components/index.ts': `export * from './Button';`,
        'src/components/Button.ts': `export const useButtonBase_unstable = () => {};`,
      });

      expect([...values]).toEqual(['useButtonBase_unstable']);
    });

    it.each([
      ['a tsx file', 'src/Button.tsx'],
      ['a directory index', 'src/Button/index.ts'],
    ])('resolves %s', (_name, filePath) => {
      const { values } = collect({
        'src/index.ts': `export * from './Button';`,
        [filePath]: `export const useButtonBase_unstable = () => {};`,
      });

      expect([...values]).toEqual(['useButtonBase_unstable']);
    });

    it('reports an unresolvable star re-export instead of silently dropping it', () => {
      const { values, unresolved } = collect({
        'src/index.ts': `export * from '@fluentui/react-utilities';`,
      });

      expect([...values]).toEqual([]);
      expect(unresolved).toEqual(['src/index.ts -> @fluentui/react-utilities']);
    });

    it('terminates on a cyclic module graph', () => {
      const { values } = collect({
        'src/index.ts': `export * from './a';`,
        'src/a.ts': `export * from './b';\nexport const fromA = 1;`,
        'src/b.ts': `export * from './a';\nexport const fromB = 2;`,
      });

      expect([...values].sort()).toEqual(['fromA', 'fromB']);
    });
  });

  it('returns nothing for a missing entry file', () => {
    expect(collectPublicExports(tree, 'src/nope.ts')).toEqual({ values: new Set(), unresolved: [] });
  });
});
