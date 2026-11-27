import * as React from 'react';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import * as ts from 'typescript';
import { withCompilerOptions } from 'react-docgen-typescript';
import { INTERNAL_DEFAULT_PROJECT_ANNOTATIONS } from '@storybook/react-webpack5';
import { normalizeProjectAnnotations, prepareStory } from 'storybook/internal/preview-api';
import { DocsContext, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { Channel } from 'storybook/internal/channels';
import { ensure, ThemeProvider, themes } from 'storybook/theming';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { FluentDocsPage } from './FluentDocsPage';

jest.mock('@storybook/addon-docs/blocks', () => ({
  ...jest.requireActual('@storybook/addon-docs/blocks'),
  Title: jest.fn(() => null),
  Subtitle: jest.fn(() => null),
  Description: jest.fn(() => null),
  Primary: jest.fn(() => null),
  Stories: jest.fn(() => null),
}));
jest.mock('./ThemePicker', () => ({ ThemePicker: jest.fn(() => null) }));
jest.mock('./DirSwitch', () => ({ DirSwitch: jest.fn(() => null) }));
jest.mock('./CopyAsMarkdownButton', () => ({ CopyAsMarkdownButton: jest.fn(() => null) }));
jest.mock('./Toc', () => ({ Toc: jest.fn(() => null) }));

const packagesRoot = resolve(__dirname, '../../..').replace(/\\/g, '/');
const walk = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap(entry =>
    entry.isDirectory()
      ? /^(node_modules|dist|lib|lib-commonjs|coverage)$/.test(entry.name)
        ? []
        : walk(join(directory, entry.name))
      : [join(directory, entry.name)],
  );
const files = walk(packagesRoot).map(file => file.replace(/\\/g, '/'));
const entryPoints = files.filter(
  file =>
    /\/(?:library\/)?src\/index\.ts$/.test(file) ||
    /react-headless-components-preview\/library\/src\/components\/[^/]+\/index\.ts$/.test(file),
);
const compilerOptions: ts.CompilerOptions = {
  jsx: ts.JsxEmit.React,
  esModuleInterop: true,
  target: ts.ScriptTarget.ES2020,
  moduleResolution: ts.ModuleResolutionKind.Node10,
};
const program = ts.createProgram(entryPoints, compilerOptions);
const checker = program.getTypeChecker();
const componentFiles = new Set<string>();
for (const entry of entryPoints) {
  const source = program.getSourceFile(entry);
  const moduleSymbol = source && checker.getSymbolAtLocation(source);
  if (!moduleSymbol) {
    continue;
  }
  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    // eslint-disable-next-line no-bitwise -- TypeScript symbol flags are a bitmask.
    const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
    const declaration = symbol.valueDeclaration;
    if (
      declaration &&
      /^[A-Z]/.test(exported.name) &&
      /ForwardRef(Component|ExoticComponent)/.test(
        checker.typeToString(checker.getTypeOfSymbolAtLocation(symbol, declaration)),
      ) &&
      declaration.getSourceFile().fileName.startsWith(packagesRoot) &&
      !/\/(dist|lib|lib-commonjs)\//.test(declaration.getSourceFile().fileName)
    ) {
      componentFiles.add(declaration.getSourceFile().fileName);
    }
  }
}
const parser = withCompilerOptions(compilerOptions, {
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: prop => !prop.parent?.fileName.includes('node_modules'),
});
const componentMetadata = parser.parse([...componentFiles]);
const slotComponents = componentMetadata.filter(component =>
  Object.values(component.props).some(prop => prop.type.name.includes('WithSlotShorthandValue')),
);
const excludedPackages = new Set(['react-alert', 'react-infobutton', 'react-virtualizer']);
const packageOf = (file: string) => {
  const parts = relative(packagesRoot, file).replace(/\\/g, '/').split('/');
  return parts[0] === 'deprecated' ? parts[1] : parts[0];
};
const inScope = (file: string) =>
  !excludedPackages.has(packageOf(file)) && !packageOf(file).startsWith('react-migration-');

const documentedComponents = new Set<string>();
for (const file of files.filter(candidate => /\/stories\/src\/.*\/index\.stories\.(ts|tsx)$/.test(candidate))) {
  const source = ts.createSourceFile(file, readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const visit = (node: ts.Node) => {
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(source) === 'component' &&
      ts.isIdentifier(node.initializer)
    ) {
      documentedComponents.add(`${packageOf(file)}/${node.initializer.text}`);
    }
    if (
      ts.isPropertyAssignment(node) &&
      node.name.getText(source) === 'subcomponents' &&
      ts.isObjectLiteralExpression(node.initializer)
    ) {
      for (const property of node.initializer.properties) {
        if (ts.isShorthandPropertyAssignment(property)) {
          documentedComponents.add(`${packageOf(file)}/${property.name.text}`);
        } else if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.initializer)) {
          documentedComponents.add(`${packageOf(file)}/${property.initializer.text}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
}

describe('project-wide slot documentation', () => {
  const originalResizeObserver = globalThis.ResizeObserver;
  beforeAll(() => {
    globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  afterAll(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });
  it('registers every exported slot-bearing component in its package documentation', () => {
    const missing = slotComponents
      .filter(component => inScope(component.filePath))
      .map(component => `${packageOf(component.filePath)}/${component.displayName}`)
      .filter(key => !documentedComponents.has(key));
    expect(missing).toEqual([]);
  });

  it.each(slotComponents.filter(component => inScope(component.filePath)))(
    'renders real docgen slot rows and guidance across rerenders and revisits: $filePath / $displayName',
    metadata => {
      const docgen = {
        ...metadata,
        props: Object.fromEntries(
          Object.entries(metadata.props).map(([name, prop]) => [name, { ...prop, type: { ...prop.type } }]),
        ),
      };
      const component = Object.assign(
        React.forwardRef<HTMLDivElement>((_props, ref) => <div ref={ref} />),
        { displayName: metadata.displayName, __docgenInfo: docgen },
      );
      const storyExport = { render: () => <></> };
      const story = prepareStory(
        { id: 'slots--default', name: 'Default', moduleExport: storyExport, userStoryFn: storyExport.render },
        {
          id: 'slots',
          title: 'Slots',
          component,
          subcomponents: { Child: component },
          parameters: { docs: { skipPrimaryStory: true } },
        },
        normalizeProjectAnnotations(INTERNAL_DEFAULT_PROJECT_ANNOTATIONS),
      );
      const context: DocsContextProps = {
        referenceMeta: jest.fn(),
        resolveOf: jest.fn().mockReturnValue({ type: 'story', story }),
        storyIdByName: jest.fn(),
        storyById: () => story,
        componentStories: () => [story],
        componentStoriesFromCSFFile: () => [story],
        getStoryContext: jest.fn().mockReturnValue({ ...story, globals: {} }),
        loadStory: jest.fn(),
        renderStoryToElement: jest.fn(),
        channel: new Channel({}),
        projectAnnotations: {
          runStep: jest.fn(),
          beforeAll: jest.fn(),
          parameters: {
            reactStorybookAddon: {
              docs: { themePicker: false, dirSwitcher: false, copyAsMarkdown: false, tableOfContents: false },
            },
          },
        },
      };
      const docs = () => (
        <ThemeProvider theme={ensure(themes.light)}>
          <DocsContext.Provider value={context}>
            <FluentDocsPage />
          </DocsContext.Provider>
        </ThemeProvider>
      );
      const assertTable = () => {
        for (const prop of Object.values(metadata.props).filter(p => p.type.name.includes('WithSlotShorthandValue'))) {
          const cell = screen.getByText(prop.name, { selector: 'td span' });
          const row = cell.closest('tr');
          expect(row).not.toBeNull();
          expect(within(row!).getByText(/^Slot(?:<.+>)?$/)).toBeTruthy();
          expect(row!.textContent).not.toContain('WithSlotShorthandValue');
        }
        expect(
          screen.getByText(/Slots in Fluent UI React components are designed to be modified or replaced/),
        ).toBeTruthy();
        expect(screen.getByRole('link', { name: 'Customizing components with slots' }).getAttribute('href')).toBe(
          'https://react.fluentui.dev/?path=/docs/concepts-developer-customizing-components-with-slots--docs',
        );
      };
      const view = render(docs());
      assertTable();
      fireEvent.click(screen.getByRole('tab', { name: 'Child', hidden: true }));
      assertTable();
      view.rerender(docs());
      assertTable();
      view.unmount();
      render(docs());
      assertTable();
    },
  );
});
