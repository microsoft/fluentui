import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarButton } from './ToolbarButton';
import type { ToolbarButtonState } from './ToolbarButton.types';
import { toolbarButtonClassNames, useToolbarButtonStyles } from './useToolbarButtonStyles';

import buttonStyles from '../Button/Button.module.css';
import styles from './ToolbarButton.module.css';

// The jest css-module proxy drops the component and hash segments, so Button's `root` and
// ToolbarButton's `root` are the same string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>('span');

  if (!icon) {
    throw new Error('ToolbarButton rendered no icon slot');
  }

  return icon;
};

// The styles hooks widen the root with their data attributes internally but return the
// component's declared state type, so a stamp is read back through this cast.
const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('ToolbarButton', () => {
  isConformant({
    Component: ToolbarButton,
    displayName: 'ToolbarButton',
  });

  it('stamps its own marker pair and the composed Button pair', () => {
    const { getByTestId } = render(<ToolbarButton data-testid="root">Go</ToolbarButton>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-toolbar-button');
    expect(root).toHaveClass('group/fui-toolbar-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-toolbar-button');
    expect(toolbarButtonClassNames.root).toBe('fui-toolbar-button group/fui-toolbar-button');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<ToolbarButton data-testid="root">Go</ToolbarButton>);

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(2);
  });

  it('carries the icon class of both stylesheets', () => {
    const { getByTestId } = render(
      <ToolbarButton data-testid="root" icon={<Glyph />}>
        Go
      </ToolbarButton>,
    );

    expect(occurrences(iconOf(getByTestId('root')).className, styles.icon)).toBe(2);
  });

  // The toolbar surface exposes no iconPosition prop (Griffel's ToolbarButtonProps omits it),
  // so 'before' is the only reachable value; it drives Button's icon spacing.
  it('stamps data-icon-position only when there is an icon', () => {
    const { getByTestId } = render(
      <>
        <ToolbarButton data-testid="with-icon" icon={<Glyph />}>
          Go
        </ToolbarButton>
        <ToolbarButton data-testid="none">Go</ToolbarButton>
      </>,
    );

    expect(getByTestId('with-icon').getAttribute('data-icon-position')).toBe('before');
    expect(getByTestId('none').hasAttribute('data-icon-position')).toBe(false);
  });

  it('resolves appearance, defaulting to subtle, and pins shape and size', () => {
    const { getByTestId } = render(
      <>
        <ToolbarButton data-testid="default">Go</ToolbarButton>
        <ToolbarButton data-testid="primary" appearance="primary">
          Go
        </ToolbarButton>
      </>,
    );

    expect(getByTestId('default').getAttribute('data-appearance')).toBe('subtle');
    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('primary').getAttribute('data-appearance')).toBe('primary');
    // `rounded` is Button's base look and owns no class, so the pin reads as the absence of the
    // other two shapes.
    expect(getByTestId('default')).not.toHaveClass(buttonStyles.circular);
    expect(getByTestId('default')).not.toHaveClass(buttonStyles.square);
  });

  it('reads data-vertical from its own prop, never from the toolbar', () => {
    const { getByTestId } = render(
      <>
        <Toolbar vertical>
          <ToolbarButton data-testid="in-vertical-toolbar">Go</ToolbarButton>
        </Toolbar>
        <Toolbar>
          <ToolbarButton data-testid="own-vertical" vertical>
            Go
          </ToolbarButton>
        </Toolbar>
      </>,
    );

    expect(getByTestId('in-vertical-toolbar').hasAttribute('data-vertical')).toBe(false);
    expect(getByTestId('own-vertical').getAttribute('data-vertical')).toBe('');
  });

  it('leaves the headless stamps intact through the composition', () => {
    const { getByTestId } = render(
      <>
        <ToolbarButton data-testid="disabled" disabled>
          Go
        </ToolbarButton>
        <ToolbarButton data-testid="disabled-focusable" disabledFocusable>
          Go
        </ToolbarButton>
        <ToolbarButton data-testid="icon-only" icon={<Glyph />} aria-label="Go" />
      </>,
    );

    expect(getByTestId('disabled').getAttribute('data-disabled')).toBe('');
    expect(getByTestId('disabled-focusable').getAttribute('data-disabled-focusable')).toBe('');

    const iconOnly = getByTestId('icon-only');

    expect(iconOnly.getAttribute('data-icon-only')).toBe('');
    expect(iconOnly.hasAttribute('data-empty')).toBe(true);
  });

  it('passes consumer props through to the root', () => {
    const { getByTestId } = render(
      <ToolbarButton data-testid="root" id="tb-btn" className="consumer" style={{ margin: 2 }}>
        Go
      </ToolbarButton>,
    );

    const root = getByTestId('root');

    expect(root.id).toBe('tb-btn');
    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
    expect(root.style.margin).toBe('2px');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'button', icon: 'span' },
      icon: { className: 'consumer-icon' },
      iconPosition: 'before',
      root: { as: 'button', className: 'consumer' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as ToolbarButtonState;

    const styled = useToolbarButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-icon-position');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(stampsOf(styled.root)['data-icon-position']).toBe('before');
    expect(styled.root.className).toContain('consumer');
    expect(occurrences(styled.icon!.className!, styles.icon)).toBe(2);
  });

  it('renders no icon slot when the consumer supplies none', () => {
    const state = {
      appearance: 'subtle',
      components: { root: 'button', icon: 'span' },
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as ToolbarButtonState;

    expect(useToolbarButtonStyles(state).icon).toBeUndefined();
  });
});
