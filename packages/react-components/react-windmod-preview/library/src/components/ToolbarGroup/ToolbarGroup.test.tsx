import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarGroup } from './ToolbarGroup';
import type { ToolbarGroupState } from './ToolbarGroup.types';
import { toolbarGroupClassNames, useToolbarGroupStyles } from './useToolbarGroupStyles';

import styles from './ToolbarGroup.module.css';

const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

describe('ToolbarGroup', () => {
  isConformant({
    Component: ToolbarGroup,
    displayName: 'ToolbarGroup',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<ToolbarGroup data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-toolbar-group');
    expect(root).toHaveClass('group/fui-toolbar-group');
    expect(root.classList[0]).toBe('fui-toolbar-group');
    expect(toolbarGroupClassNames.root).toBe('fui-toolbar-group group/fui-toolbar-group');
    expect(occurrences(root.className, styles.root)).toBe(1);
  });

  it('renders a presentation role', () => {
    const { getByTestId } = render(<ToolbarGroup data-testid="root" />);

    expect(getByTestId('root').getAttribute('role')).toBe('presentation');
  });

  it('lets a consumer role override the default', () => {
    const { getByTestId } = render(<ToolbarGroup data-testid="root" role="group" />);

    expect(getByTestId('root').getAttribute('role')).toBe('group');
  });

  it('takes data-vertical from the toolbar context', () => {
    const { getByTestId } = render(
      <>
        <Toolbar vertical>
          <ToolbarGroup data-testid="in-vertical" />
        </Toolbar>
        <Toolbar>
          <ToolbarGroup data-testid="in-horizontal" />
        </Toolbar>
        <ToolbarGroup data-testid="no-toolbar" />
      </>,
    );

    expect(getByTestId('in-vertical').getAttribute('data-vertical')).toBe('');
    expect(getByTestId('in-horizontal').hasAttribute('data-vertical')).toBe(false);
    expect(getByTestId('no-toolbar').hasAttribute('data-vertical')).toBe(false);
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(
      <ToolbarGroup data-testid="root" id="tb-group" className="consumer" style={{ gap: 6 }}>
        <span>child</span>
      </ToolbarGroup>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('tb-group');
    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(root.style.gap).toBe('6px');
    expect(root.textContent).toBe('child');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
    } as unknown as ToolbarGroupState;

    const styled = useToolbarGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(occurrences(styled.root.className!, styles.root)).toBe(1);
  });
});
