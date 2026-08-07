import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { PreparedStory, Renderer } from 'storybook/internal/types';

// ---- Storybook blocks mock ----
// Use a module-level variable that will be populated before the mock factory runs.
// We use `jest.mock` with a factory that lazily references `DocsContext` via the module.
jest.mock('@storybook/addon-docs/blocks', () => {
  const ReactMod = jest.requireActual<typeof React>('react');
  const MockDocsContext = ReactMod.createContext<unknown>(null);
  const ArgTypes = () => ReactMod.createElement('div', { 'data-testid': 'ArgTypes' });
  const Title = () => ReactMod.createElement('div', { 'data-testid': 'Title' });
  const Subtitle = () => ReactMod.createElement('div', { 'data-testid': 'Subtitle' });
  const Description = () => ReactMod.createElement('div', { 'data-testid': 'Description' });
  const Primary = () => ReactMod.createElement('div', { 'data-testid': 'Primary' });
  const Stories = () => ReactMod.createElement('div', { 'data-testid': 'Stories' });
  const HeaderMdx = ({ children, ...rest }: React.PropsWithChildren<Record<string, unknown>>) =>
    ReactMod.createElement('div', { 'data-testid': 'HeaderMdx', ...rest }, children);
  return { DocsContext: MockDocsContext, ArgTypes, Title, Subtitle, Description, Primary, Stories, HeaderMdx };
});

// After mock registration, get the context reference from the mocked module.
import { DocsContext } from '@storybook/addon-docs/blocks';

// ---- utils mock ----
const mockGetDocsPageConfig = jest.fn();
jest.mock('./utils', () => ({
  getDocsPageConfig: (...args: unknown[]) => mockGetDocsPageConfig(...args),
}));

// ---- helpers ----
const defaultDocsPageConfig = {
  tableOfContents: false,
  dirSwitcher: false,
  themePicker: false,
  copyAsMarkdown: false,
  argTable: { slotsApi: false, nativePropsApi: false },
};

const makePrimaryStory = (overrides: Partial<PreparedStory<Renderer>> = {}): PreparedStory<Renderer> =>
  ({
    id: 'story--primary',
    name: 'Default',
    componentId: 'component',
    component: () => null,
    argTypes: {},
    moduleExport: () => null,
    subcomponents: undefined,
    ...overrides,
  } as unknown as PreparedStory<Renderer>);

function renderWithContext(
  ui: React.ReactElement,
  contextValue: {
    componentStories: () => PreparedStory<Renderer>[];
    getStoryContext: (story: PreparedStory<Renderer>) => Record<string, unknown>;
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Ctx = DocsContext as React.Context<any>;
  return render(<Ctx.Provider value={contextValue}>{ui}</Ctx.Provider>);
}

// ---- tests ----
import { FluentDocsPage } from './FluentDocsPage';

const defaultContextValue = {
  componentStories: () => [makePrimaryStory()],
  getStoryContext: () => ({
    parameters: {},
    globals: {},
  }),
};

describe('FluentDocsPage — renderAfterArgsTable', () => {
  beforeEach(() => {
    mockGetDocsPageConfig.mockReturnValue(null); // default/no-docs-config branch
  });

  it('renders nothing after args table when renderAfterArgsTable is omitted (no-docs-config branch)', () => {
    renderWithContext(<FluentDocsPage />, defaultContextValue);

    // ArgTypes should be present
    expect(screen.getByTestId('ArgTypes')).toBeInTheDocument();
    // No extra content injected
    expect(screen.queryByTestId('after-args-table-slot')).not.toBeInTheDocument();
  });

  it('renders nothing after args table when renderAfterArgsTable is omitted (configured branch)', () => {
    mockGetDocsPageConfig.mockReturnValue(defaultDocsPageConfig);
    renderWithContext(<FluentDocsPage />, defaultContextValue);

    expect(screen.getByTestId('ArgTypes')).toBeInTheDocument();
    expect(screen.queryByTestId('after-args-table-slot')).not.toBeInTheDocument();
  });

  it('renders custom slot after args table and before Stories in the no-docs-config branch', () => {
    const renderAfterArgsTable = jest.fn(({ story }: { story: PreparedStory<Renderer> }) => (
      <div data-testid="after-args-table-slot">after-args-{story.id}</div>
    ));

    renderWithContext(<FluentDocsPage renderAfterArgsTable={renderAfterArgsTable} />, defaultContextValue);

    expect(screen.getByTestId('after-args-table-slot')).toBeInTheDocument();
    expect(screen.getByTestId('after-args-table-slot').textContent).toBe('after-args-story--primary');

    // Verify ordering: ArgTypes → after-args-table-slot → Stories
    const argsTableEl = screen.getByTestId('ArgTypes');
    const slotEl = screen.getByTestId('after-args-table-slot');
    const storiesEl = screen.getByTestId('Stories');
    // eslint-disable-next-line no-bitwise
    expect(argsTableEl.compareDocumentPosition(slotEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // eslint-disable-next-line no-bitwise
    expect(slotEl.compareDocumentPosition(storiesEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('renders custom slot after args table and before Stories in the configured branch', () => {
    mockGetDocsPageConfig.mockReturnValue(defaultDocsPageConfig);

    const renderAfterArgsTable = jest.fn(({ story }: { story: PreparedStory<Renderer> }) => (
      <div data-testid="after-args-table-slot">after-args-{story.id}</div>
    ));

    renderWithContext(<FluentDocsPage renderAfterArgsTable={renderAfterArgsTable} />, defaultContextValue);

    expect(screen.getByTestId('after-args-table-slot')).toBeInTheDocument();

    const argsTableEl = screen.getByTestId('ArgTypes');
    const slotEl = screen.getByTestId('after-args-table-slot');
    const storiesEl = screen.getByTestId('Stories');
    // eslint-disable-next-line no-bitwise
    expect(argsTableEl.compareDocumentPosition(slotEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // eslint-disable-next-line no-bitwise
    expect(slotEl.compareDocumentPosition(storiesEl) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('passes the primary prepared story to the callback', () => {
    const primaryStory = makePrimaryStory({ id: 'story--my-component' });
    const receivedStories: PreparedStory<Renderer>[] = [];

    const renderAfterArgsTable = ({ story }: { story: PreparedStory<Renderer> }) => {
      receivedStories.push(story);
      return null;
    };

    renderWithContext(<FluentDocsPage renderAfterArgsTable={renderAfterArgsTable} />, {
      componentStories: () => [primaryStory],
      getStoryContext: () => ({ parameters: {}, globals: {} }),
    });

    expect(receivedStories).toHaveLength(1);
    expect(receivedStories[0].id).toBe('story--my-component');
  });
});
