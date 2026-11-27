import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DocsContext, type DocsContextProps } from '@storybook/addon-docs/blocks';
import { Channel } from 'storybook/internal/channels';
import type { PreparedStory, SBScalarType } from 'storybook/internal/types';

import { FluentDocsPage } from './FluentDocsPage';

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

function createStory(): PreparedStory {
  return {
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
    parameters: { docs: { skipPrimaryStory: true } },
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
}

function createDocs(story: PreparedStory, slotsApi = true, nativePropsApi = true) {
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
      parameters: {
        reactStorybookAddon: {
          docs: {
            tableOfContents: false,
            themePicker: false,
            dirSwitcher: false,
            copyAsMarkdown: false,
            argTable: { slotsApi, nativePropsApi },
          },
        },
      },
      runStep: jest.fn(),
      beforeAll: jest.fn(),
    },
  };
  return (
    <DocsContext.Provider value={context}>
      <FluentDocsPage />
    </DocsContext.Provider>
  );
}

function expectSlotGuidance() {
  expect(screen.getByText(/Slots in Fluent UI React components are designed to be modified or replaced/)).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Customizing components with slots' }).getAttribute('href')).toBe(
    './?path=/docs/concepts-developer-customizing-components-with-slots--docs',
  );
}

describe('FluentDocsPage slot guidance', () => {
  it.each([
    ['{ as?: "span"; children?: ReactNode }', 'Slot<"span">'],
    ['WithSlotShorthandValue<HTMLAttributes<HTMLElement>>', 'Slot'],
    ['Slot', 'Slot'],
    ['Slot<"span">', 'Slot<"span">'],
  ])('keeps guidance and readable story summaries across rerenders and revisits for %s', (input, expected) => {
    const story = createStory();
    const argType = { name: 'icon', description: 'The icon slot.', table: { type: { summary: input } } };
    story.argTypes.icon = argType;
    const view = render(createDocs(story));

    expectSlotGuidance();
    expect(argType.table.type.summary).toBe(expected);
    view.rerender(createDocs(story));
    view.rerender(createDocs(story));
    expectSlotGuidance();
    expect(argType.table.type.summary).toBe(expected);
    expect(argType.description).toBe('The icon slot.');

    view.unmount();
    render(createDocs(story));
    expectSlotGuidance();
    expect(argType.table.type.summary).toBe(expected);
  });

  it.each([
    ['{ as?: "span"; children?: ReactNode }', 'Slot<"span">'],
    ['WithSlotShorthandValue<HTMLAttributes<HTMLElement>>', 'Slot'],
    ['Slot', 'Slot'],
    ['Slot<"span">', 'Slot<"span">'],
  ])('keeps guidance for story type names without a slot summary: %s', (input, expected) => {
    const story = createStory();
    // Docgen names and the enhancer's output extend Storybook's strict type-name union.
    const argType = { name: 'icon', type: { name: input as SBScalarType['name'] } };
    story.argTypes.icon = argType;
    const view = render(createDocs(story));
    expectSlotGuidance();
    expect(argType.type.name).toBe(expected);

    view.rerender(createDocs(story));
    expectSlotGuidance();
    expect(argType.type.name).toBe(expected);
  });

  it.each(['component', 'subcomponent'])('keeps %s docgen summaries and names normalized', source => {
    const story = createStory();
    const props = {
      icon: {
        table: { type: { summary: '{ as?: "span"; children?: ReactNode }' } },
        type: { name: 'WithSlotShorthandValue<HTMLAttributes<HTMLElement>>' },
      },
    };
    const component = { __docgenInfo: { props } };
    if (source === 'component') {
      story.moduleExport = component;
    } else {
      story.subcomponents = { Child: component };
    }
    const view = render(createDocs(story));
    expectSlotGuidance();
    expect(props.icon.table.type.summary).toBe('Slot<"span">');
    expect(props.icon.type.name).toBe('Slot');

    view.rerender(createDocs(story));
    expectSlotGuidance();
    expect(props.icon.table.type.summary).toBe('Slot<"span">');
    expect(props.icon.type.name).toBe('Slot');
  });

  it.each([
    ['component', 'summary', 'Slot'],
    ['component', 'name', 'Slot<"span">'],
    ['subcomponent', 'summary', 'Slot<"span">'],
    ['subcomponent', 'name', 'Slot'],
  ])('recognizes normalized %s docgen %s without another slot source', (source, field, input) => {
    const story = createStory();
    const argType = {
      table: { type: { summary: field === 'summary' ? input : 'string' } },
      type: { name: field === 'name' ? input : 'string' },
    };
    const component = { __docgenInfo: { props: { icon: argType } } };
    if (source === 'component') {
      story.moduleExport = component;
    } else {
      story.subcomponents = { Child: component };
    }
    render(createDocs(story));
    expectSlotGuidance();
    expect(argType.table.type.summary).toBe(field === 'summary' ? input : 'string');
    expect(argType.type.name).toBe(field === 'name' ? input : 'string');
  });

  it.each(['string', 'Slotted', 'SomeSlot', 'SlotProps', 'Slot<"span"> | undefined'])(
    'does not classify unrelated types as slots: %s',
    input => {
      const story = createStory();
      story.argTypes.value = { name: 'value', table: { type: { summary: input } } };
      render(createDocs(story));
      expect(screen.getByTestId('arg-types')).toBeTruthy();
      expect(screen.queryByText(/Slots in Fluent UI React components/)).toBeNull();
      expect(story.argTypes.value.table?.type?.summary).toBe(input);
    },
  );

  it('does not mutate slot metadata or show guidance when slotsApi is disabled', () => {
    const story = createStory();
    const input = '{ as?: "span"; children?: ReactNode }';
    story.argTypes.icon = { name: 'icon', table: { type: { summary: input } } };
    const props = { icon: { type: { name: input } } };
    story.moduleExport = { __docgenInfo: { props } };
    story.subcomponents = { Child: { __docgenInfo: { props } } };
    const view = render(createDocs(story, false));
    view.rerender(createDocs(story, false));

    expect(screen.getByTestId('arg-types')).toBeTruthy();
    expect(screen.queryByText(/Slots in Fluent UI React components/)).toBeNull();
    expect(story.argTypes.icon.table?.type?.summary).toBe(input);
    expect(props.icon.type.name).toBe(input);
  });

  it('hides the table and guidance without changing normalization when hideArgsTable is enabled', () => {
    const story = createStory();
    story.parameters.docs.hideArgsTable = true;
    story.argTypes.icon = { name: 'icon', table: { type: { summary: '{ as?: "span" }' } } };
    render(createDocs(story));
    expect(screen.queryByTestId('arg-types')).toBeNull();
    expect(screen.queryByText(/Slots in Fluent UI React components/)).toBeNull();
    expect(story.argTypes.icon.table?.type?.summary).toBe('Slot<"span">');
  });

  it('keeps native prop guidance independent of normalized slots and the native props opt-out', () => {
    const story = createStory();
    story.argTypes.icon = { name: 'icon', table: { type: { summary: 'Slot<"span">' } } };
    story.argTypes.as = { name: 'as', type: { name: 'enum', value: ['button'] } };
    const view = render(createDocs(story));
    expectSlotGuidance();
    expect(screen.getByText(/All HTML attributes native to/).textContent).toContain('<button>');

    view.rerender(createDocs(story, false));
    expect(screen.queryByText(/Slots in Fluent UI React components/)).toBeNull();
    expect(screen.getByText(/All HTML attributes native to/)).toBeTruthy();

    view.rerender(createDocs(story, true, false));
    expectSlotGuidance();
    expect(screen.queryByText(/All HTML attributes native to/)).toBeNull();
  });
});
