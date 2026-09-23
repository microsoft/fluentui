import * as Babel from '@babel/core';
import * as path from 'path';
import * as fs from 'fs';
import { inlineLocalImports } from './inlineLocalImports';
import { localStorySource } from './local-story-source';

const stories = path.resolve(
  __dirname,
  '../../../packages/react-components/react-headless-components-preview/stories/src',
);

describe('inlineLocalImports', () => {
  it('renames colliding helper declarations and deduplicates their shared dependencies', () => {
    const filename = path.join(stories, 'TagPicker/TagPickerNoPopover.stories.tsx');
    const source = `
      import * as React from 'react';
      import { SelectedTag as ImportedTag, getInitials } from './utils';
      const Media = 'existing';
      export const Example = () => <><ImportedTag value={getInitials('Ada Lovelace')} /><span>{Media}</span></>;
    `;
    const result = inlineLocalImports(Babel, source, filename);
    expect(result.code).toContain('const Media1');
    expect(result.code).toContain('media={<Media1');
    expect(result.code).toContain('const Media =');
    expect(result.code).not.toContain('ImportedTag');
    const ast = Babel.parseSync(result.code, {
      babelrc: false,
      configFile: false,
      parserOpts: { plugins: ['typescript', 'jsx'] },
    });
    const reactImports = ast!.program.body.filter(
      node => Babel.types.isImportDeclaration(node) && node.source.value === 'react',
    );
    expect(reactImports).toHaveLength(1);
  });

  it('fails explicitly for an unresolved helper instead of dropping its import', () => {
    expect(() =>
      inlineLocalImports(
        Babel,
        `import { Missing } from './not-a-helper';`,
        path.join(stories, 'TagPicker/example.tsx'),
      ),
    ).toThrow('Cannot inline local example import');
  });

  it.each([
    ['Concepts/Positioning/PositioningFallbackPositions.stories.tsx', 'InlineAnchored'],
    ['Concepts/Positioning/PositioningFlippingBlock.stories.tsx', 'InlineAnchored'],
    ['Concepts/Positioning/PositioningFlippingInline.stories.tsx', 'InlineAnchored'],
    ['Concepts/Positioning/PositioningFlippingCorner.stories.tsx', 'InlineAnchored'],
    ['TagPicker/TagPickerNoPopover.stories.tsx', 'SelectedTag'],
  ])('includes helpers and CSS for %s', (file, helper) => {
    const filename = path.join(stories, file);
    const result = inlineLocalImports(Babel, fs.readFileSync(filename, 'utf8'), filename);
    expect(result.code).toContain(`const ${helper}`);
    expect(result.code).not.toMatch(/from ['"]\.\/(InlineAnchored|utils)['"]/);
    expect(result.cssModules).toHaveLength(1);
    expect(result.cssModules[0].source).not.toHaveLength(0);
    expect(() =>
      Babel.parseSync(result.code, {
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
      }),
    ).not.toThrow();
    if (helper === 'SelectedTag') {
      expect(result.code).toContain('const Media');
      expect(result.code).toContain('const getInitials');
      expect(result.code).toContain('const tagPickerPositioning');
    }
  });

  it.each([
    ['TagPicker/TagPickerNoPopover.stories.tsx', 'SelectedTag'],
    ['Concepts/Positioning/PositioningFallbackPositions.stories.tsx', 'InlineAnchored'],
    ['../../../react-tree/stories/src/Tree/TreeLazyLoading.stories.tsx', 'mockFetch'],
  ])('attaches complete source metadata for %s without inlining the live module', (file, helper) => {
    const filename = path.join(stories, file);
    const warnings = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      const result = Babel.transformSync(fs.readFileSync(filename, 'utf8'), {
        filename,
        babelrc: false,
        configFile: false,
        ast: true,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [() => localStorySource({ importMappings: {}, cssModules: true })],
      });
      let source = '';
      Babel.traverse(result!.ast!, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ObjectProperty(node) {
          if (
            Babel.types.isIdentifier(node.node.key, { name: 'fullSource' }) &&
            Babel.types.isStringLiteral(node.node.value)
          ) {
            source += node.node.value.value;
          }
        },
      });
      expect(source).not.toBe('');
      expect(source).toContain(helper);
      if (file.startsWith('TagPicker/')) {
        expect(source).toContain('const getInitials');
        expect(source).toContain('./styles/tag-picker.module.css');
        expect(result!.code).toContain('cssModuleSources');
        expect(result!.code).toContain('tag-picker.module.css');
      }
      expect(warnings.mock.calls.some(([message]) => String(message).includes('Relative import'))).toBe(false);
      const original = Babel.parseSync(fs.readFileSync(filename, 'utf8'), {
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ['typescript', 'jsx'] },
      });
      const imports = (ast: NonNullable<typeof original>) =>
        ast.program.body
          .filter(node => Babel.types.isImportDeclaration(node))
          .map(node => (Babel.types.isImportDeclaration(node) ? node.source.value : ''));
      expect(imports(result!.ast! as NonNullable<typeof original>)).toEqual(imports(original!));
    } finally {
      warnings.mockRestore();
    }
  });
});
