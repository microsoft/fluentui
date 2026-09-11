import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { stampsOf } from '../../testing/stampsOf';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import type { ToolbarDividerState } from './ToolbarDivider.types';
import { toolbarDividerClassNames, useToolbarDividerStyles } from './useToolbarDividerStyles';

import styles from './ToolbarDivider.module.css';

describe('ToolbarDivider', () => {
  isConformant({
    Component: ToolbarDivider,
    displayName: 'ToolbarDivider',
  });

  it('stamps its own marker pair and the composed Divider pair', () => {
    const { getByTestId } = render(<ToolbarDivider data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-toolbar-divider');
    expect(root).toHaveClass('group/fui-toolbar-divider');
    expect(root).toHaveClass('fui-divider');
    expect(root).toHaveClass('group/fui-divider');
    expect(root.classList[0]).toBe('fui-toolbar-divider');
    expect(toolbarDividerClassNames.root).toBe('fui-toolbar-divider group/fui-toolbar-divider');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<ToolbarDivider data-testid="root" />);

    expect(classOccurrences(getByTestId('root'), styles.root)).toBe(2);
  });

  it('stamps data-orientation, inverted against the toolbar', () => {
    const { getByTestId } = render(
      <>
        <Toolbar>
          <ToolbarDivider data-testid="in-horizontal" />
        </Toolbar>
        <Toolbar vertical>
          <ToolbarDivider data-testid="in-vertical" />
        </Toolbar>
        <ToolbarDivider data-testid="no-toolbar" />
      </>,
    );

    // The headless hook inverts the toolbar's orientation: a horizontal toolbar needs a
    // vertical divider line.
    const inHorizontal = getByTestId('in-horizontal');

    expect(inHorizontal.getAttribute('data-orientation')).toBe('vertical');
    expect(inHorizontal.getAttribute('data-vertical')).toBe('');
    expect(inHorizontal.getAttribute('aria-orientation')).toBe('vertical');

    const inVertical = getByTestId('in-vertical');

    expect(inVertical.getAttribute('data-orientation')).toBe('horizontal');
    expect(inVertical.hasAttribute('data-vertical')).toBe(false);
    expect(inVertical.getAttribute('aria-orientation')).toBe('horizontal');

    expect(getByTestId('no-toolbar').getAttribute('data-orientation')).toBe('vertical');
  });

  it('pins the three Divider look props', () => {
    const { getByTestId } = render(<ToolbarDivider data-testid="root" />);

    const root = getByTestId('root');

    expect(root.getAttribute('data-align-content')).toBe('center');
    expect(root.hasAttribute('data-inset')).toBe(false);
    expect(root.getAttribute('role')).toBe('separator');
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(<ToolbarDivider data-testid="root" id="tb-div" className="consumer" />);

    const root = getByTestId('root');

    expect(root.id).toBe('tb-div');
    expect(root).toHaveClass('consumer');
    expect(classOccurrences(root, 'consumer')).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      alignContent: 'center',
      appearance: 'default',
      components: { root: 'div', wrapper: 'div' },
      inset: false,
      root: { as: 'div', className: 'consumer' },
      vertical: true,
    } as unknown as ToolbarDividerState;

    const styled = useToolbarDividerStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-orientation');
    expect(stampsOf(styled.root)['data-orientation']).toBe('vertical');
    expect(styled.root.className).toContain('consumer');
    expect(classOccurrences(styled.root.className!, styles.root)).toBe(2);
  });

  it('spells a horizontal line when the divider is not vertical', () => {
    const state = {
      alignContent: 'center',
      appearance: 'default',
      components: { root: 'div', wrapper: 'div' },
      inset: false,
      root: { as: 'div' },
      vertical: false,
    } as unknown as ToolbarDividerState;

    expect(stampsOf(useToolbarDividerStyles(state).root)['data-orientation']).toBe('horizontal');
  });
});
