import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { type Canvas, useOf } from '@storybook/addon-docs/blocks';
import type { PreparedStory } from 'storybook/internal/types';

import { decodePlaygroundStateFromHash } from '../url';
import { parameters } from '../preset/preview';
import { PlaygroundCanvas } from './PlaygroundCanvas';

jest.mock('@storybook/addon-docs/blocks', () => ({
  useOf: jest.fn(),
  Canvas: jest.fn(({ additionalActions }: React.ComponentProps<typeof Canvas>) => (
    <div className="sbdocs-preview-actions">
      <button>Show code</button>
      <button>Copy code</button>
      {additionalActions?.map(action => (
        <button key={String(action.title)} className={action.className} onClick={action.onClick}>
          {action.title}
        </button>
      ))}
    </div>
  )),
}));

describe('PlaygroundCanvas', () => {
  const fullSource = 'export default () => null;';
  const cssModules = [{ name: 'example.module.css', source: '.root { display: block; }' }];
  const story: PreparedStory = {
    id: 'components-button--default',
    componentId: 'components-button',
    title: 'Components/Button',
    kind: 'Components/Button',
    name: 'Default',
    story: 'Default',
    tags: [],
    initialArgs: {},
    argTypes: {},
    moduleExport: () => null,
    originalStoryFn: () => null,
    undecoratedStoryFn: () => null,
    unboundStoryFn: () => null,
    applyLoaders: async () => ({}),
    applyBeforeEach: async () => [],
    applyAfterEach: async () => undefined,
    runStep: async () => undefined,
    mount: jest.fn(),
    usesMount: false,
    storyGlobals: {},
    parameters: { fullSource, cssModuleSources: { cssModules } },
  };

  beforeEach(() => {
    jest.mocked(useOf).mockReturnValue({ type: 'story', story });
  });

  it('registers a supported Docs Canvas override', () => {
    expect(parameters?.docs.components.Canvas).toBe(PlaygroundCanvas);
  });

  it('lets Storybook render the action next to its source controls and preserves other actions', () => {
    const otherAction = { title: 'Another action', onClick: jest.fn() };
    const open = jest.spyOn(window, 'open').mockImplementation(() => null);
    try {
      const of = () => null;
      render(<PlaygroundCanvas of={of} additionalActions={[otherAction]} />);

      expect(useOf).toHaveBeenCalledWith(of, ['story']);
      const button = screen.getByRole('button', { name: 'Open in Playground' });
      expect(button.parentElement).toBe(screen.getByRole('button', { name: 'Show code' }).parentElement);
      expect(screen.getByRole('button', { name: 'Copy code' })).toBeTruthy();
      fireEvent.click(screen.getByRole('button', { name: 'Another action' }));
      expect(otherAction.onClick).toHaveBeenCalledTimes(1);
      fireEvent.click(button);
      const url = open.mock.calls[0][0] as string;
      expect(decodePlaygroundStateFromHash(`#${url.split('#')[1]}`)).toEqual({
        code: fullSource,
        cssModules,
        title: 'Button: Default',
      });
    } finally {
      open.mockRestore();
    }
  });

  it('preserves actions configured on the story when no block props override them', () => {
    const additionalActions = [{ title: 'Story action', onClick: jest.fn() }];
    jest.mocked(useOf).mockReturnValue({
      type: 'story',
      story: { ...story, parameters: { ...story.parameters, docs: { canvas: { additionalActions } } } },
    });

    render(<PlaygroundCanvas />);

    expect(screen.getByRole('button', { name: 'Story action' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Open in Playground' })).toBeTruthy();
  });

  it.each([
    { fullSource: undefined },
    { fullSourceIsRunnable: false },
    { fullSourceUnsupportedImports: ['./helper'] },
    { playground: { disable: true } },
  ])('does not offer a native execution action for unavailable source: %j', metadata => {
    jest.mocked(useOf).mockReturnValue({
      type: 'story',
      story: { ...story, parameters: { ...story.parameters, ...metadata } },
    });

    render(<PlaygroundCanvas />);

    expect(screen.queryByRole('button', { name: 'Open in Playground' })).toBeNull();
    expect(screen.getByRole('button', { name: 'Show code' })).toBeTruthy();
  });
});
