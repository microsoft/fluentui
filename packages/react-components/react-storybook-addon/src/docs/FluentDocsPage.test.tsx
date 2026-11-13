import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { DocsContext, type DocsContextProps } from '@storybook/addon-docs/blocks';
import type { PreparedStory } from 'storybook/internal/types';
import { Channel } from 'storybook/internal/channels';

import type { FluentParameters } from '../hooks';
import { FluentDocsPage, type FluentDocsPageProps } from './FluentDocsPage';
import { StylingApiReference } from './StylingApiReference';
import type { StylingMetadata } from './stylingMetadata';

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

const buttonClassNames = { root: 'fui-Button', icon: 'fui-Button__icon' };
const buttonParameters: FluentParameters = {
  reactStorybookAddon: {
    slotClassNameGroups: [{ exportName: 'buttonClassNames', slots: buttonClassNames }],
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

const stylingParameters: FluentParameters = {
  reactStorybookAddon: {
    docs: {
      classNames: { classNames: buttonClassNames },
      dataAttributes: {
        attributes: {
          root: {
            disabled: 'data-disabled',
            iconPosition: 'data-icon-position',
            custom: 'data-custom',
            unknown: 'data-unknown',
          },
        },
        values: { root: { iconPosition: ['before', 'after'], custom: [], unknown: null } },
      },
    },
  },
};

describe.each([false, true])('FluentDocsPage styling reference (configured: %s)', configured => {
  it('groups the API into independent initially collapsed sections with semantic tables', () => {
    renderDocs(stylingParameters, configured);
    const reference = screen.getByRole('region', { name: 'API Reference' });
    const headers = within(reference).getAllByRole('button');
    expect(headers.map(header => header.textContent)).toEqual(['Props', 'Data attributes', 'Classes']);
    expect(headers.every(header => header.getAttribute('aria-expanded') === 'false')).toBe(true);
    expect(within(reference).getAllByRole('heading', { level: 3 })).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Classes' }));
    expect(headers[2].getAttribute('aria-expanded')).toBe('true');
    expect(headers[0].getAttribute('aria-expanded')).toBe('false');
    expect(screen.getByRole('table', { name: 'Classes' }).textContent).toContain('rootfui-Buttoniconfui-Button__icon');
    fireEvent.click(screen.getByRole('button', { name: 'Data attributes' }));
    expect(headers[1].getAttribute('aria-expanded')).toBe('true');
    expect(headers[2].getAttribute('aria-expanded')).toBe('true');
    const table = screen.getByRole('table', { name: 'Data attributes' });
    expect(
      within(table)
        .getAllByRole('row')
        .map(row => row.textContent),
    ).toEqual([
      'SlotAttributeValue',
      'rootdata-disabledpresence',
      'rootdata-icon-position"before" | "after"',
      'rootdata-customstring',
    ]);
    expect(screen.queryByText('data-unknown')).toBeNull();
    fireEvent.click(headers[0]);
    expect(screen.getByTestId('arg-types')).toBeTruthy();
    fireEvent.click(headers[2]);
    expect(headers[2].getAttribute('aria-expanded')).toBe('false');
  });

  it('replaces generated metadata per authored section, preserving the other section', () => {
    renderDocs(
      {
        __generatedStylingMetadata: {
          classNames: { classNames: { root: 'generated-root' } },
          dataAttributes: { attributes: { root: { active: 'data-active' } } },
        },
        reactStorybookAddon: { docs: { classNames: { classNames: buttonClassNames } } },
      },
      configured,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Classes' }));
    fireEvent.click(screen.getByRole('button', { name: 'Data attributes' }));
    expect(screen.getByText('fui-Button')).toBeTruthy();
    expect(screen.queryByText('generated-root')).toBeNull();
    expect(screen.getByText('data-active')).toBeTruthy();
  });

  it.each<FluentParameters>([
    {
      reactStorybookAddon: { docs: false },
      __generatedStylingMetadata: { classNames: { classNames: buttonClassNames } },
    },
    { reactStorybookAddon: { docs: { classNames: { classNames: {} } } } },
    {
      reactStorybookAddon: {
        docs: {
          dataAttributes: { attributes: { root: { unknown: 'data-unknown' } }, values: { root: { unknown: null } } },
        },
      },
    },
  ])('retains the original layout without renderable metadata (%j)', parameters => {
    renderDocs(parameters, configured);
    expect(screen.queryByRole('region', { name: 'API Reference' })).toBeNull();
    expect(screen.queryByRole('heading', { name: 'API Reference' })).toBeNull();
    expect(screen.getByTestId('arg-types')).toBeTruthy();
  });

  describe('Styling API component families', () => {
    const metadata: StylingMetadata = {
      classNames: {
        components: {
          Accordion: { classNames: { root: 'fui-Accordion' } },
          Empty: { classNames: {} },
          AccordionHeader: { classNames: { root: 'fui-AccordionHeader', button: 'fui-AccordionHeader__button' } },
        },
      },
    };

    it('switches between named component tables with complete tab/panel relationships', () => {
      render(<StylingApiReference metadata={metadata}>Props</StylingApiReference>);
      fireEvent.click(screen.getByRole('button', { name: 'Classes' }));
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toEqual([
        screen.getByRole('tab', { name: 'Accordion' }),
        screen.getByRole('tab', { name: 'AccordionHeader' }),
      ]);
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(screen.getByRole('table', { name: 'Accordion classes' })).toBeTruthy();

      fireEvent.click(tabs[1]);
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(screen.getByRole('table', { name: 'AccordionHeader classes' }).textContent).toContain(
        'buttonfui-AccordionHeader__button',
      );
      expect(screen.queryByRole('table', { name: 'Accordion classes' })).toBeNull();
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      for (const tab of tabs) {
        const panel = panels.find(candidate => candidate.id === tab.getAttribute('aria-controls'));
        expect(panel?.getAttribute('role')).toBe('tabpanel');
        expect(panel?.getAttribute('aria-labelledby')).toBe(tab.id);
      }
    });

    it('selects the first remaining family if the selected component is removed', () => {
      const { rerender } = render(<StylingApiReference metadata={metadata}>Props</StylingApiReference>);
      fireEvent.click(screen.getByRole('button', { name: 'Classes' }));
      fireEvent.click(screen.getByRole('tab', { name: 'AccordionHeader' }));
      rerender(
        <StylingApiReference
          metadata={{
            classNames: {
              components: {
                Accordion: { classNames: { root: 'fui-Accordion' } },
                Panel: { classNames: { root: 'fui-Panel' } },
              },
            },
          }}
        >
          Props
        </StylingApiReference>,
      );
      expect(screen.getByRole('tab', { name: 'Accordion' }).getAttribute('aria-selected')).toBe('true');
      expect(screen.getByRole('table', { name: 'Accordion classes' })).toBeTruthy();
    });

    it('keeps singleton family identity without a redundant tablist and hides unknown attribute groups', () => {
      render(
        <StylingApiReference
          metadata={{
            dataAttributes: {
              components: {
                Unknown: { attributes: { root: { state: 'data-state' } }, values: { root: { state: null } } },
                Button: { attributes: { root: { disabled: 'data-disabled' } } },
              },
            },
          }}
        >
          Props
        </StylingApiReference>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Data attributes' }));
      expect(screen.queryByRole('tablist')).toBeNull();
      const table = screen.getByRole('table', { name: 'Button data attributes' });
      expect(table.querySelector('caption')?.textContent).toBe('Button');
      expect(table.textContent).toContain('data-disabled');
      expect(screen.queryByText('data-state')).toBeNull();
    });
  });

  it('hides the entire reference with the API table', () => {
    renderDocs({ ...stylingParameters, docs: { hideArgsTable: true } }, configured);
    expect(screen.queryByRole('heading', { name: 'API Reference' })).toBeNull();
    expect(screen.queryByTestId('arg-types')).toBeNull();
  });

  it('lets a custom renderer replace the entire reference', () => {
    renderDocs(stylingParameters, configured, { renderArgsTable: () => <div>Custom API reference</div> });
    expect(screen.getByText('Custom API reference')).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'API Reference' })).toBeNull();
  });
});

describe.each([false, true])('FluentDocsPage class names (configured: %s)', configured => {
  it('renders the supplied class names in a labeled semantic table', () => {
    renderDocs(buttonParameters, configured);

    expect(
      screen.getByRole('heading', { name: 'Customizing component slot styles with class names', level: 2 }),
    ).toBeTruthy();
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
    ).toEqual(['SlotClass name', 'rootfui-Button', 'iconfui-Button__icon']);
    expect(screen.getByTestId('arg-types')).toBeTruthy();
  });

  it('preserves group order and supports components with only a root class name', () => {
    renderDocs(
      {
        reactStorybookAddon: {
          slotClassNameGroups: [
            { exportName: 'rootOnlyClassNames', slots: { root: 'fui-RootOnly' } },
            { exportName: 'buttonClassNames', slots: buttonClassNames },
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
    { reactStorybookAddon: { slotClassNameGroups: [] } },
    { reactStorybookAddon: { slotClassNameGroups: [{ exportName: 'emptyClassNames', slots: {} }] } },
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
