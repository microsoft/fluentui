import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Toolbar } from './Toolbar';
import type { ToolbarState } from './Toolbar.types';
import { toolbarClassNames, useToolbarStyles } from './useToolbarStyles';
import { ToolbarButton } from '../ToolbarButton/ToolbarButton';
import { ToolbarDivider } from '../ToolbarDivider/ToolbarDivider';
import { ToolbarGroup } from '../ToolbarGroup/ToolbarGroup';
import { ToolbarRadioButton } from '../ToolbarRadioButton/ToolbarRadioButton';
import { ToolbarRadioGroup } from '../ToolbarRadioGroup/ToolbarRadioGroup';
import { ToolbarToggleButton } from '../ToolbarToggleButton/ToolbarToggleButton';

import styles from './Toolbar.module.css';

const contextValuesSpy = jest.fn();

// Frozen-state guard — see testing/freezeState.ts.
// All seven components share this subpath, so one mock covers the whole family, including the
// two double compositions. The context-values spy records the state the component actually
// feeds to useToolbarContextValues.
jest.mock('@fluentui/react-headless-components-preview/toolbar', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/toolbar');
  const { deepFreezeState } = require('../../testing/freezeState');
  const freeze =
    (hook: (...args: never[]) => unknown) =>
    (...args: never[]) =>
      deepFreezeState(hook(...args));

  return {
    ...actual,
    useToolbarContextValues: (state: Parameters<typeof actual.useToolbarContextValues>[0]) => {
      contextValuesSpy(state);

      return actual.useToolbarContextValues(state);
    },
    useToolbar: freeze(actual.useToolbar),
    useToolbarButton: freeze(actual.useToolbarButton),
    useToolbarDivider: freeze(actual.useToolbarDivider),
    useToolbarGroup: freeze(actual.useToolbarGroup),
    useToolbarRadioButton: freeze(actual.useToolbarRadioButton),
    useToolbarRadioGroup: freeze(actual.useToolbarRadioGroup),
    useToolbarToggleButton: freeze(actual.useToolbarToggleButton),
  };
});

describe('Toolbar', () => {
  beforeEach(() => {
    contextValuesSpy.mockClear();
  });

  isConformant({
    Component: Toolbar,
    displayName: 'Toolbar',
  });

  it('builds the context values from the styled state', () => {
    render(<Toolbar data-testid="root" size="large" />);

    expect(contextValuesSpy).toHaveBeenCalledTimes(1);

    // useToolbarContextValues reads only size/vertical/checkedValues/handlers, so the styled and
    // unstyled states are interchangeable for its output today; the styled root is the only
    // observable difference, and this pins the contract shape against a future styles hook that
    // does touch what the context reads.
    const received = contextValuesSpy.mock.calls[0][0];

    expect(received.size).toBe('large');
    expect(received.root.className).toContain('fui-toolbar');
    expect(received.root['data-size']).toBe('large');
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<Toolbar data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-toolbar');
    expect(root).toHaveClass('group/fui-toolbar');
    expect(root.classList[0]).toBe('fui-toolbar');
    expect(toolbarClassNames.root).toBe('fui-toolbar group/fui-toolbar');
    expect(classOccurrences(root, styles.root)).toBe(1);
  });

  it('stamps data-size, defaulting to medium', () => {
    const { getByTestId } = render(
      <>
        <Toolbar data-testid="default" />
        <Toolbar data-testid="small" size="small" />
        <Toolbar data-testid="large" size="large" />
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('small').getAttribute('data-size')).toBe('small');
    expect(getByTestId('large').getAttribute('data-size')).toBe('large');
  });

  it('leaves data-vertical and aria-orientation to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <Toolbar data-testid="horizontal" />
        <Toolbar data-testid="vertical" vertical />
      </>,
    );

    const horizontal = getByTestId('horizontal');

    expect(horizontal.hasAttribute('data-vertical')).toBe(false);
    expect(horizontal.getAttribute('role')).toBe('toolbar');
    expect(horizontal.hasAttribute('aria-orientation')).toBe(false);

    const vertical = getByTestId('vertical');

    expect(vertical.getAttribute('data-vertical')).toBe('');
    expect(vertical.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('publishes its size to context-reading children, but not to a ToolbarButton', () => {
    const { getByTestId } = render(
      <>
        <Toolbar size="large">
          <ToolbarToggleButton data-testid="large-toggle" name="a" value="x" />
          <ToolbarButton data-testid="large-button" />
        </Toolbar>
        <Toolbar size="small">
          <ToolbarToggleButton data-testid="small-toggle" name="a" value="x" />
        </Toolbar>
        <Toolbar>
          <ToolbarToggleButton data-testid="default-toggle" name="a" value="x" />
        </Toolbar>
      </>,
    );

    expect(getByTestId('large-toggle').getAttribute('data-size')).toBe('large');
    expect(getByTestId('small-toggle').getAttribute('data-size')).toBe('small');
    expect(getByTestId('default-toggle').getAttribute('data-size')).toBe('medium');
    // Griffel's ToolbarButton pins medium and never reads the toolbar size; replicated verbatim.
    expect(getByTestId('large-button').getAttribute('data-size')).toBe('medium');
  });

  it('gives a nested toolbar its own size', () => {
    const { getByTestId } = render(
      <Toolbar size="large">
        <ToolbarToggleButton data-testid="outer" name="a" value="x" />
        <Toolbar size="small">
          <ToolbarToggleButton data-testid="inner" name="b" value="y" />
        </Toolbar>
      </Toolbar>,
    );

    expect(getByTestId('outer').getAttribute('data-size')).toBe('large');
    expect(getByTestId('inner').getAttribute('data-size')).toBe('small');
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Toolbar data-testid="root" ref={ref} id="tb" role="group" className="consumer" style={{ gap: 4 }} />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('tb');
    expect(root.getAttribute('role')).toBe('group');
    expect(root).toHaveClass('consumer');
    expect(root.style.gap).toBe('4px');
  });

  it('renders the whole family without writing to the frozen headless state', () => {
    expect(() =>
      render(
        <Toolbar size="large" defaultCheckedValues={{ a: ['x'], b: ['p'] }}>
          <ToolbarGroup>
            <ToolbarButton icon={<i />}>Go</ToolbarButton>
            <ToolbarToggleButton name="a" value="x" icon={<i />} />
          </ToolbarGroup>
          <ToolbarDivider />
          <ToolbarRadioGroup>
            <ToolbarRadioButton name="b" value="p" icon={<i />} />
            <ToolbarRadioButton name="b" value="q" />
          </ToolbarRadioGroup>
        </Toolbar>,
      ),
    ).not.toThrow();
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
      size: 'large',
      vertical: true,
    } as unknown as ToolbarState;

    const styled = useToolbarStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(styled.size).toBe('large');
    expect(styled.vertical).toBe(true);
    expect(styled.root.className).toContain('consumer');
    expect(classOccurrences(styled.root.className!, styles.root)).toBe(1);
  });
});
