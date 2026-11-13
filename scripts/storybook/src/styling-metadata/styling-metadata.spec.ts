import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';

import { workspaceRoot } from '@nx/devkit';
import { loadCsf } from 'storybook/internal/csf-tools';
import * as ts from 'typescript';

import { createStylingMetadataExtractor } from './extractor';
import { transformStory } from './loader';

import { registerStylingMetadataRule } from './index';

const fixtureTsConfig = path.join(__dirname, '__fixtures__/tsconfig.json');
const fixtureStory = path.join(__dirname, '__fixtures__/Card.stories.tsx');
const headlessStories = path.join(
  workspaceRoot,
  'packages/react-components/react-headless-components-preview/stories/src',
);
const v9Stories = path.join(workspaceRoot, 'packages/react-components');

type Extractor = ReturnType<typeof createStylingMetadataExtractor>;

function generated(output: string) {
  const file = ts.createSourceFile(fixtureStory, output, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const findMetadata = (node: ts.Node): ts.PropertyAssignment | undefined => {
    if (ts.isPropertyAssignment(node) && node.name.getText(file) === '__generatedStylingMetadata') {
      return node;
    }
    return ts.forEachChild(node, findMetadata);
  };
  const property = findMetadata(file);
  if (!property) {
    return undefined;
  }
  const initializer = property.initializer;
  const defaults = ts.isObjectLiteralExpression(initializer) && initializer.properties[0];
  if (!defaults || !ts.isSpreadAssignment(defaults)) {
    throw new Error('Missing generated styling defaults');
  }
  return JSON.parse(defaults.expression.getText(file));
}

function evaluateMeta(source: string) {
  const result: { default?: { parameters: Record<string, unknown>; [key: string]: unknown } } = {};
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const component = () => null;
  const components = { Card: component, Panel: component };
  // Only test-authored fixtures are evaluated, with imports replaced by inert component stubs.
  vm.runInNewContext(outputText, { require: () => components, exports: result });
  return result.default!;
}

function transformFile(filename: string, extractor: Extractor) {
  return transformStory({ source: fs.readFileSync(filename, 'utf-8'), filename, extractor });
}

describe('styling metadata', () => {
  describe('transformStory', () => {
    const extractor = {
      extractComponent: jest.fn((_specifier: string, _importer: string, name: string) => ({
        classNames: { classNames: { root: `fui-${name}` } },
      })),
    };

    const transform = (source: string) => transformStory({ source, filename: fixtureStory, extractor });

    beforeEach(() => extractor.extractComponent.mockClear());

    it('injects metadata for the story component next to authored parameters', () => {
      const output = transform(
        [
          `import { Card } from 'fixture-components';`,
          `export default { title: 'Card', component: Card, parameters: { layout: 'centered' } } as Meta;`,
        ].join('\n'),
      );

      expect(evaluateMeta(output).parameters).toMatchObject({ layout: 'centered' });
      expect(generated(output)).toEqual({ classNames: { classNames: { root: 'fui-Card' } } });
      expect(extractor.extractComponent).toHaveBeenCalledWith('fixture-components', fixtureStory, 'Card');
    });

    it('resolves a meta declared as a local constant and aliased imports', () => {
      const output = transform(
        [
          `import { Card as FixtureCard } from 'fixture-components';`,
          `const meta = { title: 'Card', component: FixtureCard };`,
          `export default meta;`,
        ].join('\n'),
      );

      expect(evaluateMeta(output).parameters).toHaveProperty('__generatedStylingMetadata');
      expect(generated(output)).toEqual({ classNames: { classNames: { root: 'fui-Card' } } });
    });

    it.each([
      `const parameters = { layout: 'centered' }; export default { title: 'Card', component: Card, parameters };`,
      `const extra = { parameters: { layout: 'centered' } }; export default { title: 'Card', component: Card, parameters: { layout: 'fullscreen' }, ...extra };`,
    ])('preserves effective parameters and statically discoverable CSF metadata: %s', declaration => {
      const output = transform(`import { Card } from 'fixture-components'; ${declaration} export const Default = {};`);
      expect(evaluateMeta(output).parameters).toEqual({
        layout: 'centered',
        __generatedStylingMetadata: { classNames: { classNames: { root: 'fui-Card' } } },
      });
      expect(loadCsf(output, { makeTitle: title => title }).parse().meta).toMatchObject({
        title: 'Card',
        component: 'Card',
      });
    });

    it('evaluates getters once and preserves existing generated sections', () => {
      const output = transform(`
        import { Card } from 'fixture-components';
        let reads = 0;
        const extra = {
          get parameters() {
            reads++;
            return {
              get layout() { reads++; return 'centered'; },
              get __generatedStylingMetadata() {
                reads++;
                return { dataAttributes: { attributes: {} } };
              }
            };
          }
        };
        export default { title: 'Card', component: Card, ...extra, get reads() { return reads; } };
      `);
      const meta = evaluateMeta(output);
      expect(meta.reads).toBe(3);
      expect(meta.parameters).toEqual({
        layout: 'centered',
        __generatedStylingMetadata: {
          classNames: { classNames: { root: 'fui-Card' } },
          dataAttributes: { attributes: {} },
        },
      });
      expect(meta.reads).toBe(3);
    });

    it('avoids collisions with story-local identifiers', () => {
      const output = transform(`
        import { Card } from 'fixture-components';
        const __fluentStylingMeta = 'centered';
        const __fluentStylingParameters = 'preserved';
        export default { component: Card, parameters: { layout: __fluentStylingMeta, note: __fluentStylingParameters } };
      `);
      expect(evaluateMeta(output).parameters).toMatchObject({ layout: 'centered', note: 'preserved' });
    });

    it('uses the effective component after a local object spread', () => {
      const output = transform(`
        import { Card, Panel } from 'fixture-components';
        const extra = { component: Panel };
        export default { component: Card, ...extra };
      `);
      expect(generated(output)).toEqual({ classNames: { classNames: { root: 'fui-Panel' } } });
    });

    it('groups subcomponents into a component family', () => {
      const output = transform(
        [
          `import { Card, Panel } from 'fixture-components';`,
          `import { Local } from './Local.stories';`,
          `export default { component: Card, subcomponents: { Panel, Local } };`,
        ].join('\n'),
      );

      expect(generated(output)).toEqual({
        classNames: {
          components: {
            Card: { classNames: { root: 'fui-Card' } },
            Panel: { classNames: { root: 'fui-Panel' } },
            Local: { classNames: { root: 'fui-Local' } },
          },
        },
      });
    });

    it('honors the reactStorybookAddon.docs opt-out', () => {
      const source = [
        `import { Card } from 'fixture-components';`,
        `const docs = false;`,
        `export default { component: Card, parameters: { reactStorybookAddon: { docs } } };`,
      ].join('\n');

      expect(transform(source)).toBe(source);
      expect(extractor.extractComponent).not.toHaveBeenCalled();
    });

    it('honors an opt-out supplied by shorthand parameters or a later spread', () => {
      for (const meta of [
        `{ component: Card, parameters }`,
        `{ component: Card, parameters: { layout: 'centered' }, ...{ parameters } }`,
      ]) {
        const source = `import { Card } from 'fixture-components';
          const parameters = { reactStorybookAddon: { docs: false } };
          export default ${meta};`;
        expect(transform(source)).toBe(source);
      }
      expect(extractor.extractComponent).not.toHaveBeenCalled();
    });

    it('leaves stories without an imported component unchanged', () => {
      const source = `const Card = () => null;\nexport default { component: Card };`;

      expect(transform(source)).toBe(source);
    });
  });

  describe('extractor', () => {
    it('evaluates class name maps with constants and spreads', () => {
      const extractor = createStylingMetadataExtractor({ tsConfigPath: fixtureTsConfig, classNames: true });

      expect(extractor.extractComponent('fixture-components', fixtureStory, 'Card')).toEqual({
        classNames: {
          classNames: { root: 'fui-Card', header: 'fui-Card__header', footer: 'fui-Card__footer' },
        },
      });
      expect(extractor.getDiagnostics()).toEqual([]);
    });

    it('warns about class name maps it cannot evaluate', () => {
      const extractor = createStylingMetadataExtractor({ tsConfigPath: fixtureTsConfig, classNames: true });

      expect(extractor.extractComponent('fixture-components', fixtureStory, 'Tile')).toBeUndefined();
      expect(extractor.getDiagnosticsFor('fixture-components', fixtureStory, 'Tile')).toEqual([
        expect.objectContaining({ code: 'unresolved-map', component: 'Tile' }),
      ]);
    });

    it('keeps relative imports with the same spelling separate by resolved module', () => {
      const extractor = createStylingMetadataExtractor({ tsConfigPath: fixtureTsConfig, classNames: true });
      for (const name of ['first', 'second', 'first']) {
        const importer = path.join(__dirname, '__fixtures__', name, 'index.stories.tsx');
        expect(extractor.extractComponent('./Card', importer, 'Card')).toEqual({
          classNames: { classNames: { root: `fui-${name}` } },
        });
        expect(extractor.getDiagnosticsFor('./Card', importer, 'Card')).toEqual([]);
      }
    });

    it('extracts data attributes and their values', () => {
      const extractor = createStylingMetadataExtractor({ tsConfigPath: fixtureTsConfig, dataAttributes: true });

      expect(extractor.extractComponent('fixture-components', fixtureStory, 'Card')).toEqual({
        dataAttributes: {
          attributes: { root: { disabled: 'data-disabled', size: 'data-size' } },
          values: { root: { size: ['small', 'large'] } },
        },
      });
    });

    it('skips modules that do not resolve', () => {
      const extractor = createStylingMetadataExtractor({ tsConfigPath: fixtureTsConfig, classNames: true });

      expect(extractor.extractComponent('missing-module', fixtureStory, 'Card')).toBeUndefined();
      expect(extractor.getDiagnostics()).toEqual([]);
    });
  });

  // Guards the conventions of real sources the docsites document.
  describe('workspace sources', () => {
    jest.setTimeout(120_000);

    it('documents headless data attributes', () => {
      const extractor = createStylingMetadataExtractor({
        tsConfigPath: path.join(workspaceRoot, 'tsconfig.base.json'),
        dataAttributes: true,
      });

      expect(generated(transformFile(path.join(headlessStories, 'Button/index.stories.tsx'), extractor))).toEqual({
        dataAttributes: {
          attributes: {
            root: {
              disabled: 'data-disabled',
              disabledFocusable: 'data-disabled-focusable',
              iconOnly: 'data-icon-only',
              iconPosition: 'data-icon-position',
            },
          },
          values: { root: { iconPosition: ['before', 'after'] } },
        },
      });

      const accordion = generated(transformFile(path.join(headlessStories, 'Accordion/index.stories.tsx'), extractor));
      expect(Object.keys(accordion.dataAttributes.components)).toEqual([
        'Accordion',
        'AccordionHeader',
        'AccordionItem',
        'AccordionPanel',
      ]);
      expect(accordion.dataAttributes.components.AccordionHeader).toEqual({
        attributes: {
          root: { open: 'data-open', disabled: 'data-disabled', expandIconPosition: 'data-expand-icon-position' },
        },
        values: { root: { expandIconPosition: ['start', 'end'] } },
      });
      expect(accordion.classNames).toBeUndefined();

      const calendar = extractor.extractComponent(
        '@fluentui/react-headless-components-preview/calendar',
        path.join(headlessStories, 'Calendar/index.stories.tsx'),
        'CalendarYear',
      );
      expect(calendar?.dataAttributes?.attributes ?? {}).not.toHaveProperty('defaultProps');
      expect(calendar?.dataAttributes?.attributes.root ?? {}).not.toHaveProperty('selected');
      expect(
        extractor.getDiagnosticsFor(
          '@fluentui/react-headless-components-preview/calendar',
          path.join(headlessStories, 'Calendar/index.stories.tsx'),
          'CalendarYear',
        ),
      ).toEqual(
        expect.arrayContaining([expect.objectContaining({ code: 'unresolved-slot', component: 'CalendarYear' })]),
      );

      const rating = extractor.extractComponent(
        '@fluentui/react-headless-components-preview/rating-display',
        path.join(headlessStories, 'RatingDisplay/index.stories.tsx'),
        'RatingDisplay',
      );
      expect(rating?.dataAttributes?.attributes.root ?? {}).not.toHaveProperty('appearance');
      expect(extractor.getDependencies()).toContain(
        path.join(
          workspaceRoot,
          'packages/react-components/react-headless-components-preview/library/src/components/RatingDisplay/useRatingDisplay.tsx',
        ),
      );
    });

    it('documents v9 class names', () => {
      const extractor = createStylingMetadataExtractor({
        tsConfigPath: path.join(workspaceRoot, 'tsconfig.base.json'),
        classNames: true,
      });

      expect(
        generated(transformFile(path.join(v9Stories, 'react-button/stories/src/Button/index.stories.tsx'), extractor)),
      ).toEqual({ classNames: { classNames: { root: 'fui-Button', icon: 'fui-Button__icon' } } });

      const accordion = generated(
        transformFile(path.join(v9Stories, 'react-accordion/stories/src/Accordion/index.stories.tsx'), extractor),
      );
      expect(accordion.classNames.components.AccordionHeader).toEqual({
        classNames: {
          root: 'fui-AccordionHeader',
          button: 'fui-AccordionHeader__button',
          expandIcon: 'fui-AccordionHeader__expandIcon',
          icon: 'fui-AccordionHeader__icon',
        },
      });
      expect(accordion.dataAttributes).toBeUndefined();
    });
  });

  describe('registerStylingMetadataRule', () => {
    it('replaces a previously registered rule', () => {
      const config = { module: { rules: [{ test: /\.css$/ }] } };

      registerStylingMetadataRule({ config, tsConfigPath: fixtureTsConfig, classNames: true });
      registerStylingMetadataRule({ config, tsConfigPath: fixtureTsConfig, dataAttributes: true });

      expect(config.module.rules).toHaveLength(2);
      expect(config.module.rules[1]).toMatchObject({
        enforce: 'pre',
        use: { options: { tsConfigPath: fixtureTsConfig, classNames: false, dataAttributes: true } },
      });
    });

    it('removes the rule when no section is enabled', () => {
      const config = { module: { rules: [] } };

      registerStylingMetadataRule({ config, tsConfigPath: fixtureTsConfig, classNames: true });
      registerStylingMetadataRule({ config, tsConfigPath: fixtureTsConfig });

      expect(config.module.rules).toEqual([]);
    });
  });
});
