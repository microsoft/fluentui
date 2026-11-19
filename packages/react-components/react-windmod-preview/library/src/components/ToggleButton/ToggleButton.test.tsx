import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { ToggleButton } from './ToggleButton';
import type { ToggleButtonState } from './ToggleButton.types';
import { toggleButtonClassNames, useToggleButtonStyles } from './useToggleButtonStyles';

import styles from './ToggleButton.module.css';

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>('span');

  if (!icon) {
    throw new Error('ToggleButton rendered no icon slot');
  }

  return icon;
};

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('ToggleButton', () => {
  isConformant({
    Component: ToggleButton,
    displayName: 'ToggleButton',
  });

  it('stamps both marker pairs, its own first', () => {
    const { getByTestId } = render(<ToggleButton data-testid="root">Toggle</ToggleButton>);

    const root = getByTestId('root');

    expect(root.className).toContain(toggleButtonClassNames.root);
    expect(root).toHaveClass('fui-toggle-button');
    expect(root).toHaveClass('group/fui-toggle-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-toggle-button');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<ToggleButton data-testid="root">Toggle</ToggleButton>);

    expect(classOccurrences(getByTestId('root'), styles.root)).toBe(2);
  });

  it('keeps a consumer className on the root', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" className="consumer">
        Toggle
      </ToggleButton>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(classOccurrences(root, 'consumer')).toBe(1);
  });

  it('carries the icon class of both stylesheets', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" icon={<Glyph />}>
        Toggle
      </ToggleButton>,
    );

    expect(classOccurrences(iconOf(getByTestId('root')), styles.icon)).toBe(2);
  });

  it('keeps the data attributes useButtonStyles resolves', () => {
    const { getByTestId } = render(
      <>
        <ToggleButton data-testid="labelled" appearance="primary" size="large">
          Toggle
        </ToggleButton>
        <ToggleButton data-testid="icon-only" icon={<Glyph />} aria-label="Toggle" />
      </>,
    );

    const labelled = getByTestId('labelled');

    expect(labelled.getAttribute('data-appearance')).toBe('primary');
    expect(labelled.getAttribute('data-size')).toBe('large');
    expect(labelled.hasAttribute('data-empty')).toBe(false);

    expect(getByTestId('icon-only').hasAttribute('data-empty')).toBe(true);
  });

  it('stamps data-accessible only when isAccessible is set', () => {
    const { getByTestId } = render(
      <>
        <ToggleButton data-testid="plain">Toggle</ToggleButton>
        <ToggleButton data-testid="accessible" isAccessible>
          Toggle
        </ToggleButton>
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-accessible')).toBe(false);
    expect(getByTestId('accessible').hasAttribute('data-accessible')).toBe(true);
  });

  it('keeps data-appearance and data-size when checked', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" appearance="primary" size="large" checked>
        Toggle
      </ToggleButton>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('primary');
    expect(root.getAttribute('data-size')).toBe('large');
  });

  it('carries the icon class of both stylesheets when checked and disabled', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" icon={<Glyph />} checked disabled>
        Toggle
      </ToggleButton>,
    );

    expect(classOccurrences(iconOf(getByTestId('root')), styles.icon)).toBe(2);
  });

  it('spells the toggled state as aria-checked under role="checkbox"', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" role="checkbox" checked>
        Toggle
      </ToggleButton>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('aria-checked')).toBe('true');
    expect(root.hasAttribute('aria-pressed')).toBe(false);
  });

  it('leaves data-checked and aria-pressed to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <ToggleButton data-testid="unchecked">Toggle</ToggleButton>
        <ToggleButton data-testid="checked" checked>
          Toggle
        </ToggleButton>
      </>,
    );

    const unchecked = getByTestId('unchecked');

    expect(unchecked.hasAttribute('data-checked')).toBe(false);
    expect(unchecked.getAttribute('aria-pressed')).toBe('false');

    const checked = getByTestId('checked');

    expect(checked.getAttribute('data-checked')).toBe('');
    expect(checked.getAttribute('aria-pressed')).toBe('true');
  });

  it('toggles an uncontrolled defaultChecked button on click', () => {
    const { getByTestId } = render(
      <ToggleButton data-testid="root" defaultChecked>
        Toggle
      </ToggleButton>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('aria-pressed')).toBe('true');
    expect(root.getAttribute('data-checked')).toBe('');

    fireEvent.click(root);

    expect(root.getAttribute('aria-pressed')).toBe('false');
    expect(root.hasAttribute('data-checked')).toBe(false);
  });

  it('never toggles a controlled button on its own', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ToggleButton data-testid="root" checked onClick={onClick}>
        Toggle
      </ToggleButton>,
    );

    const root = getByTestId('root');

    fireEvent.click(root);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(root.getAttribute('aria-pressed')).toBe('true');
    expect(root.getAttribute('data-checked')).toBe('');
  });

  it('does not toggle while disabled or disabledFocusable', () => {
    const { getByTestId } = render(
      <>
        <ToggleButton data-testid="disabled" disabled defaultChecked>
          Toggle
        </ToggleButton>
        <ToggleButton data-testid="disabled-focusable" disabledFocusable defaultChecked>
          Toggle
        </ToggleButton>
      </>,
    );

    fireEvent.click(getByTestId('disabled'));
    fireEvent.click(getByTestId('disabled-focusable'));

    expect(getByTestId('disabled').getAttribute('aria-pressed')).toBe('true');
    expect(getByTestId('disabled-focusable').getAttribute('aria-pressed')).toBe('true');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      checked: true,
      components: { root: 'button', icon: 'span' },
      icon: { className: 'consumer-icon' },
      isAccessible: true,
      root: { as: 'button', className: 'consumer', 'data-checked': '' },
      shape: 'circular',
      size: 'large',
    } as unknown as ToggleButtonState;

    const styled = useToggleButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-accessible');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(styled.checked).toBe(true);
    expect(styled.isAccessible).toBe(true);
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(toggleButtonClassNames.root);
    expect(styled.root['data-checked']).toBe('');
    expect(styled.icon!.className).toContain('consumer-icon');
    expect(classOccurrences(styled.icon!.className!, styles.icon)).toBe(2);
  });

  it('renders no icon slot when the consumer supplies none', () => {
    const state = {
      appearance: 'secondary',
      components: { root: 'button', icon: 'span' },
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as ToggleButtonState;

    expect(useToggleButtonStyles(state).icon).toBeUndefined();
  });
});
