import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarToggleButton } from './ToolbarToggleButton';
import type { ToolbarToggleButtonState } from './ToolbarToggleButton.types';
import { toolbarToggleButtonClassNames, useToolbarToggleButtonStyles } from './useToolbarToggleButtonStyles';

import buttonStyles from '../Button/Button.module.css';
import styles from './ToolbarToggleButton.module.css';

// The jest css-module proxy drops the component and hash segments, so Button's, ToggleButton's
// and ToolbarToggleButton's `root` are one string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>('span');

  if (!icon) {
    throw new Error('ToolbarToggleButton rendered no icon slot');
  }

  return icon;
};

// The styles hooks widen the root with their data attributes internally but return the
// component's declared state type, so a stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('ToolbarToggleButton', () => {
  isConformant({
    Component: ToolbarToggleButton,
    displayName: 'ToolbarToggleButton',
    requiredProps: { name: 'a', value: 'x' },
  });

  it('stamps all three marker pairs of the composition', () => {
    const { getByTestId } = render(
      <ToolbarToggleButton data-testid="root" name="a" value="x">
        Toggle
      </ToolbarToggleButton>,
    );

    const root = getByTestId('root');

    // The marker set is the only assertion that can distinguish composed from not composed:
    // every module's hashed `root` collapses to one string under the jest proxy.
    expect(root).toHaveClass('fui-toolbar-toggle-button');
    expect(root).toHaveClass('group/fui-toolbar-toggle-button');
    expect(root).toHaveClass('fui-toggle-button');
    expect(root).toHaveClass('group/fui-toggle-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-toolbar-toggle-button');
    expect(toolbarToggleButtonClassNames.root).toBe('fui-toolbar-toggle-button group/fui-toolbar-toggle-button');
  });

  it('carries the root class of all three stylesheets', () => {
    const { getByTestId } = render(
      <ToolbarToggleButton data-testid="root" name="a" value="x">
        Toggle
      </ToolbarToggleButton>,
    );

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(3);
  });

  it('carries the icon class of all three stylesheets', () => {
    const { getByTestId } = render(
      <ToolbarToggleButton data-testid="root" name="a" value="x" icon={<Glyph />}>
        Toggle
      </ToolbarToggleButton>,
    );

    expect(occurrences(iconOf(getByTestId('root')).className, styles.icon)).toBe(3);
  });

  // The toolbar surface exposes no iconPosition prop (Griffel's toolbar props omit it), so
  // 'before' is the only reachable value; it drives Button's icon spacing.
  it('stamps data-icon-position only when there is an icon', () => {
    const { getByTestId } = render(
      <>
        <ToolbarToggleButton data-testid="with-icon" name="a" value="x" icon={<Glyph />}>
          Toggle
        </ToolbarToggleButton>
        <ToolbarToggleButton data-testid="none" name="a" value="z">
          Toggle
        </ToolbarToggleButton>
      </>,
    );

    expect(getByTestId('with-icon').getAttribute('data-icon-position')).toBe('before');
    expect(getByTestId('none').hasAttribute('data-icon-position')).toBe(false);
  });

  it('takes its size from the toolbar and lets an explicit prop win', () => {
    const { getByTestId } = render(
      <>
        <Toolbar size="large">
          <ToolbarToggleButton data-testid="from-context" name="a" value="x" />
          <ToolbarToggleButton data-testid="explicit" name="a" value="y" size="small" />
        </Toolbar>
        <ToolbarToggleButton data-testid="no-toolbar" name="a" value="z" />
      </>,
    );

    expect(getByTestId('from-context').getAttribute('data-size')).toBe('large');
    expect(getByTestId('explicit').getAttribute('data-size')).toBe('small');
    expect(getByTestId('no-toolbar').getAttribute('data-size')).toBe('medium');
  });

  it('resolves appearance, defaulting to subtle', () => {
    const { getByTestId } = render(
      <>
        <ToolbarToggleButton data-testid="default" name="a" value="x" />
        <ToolbarToggleButton data-testid="primary" name="a" value="y" appearance="primary" />
      </>,
    );

    expect(getByTestId('default').getAttribute('data-appearance')).toBe('subtle');
    expect(getByTestId('primary').getAttribute('data-appearance')).toBe('primary');
    // `rounded` is Button's base look and owns no class, so the pin reads as the absence of the
    // other two shapes.
    expect(getByTestId('default')).not.toHaveClass(buttonStyles.circular);
    expect(getByTestId('default')).not.toHaveClass(buttonStyles.square);
  });

  it('spells the toggled state as aria-pressed, with no radio role', () => {
    const { getByTestId } = render(
      <Toolbar defaultCheckedValues={{ a: ['x'] }}>
        <ToolbarToggleButton data-testid="checked" name="a" value="x" />
        <ToolbarToggleButton data-testid="unchecked" name="a" value="y" />
      </Toolbar>,
    );

    const checked = getByTestId('checked');

    expect(checked.getAttribute('aria-pressed')).toBe('true');
    expect(checked.getAttribute('data-checked')).toBe('');
    expect(checked.hasAttribute('role')).toBe(false);
    expect(checked.hasAttribute('aria-checked')).toBe(false);

    const unchecked = getByTestId('unchecked');

    expect(unchecked.getAttribute('aria-pressed')).toBe('false');
    expect(unchecked.hasAttribute('data-checked')).toBe(false);
  });

  it('appends and removes its value through the toolbar on click', () => {
    const onCheckedValueChange = jest.fn();
    const { getByTestId } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarToggleButton data-testid="root" name="a" value="x" />
      </Toolbar>,
    );

    const root = getByTestId('root');

    fireEvent.click(root);

    expect(onCheckedValueChange).toHaveBeenCalledTimes(1);
    expect(onCheckedValueChange.mock.calls[0][1]).toEqual({ name: 'a', checkedItems: ['x'] });
    expect(root.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(root);

    expect(onCheckedValueChange).toHaveBeenCalledTimes(2);
    expect(onCheckedValueChange.mock.calls[1][1]).toEqual({ name: 'a', checkedItems: [] });
    expect(root.getAttribute('aria-pressed')).toBe('false');
  });

  it('does not toggle while disabled', () => {
    const onCheckedValueChange = jest.fn();
    const { getByTestId } = render(
      <Toolbar onCheckedValueChange={onCheckedValueChange}>
        <ToolbarToggleButton data-testid="root" name="a" value="x" disabled />
      </Toolbar>,
    );

    fireEvent.click(getByTestId('root'));

    expect(onCheckedValueChange).not.toHaveBeenCalled();
    expect(getByTestId('root').getAttribute('data-disabled')).toBe('');
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(
      <ToolbarToggleButton data-testid="root" name="a" value="x" id="tb-toggle" className="consumer" />,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('tb-toggle');
    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'subtle',
      checked: true,
      components: { root: 'button', icon: 'span' },
      icon: { className: 'consumer-icon' },
      iconPosition: 'before',
      root: { as: 'button', className: 'consumer', 'data-checked': '' },
      shape: 'rounded',
      size: 'large',
    } as unknown as ToolbarToggleButtonState;

    const styled = useToolbarToggleButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-icon-position');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(styled.checked).toBe(true);
    expect(stampsOf(styled.root)['data-icon-position']).toBe('before');
    expect(stampsOf(styled.root)['data-checked']).toBe('');
    expect(occurrences(styled.icon!.className!, styles.icon)).toBe(3);
  });

  it('renders no icon slot when the consumer supplies none', () => {
    const state = {
      appearance: 'subtle',
      components: { root: 'button', icon: 'span' },
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as ToolbarToggleButtonState;

    expect(useToolbarToggleButtonStyles(state).icon).toBeUndefined();
  });
});
