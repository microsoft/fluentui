import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarRadioGroup } from './ToolbarRadioGroup';
import type { ToolbarRadioGroupState } from './ToolbarRadioGroup.types';
import { toolbarRadioGroupClassNames, useToolbarRadioGroupStyles } from './useToolbarRadioGroupStyles';

// This component ships no stylesheet of its own: the look is ToolbarGroup's in full.
import groupStyles from '../ToolbarGroup/ToolbarGroup.module.css';

const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

describe('ToolbarRadioGroup', () => {
  isConformant({
    Component: ToolbarRadioGroup,
    displayName: 'ToolbarRadioGroup',
  });

  it('stamps its own marker pair and the composed ToolbarGroup pair', () => {
    const { getByTestId } = render(<ToolbarRadioGroup data-testid="root" />);

    const root = getByTestId('root');

    // The marker set is the only assertion that can distinguish composed from not composed:
    // there is no stylesheet of its own to look for.
    expect(root).toHaveClass('fui-toolbar-radio-group');
    expect(root).toHaveClass('group/fui-toolbar-radio-group');
    expect(root).toHaveClass('fui-toolbar-group');
    expect(root).toHaveClass('group/fui-toolbar-group');
    expect(root.classList[0]).toBe('fui-toolbar-radio-group');
    expect(toolbarRadioGroupClassNames.root).toBe('fui-toolbar-radio-group group/fui-toolbar-radio-group');
  });

  it('carries the ToolbarGroup root class exactly once', () => {
    const { getByTestId } = render(<ToolbarRadioGroup data-testid="root" />);

    expect(occurrences(getByTestId('root').className, groupStyles.root)).toBe(1);
  });

  it('renders a radiogroup role', () => {
    const { getByTestId } = render(<ToolbarRadioGroup data-testid="root" />);

    expect(getByTestId('root').getAttribute('role')).toBe('radiogroup');
  });

  it('lets a consumer role override the default', () => {
    const { getByTestId } = render(<ToolbarRadioGroup data-testid="root" role="group" />);

    expect(getByTestId('root').getAttribute('role')).toBe('group');
  });

  it('takes data-vertical from the toolbar context', () => {
    const { getByTestId } = render(
      <>
        <Toolbar vertical>
          <ToolbarRadioGroup data-testid="in-vertical" />
        </Toolbar>
        <Toolbar>
          <ToolbarRadioGroup data-testid="in-horizontal" />
        </Toolbar>
      </>,
    );

    expect(getByTestId('in-vertical').getAttribute('data-vertical')).toBe('');
    expect(getByTestId('in-horizontal').hasAttribute('data-vertical')).toBe(false);
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(
      <ToolbarRadioGroup data-testid="root" id="tb-radio-group" className="consumer">
        <span>child</span>
      </ToolbarRadioGroup>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('tb-radio-group');
    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(root.textContent).toBe('child');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { as: 'div', className: 'consumer' },
    } as unknown as ToolbarRadioGroupState;

    const styled = useToolbarRadioGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(occurrences(styled.root.className!, groupStyles.root)).toBe(1);
  });
});
