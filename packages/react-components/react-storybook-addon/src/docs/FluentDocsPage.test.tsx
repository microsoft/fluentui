import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { DocsContext, type DocsContextProps } from '@storybook/addon-docs/blocks';
import type { PreparedStory } from 'storybook/internal/types';
import { Channel } from 'storybook/internal/channels';
import { buttonClassNames } from '@fluentui/react-button';

import type { FluentParameters } from '../hooks';
import { FluentDocsPage, type FluentDocsPageProps } from './FluentDocsPage';

jest.mock('@storybook/addon-docs/blocks', () => ({
  DocsContext: jest.requireActual<typeof React>('react').createContext({}),
  ArgTypes: jest.fn(() => <div data-testid="arg-types" />),
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

const buttonParameters: FluentParameters = {
  reactStorybookAddon: {
    classNames: [{ exportName: 'buttonClassNames', classNames: buttonClassNames }],
  },
};

function renderDocs(parameters: FluentParameters, configured: boolean, props: FluentDocsPageProps = {}) {
  const story: PreparedStory = {
    componentId: 'component',
    title: 'Component',
    kind: 'Component',
    id: 'component--default',
    name: 'Default',
    story: 'Default',
    tags: [],
    component: () => null,
    moduleExport: {},
    initialArgs: {},
    argTypes: {},
    parameters: { ...parameters, docs: { skipPrimaryStory: true, ...parameters.docs } },
    originalStoryFn: jest.fn(),
    undecoratedStoryFn: jest.fn(),
    unboundStoryFn: jest.fn(),
    applyLoaders: jest.fn(),
    applyBeforeEach: jest.fn(),
    applyAfterEach: jest.fn(),
    runStep: jest.fn(),
    mount: jest.fn(),
    usesMount: false,
    storyGlobals: {},
  };
  const context: DocsContextProps = {
    referenceMeta: jest.fn(),
    resolveOf: jest.fn(),
    storyIdByName: jest.fn(),
    storyById: () => story,
    componentStories: () => [story],
    componentStoriesFromCSFFile: () => [story],
    getStoryContext: jest.fn().mockReturnValue({ ...story, globals: {} }),
    loadStory: jest.fn(),
    renderStoryToElement: jest.fn(),
    channel: new Channel({}),
    projectAnnotations: {
      parameters: { reactStorybookAddon: { docs: configured } },
      runStep: jest.fn(),
      beforeAll: jest.fn(),
    },
  };

  return render(
    <DocsContext.Provider value={context}>
      <FluentDocsPage {...props} />
    </DocsContext.Provider>,
  );
}

describe.each([false, true])('FluentDocsPage class names (configured: %s)', configured => {
  it('renders the imported class names in a labeled semantic table', () => {
    renderDocs(buttonParameters, configured);

    const table = screen.getByRole('table', { name: 'buttonClassNames' });
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map(cell => cell.textContent),
    ).toEqual(['Slot', 'Class name']);
    expect(
      within(table)
        .getAllByRole('row')
        .map(row => row.textContent),
    ).toEqual(['SlotClass name', `root${buttonClassNames.root}`, `icon${buttonClassNames.icon}`]);
    expect(screen.getByTestId('arg-types')).toBeTruthy();
  });

  it('preserves group order and supports components with only a root class name', () => {
    renderDocs(
      {
        reactStorybookAddon: {
          classNames: [
            { exportName: 'rootOnlyClassNames', classNames: { root: 'fui-RootOnly' } },
            { exportName: 'buttonClassNames', classNames: buttonClassNames },
          ],
        },
      },
      configured,
    );

    const tables = screen.getAllByRole('table');
    expect(tables.map(table => table.querySelector('caption')?.textContent)).toEqual([
      'rootOnlyClassNames',
      'buttonClassNames',
    ]);
    expect(
      within(tables[0])
        .getAllByRole('row')
        .map(row => row.textContent),
    ).toEqual(['SlotClass name', 'rootfui-RootOnly']);
  });

  it.each([
    {},
    { reactStorybookAddon: { classNames: [] } },
    { reactStorybookAddon: { classNames: [{ exportName: 'emptyClassNames', classNames: {} }] } },
  ])('does not render a class-name card without exported entries (%j)', parameters => {
    renderDocs(parameters, configured);

    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.queryByText('Customizing component slot styles with class names')).toBeNull();
    expect(screen.getByTestId('arg-types')).toBeTruthy();
  });

  it('hides the class-name card with the API table', () => {
    renderDocs({ ...buttonParameters, docs: { hideArgsTable: true } }, configured);

    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.queryByTestId('arg-types')).toBeNull();
  });

  it('preserves a custom renderer as a replacement for the complete API section', () => {
    const renderArgsTable = jest.fn(() => <div>Custom API section</div>);
    renderDocs(buttonParameters, configured, { renderArgsTable });

    expect(renderArgsTable).toHaveBeenCalled();
    expect(screen.getByText('Custom API section')).toBeTruthy();
    expect(screen.queryByRole('table')).toBeNull();
    expect(screen.queryByTestId('arg-types')).toBeNull();
  });
});
