import * as fs from 'fs';
import * as path from 'path';

import { workspaceRoot } from '@nx/devkit';

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

const MARKER = '__generatedStylingMetadata: ';

/** Parses the injected JSON, which is followed by the rest of the story source. */
function generated(output: string) {
  const start = output.indexOf(MARKER);
  if (start === -1) {
    return undefined;
  }
  const json = output.slice(start + MARKER.length);
  for (let end = json.indexOf('}'); end !== -1; end = json.indexOf('}', end + 1)) {
    try {
      return JSON.parse(json.slice(0, end + 1));
    } catch {
      // keep extending until the object is balanced
    }
  }
  throw new Error('Unterminated generated styling metadata');
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

      expect(output).toContain(`parameters: { ...({ layout: 'centered' }), __generatedStylingMetadata:`);
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

      expect(output).toContain(`const meta = { parameters: {`);
      expect(generated(output)).toEqual({ classNames: { classNames: { root: 'fui-Card' } } });
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
      expect(extractor.getDiagnosticsFor('fixture-components', 'Tile')).toEqual([
        expect.objectContaining({ code: 'unresolved-map', component: 'Tile' }),
      ]);
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
