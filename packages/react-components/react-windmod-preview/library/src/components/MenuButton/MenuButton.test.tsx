import * as React from 'react';
import { render } from '@testing-library/react';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import { isConformant } from '../../testing/isConformant';
import { MenuButton } from './MenuButton';
import type { MenuButtonState } from './MenuButton.types';
import { menuButtonClassNames, useMenuButtonStyles } from './useMenuButtonStyles';

import styles from './MenuButton.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/menu-button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/menu-button');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useMenuButton: (...args: Parameters<typeof actual.useMenuButton>) => deepFreezeState(actual.useMenuButton(...args)),
  };
});

// The jest css-module proxy drops the component and hash segments, so Button's `root` and
// MenuButton's `root` are the same string — only the occurrence count distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

const iconOf = (root: HTMLElement): HTMLElement => {
  const icon = root.querySelector<HTMLElement>(`span.${styles.icon}`);

  if (!icon) {
    throw new Error('MenuButton rendered no icon slot');
  }

  return icon;
};

const menuIconOf = (root: HTMLElement): HTMLElement | null =>
  root.querySelector<HTMLElement>(`span.${styles.menuIcon}`);

const chevronOf = (root: HTMLElement): SVGElement | null =>
  root.querySelector<SVGElement>(`span.${styles.menuIcon} svg[data-fui-icon]`);

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;
const Custom = (): React.ReactElement => <i data-testid="custom" />;

describe('MenuButton', () => {
  isConformant({
    Component: MenuButton,
    displayName: 'MenuButton',
  });

  it('stamps both marker pairs, its own first', () => {
    const { getByTestId } = render(<MenuButton data-testid="root">Menu</MenuButton>);

    const root = getByTestId('root');

    expect(root.className).toContain(menuButtonClassNames.root);
    expect(root).toHaveClass('fui-menu-button');
    expect(root).toHaveClass('group/fui-menu-button');
    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-menu-button');
  });

  it('carries the root class of both stylesheets', () => {
    const { getByTestId } = render(<MenuButton data-testid="root">Menu</MenuButton>);

    expect(occurrences(getByTestId('root').className, styles.root)).toBe(2);
  });

  it('carries the icon class of both stylesheets', () => {
    const { getByTestId } = render(
      <MenuButton data-testid="root" icon={<Glyph />}>
        Menu
      </MenuButton>,
    );

    expect(occurrences(iconOf(getByTestId('root')).className, styles.icon)).toBe(2);
  });

  it('carries the menuIcon class once', () => {
    const { getByTestId } = render(<MenuButton data-testid="root">Menu</MenuButton>);

    const menuIcon = menuIconOf(getByTestId('root'));

    expect(menuIcon).not.toBeNull();
    expect(occurrences(menuIcon!.className, styles.menuIcon)).toBe(1);
  });

  it('renders the default chevron when no menuIcon is supplied', () => {
    const { getByTestId } = render(<MenuButton data-testid="root">Menu</MenuButton>);

    expect(chevronOf(getByTestId('root'))).not.toBeNull();
  });

  // The glyph identity, not just its presence: the chevron points down, and the same one
  // @fluentui/react-icons ships.
  it('defaults to the chevron-down glyph', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="root">Menu</MenuButton>
        <span data-testid="reference">
          <ChevronDownRegular />
        </span>
      </>,
    );

    const rendered = chevronOf(getByTestId('root'))!.querySelector('path')!.getAttribute('d');

    expect(rendered).toBe(getByTestId('reference').querySelector('path')!.getAttribute('d'));
  });

  it('removes the slot entirely for menuIcon={null}', () => {
    const { getByTestId } = render(
      <MenuButton data-testid="root" menuIcon={null}>
        Menu
      </MenuButton>,
    );

    const root = getByTestId('root');

    expect(menuIconOf(root)).toBeNull();
    expect(chevronOf(root)).toBeNull();
    expect(root.querySelectorAll('span')).toHaveLength(0);
  });

  it('keeps the chevron and the consumer props for a menuIcon object without children', () => {
    const { getByTestId } = render(
      <MenuButton data-testid="root" menuIcon={{ className: 'consumer-menu-icon', id: 'consumer-menu-icon' }}>
        Menu
      </MenuButton>,
    );

    const root = getByTestId('root');
    const menuIcon = menuIconOf(root);

    expect(chevronOf(root)).not.toBeNull();
    expect(menuIcon!.id).toBe('consumer-menu-icon');
    expect(menuIcon).toHaveClass('consumer-menu-icon');
    expect(occurrences(menuIcon!.className, 'consumer-menu-icon')).toBe(1);
  });

  it('lets a consumer glyph replace the chevron', () => {
    const { getByTestId, queryByTestId } = render(
      <MenuButton data-testid="root" menuIcon={<Custom />}>
        Menu
      </MenuButton>,
    );

    expect(queryByTestId('custom')).not.toBeNull();
    expect(chevronOf(getByTestId('root'))).toBeNull();
  });

  // The default-glyph fallback fires on null OR undefined children, so an explicitly emptied
  // children key shows the chevron where the Griffel default-props merge shows an empty span.
  it('falls back to the chevron for an explicitly empty children key', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="null-children" menuIcon={{ children: null }}>
          Menu
        </MenuButton>
        <MenuButton data-testid="undefined-children" menuIcon={{ children: undefined }}>
          Menu
        </MenuButton>
      </>,
    );

    expect(chevronOf(getByTestId('null-children'))).not.toBeNull();
    expect(chevronOf(getByTestId('undefined-children'))).not.toBeNull();
  });

  it('stamps data-icon-position only when an icon is rendered', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="plain">Menu</MenuButton>
        <MenuButton data-testid="with-icon" icon={<Glyph />}>
          Menu
        </MenuButton>
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-icon-position')).toBe(false);
    expect(getByTestId('with-icon').getAttribute('data-icon-position')).toBe('before');
  });

  it('stamps data-icon-position at every size the with-icon padding selects on', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="small" size="small" icon={<Glyph />}>
          Menu
        </MenuButton>
        <MenuButton data-testid="large" size="large" icon={<Glyph />}>
          Menu
        </MenuButton>
      </>,
    );

    expect(getByTestId('small').getAttribute('data-icon-position')).toBe('before');
    expect(getByTestId('large').getAttribute('data-icon-position')).toBe('before');
  });

  it('renders the icon, then the children, then the chevron', () => {
    const { getByTestId } = render(
      <MenuButton data-testid="root" icon={<Glyph />}>
        Menu
      </MenuButton>,
    );

    const root = getByTestId('root');

    expect(root.firstElementChild).toBe(iconOf(root));
    expect(root.lastElementChild).toBe(menuIconOf(root));
    expect(root.textContent).toBe('Menu');
  });

  it('suppresses the chevron for an icon-only button that has an icon', () => {
    const { getByTestId } = render(<MenuButton data-testid="root" icon={<Glyph />} aria-label="Menu" />);

    const root = getByTestId('root');

    expect(root.getAttribute('data-icon-only')).toBe('');
    expect(menuIconOf(root)).toBeNull();
  });

  it('keeps the chevron for an icon-only button that has no icon', () => {
    const { getByTestId } = render(<MenuButton data-testid="root" aria-label="Menu" />);

    const root = getByTestId('root');

    expect(root.getAttribute('data-icon-only')).toBe('');
    expect(chevronOf(root)).not.toBeNull();
  });

  it('keeps the data attributes useButtonStyles resolves', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="labelled" appearance="primary" size="large">
          Menu
        </MenuButton>
        <MenuButton data-testid="icon-only" icon={<Glyph />} aria-label="Menu" />
      </>,
    );

    const labelled = getByTestId('labelled');

    expect(labelled.getAttribute('data-appearance')).toBe('primary');
    expect(labelled.getAttribute('data-size')).toBe('large');
    expect(labelled.hasAttribute('data-empty')).toBe(false);

    expect(getByTestId('icon-only').hasAttribute('data-empty')).toBe(true);
  });

  it('resolves the look-prop defaults and passes an explicit shape through', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="default">Menu</MenuButton>
        <MenuButton data-testid="circular" shape="circular">
          Menu
        </MenuButton>
      </>,
    );

    const byDefault = getByTestId('default');

    expect(byDefault.getAttribute('data-appearance')).toBe('secondary');
    expect(byDefault.getAttribute('data-size')).toBe('medium');
    expect(byDefault).not.toHaveClass(styles.circular);

    expect(getByTestId('circular')).toHaveClass(styles.circular);
  });

  it('leaves data-open, data-icon-only and aria-expanded to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="closed">Menu</MenuButton>
        <MenuButton data-testid="open" aria-expanded>
          Menu
        </MenuButton>
      </>,
    );

    const closed = getByTestId('closed');

    expect(closed.hasAttribute('data-open')).toBe(false);
    expect(closed.hasAttribute('data-icon-only')).toBe(false);
    expect(closed.getAttribute('aria-expanded')).toBe('false');

    const open = getByTestId('open');

    expect(open.getAttribute('data-open')).toBe('');
    expect(open.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps a consumer className on the root', () => {
    const { getByTestId } = render(
      <MenuButton data-testid="root" className="consumer">
        Menu
      </MenuButton>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(occurrences(root.className, 'consumer')).toBe(1);
  });

  it('passes disabled and disabledFocusable through to the root', () => {
    const { getByTestId } = render(
      <>
        <MenuButton data-testid="disabled" disabled>
          Menu
        </MenuButton>
        <MenuButton data-testid="disabled-focusable" disabledFocusable>
          Menu
        </MenuButton>
      </>,
    );

    const disabled = getByTestId('disabled');

    expect(disabled.getAttribute('data-disabled')).toBe('');
    expect(disabled).toBeDisabled();

    const disabledFocusable = getByTestId('disabled-focusable');

    expect(disabledFocusable.getAttribute('data-disabled-focusable')).toBe('');
    expect(disabledFocusable.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'button', icon: 'span', menuIcon: 'span' },
      icon: { className: 'consumer-icon' },
      iconOnly: false,
      menuIcon: { className: 'consumer-menu-icon' },
      root: { as: 'button', className: 'consumer', 'aria-expanded': true, 'data-open': '' },
      shape: 'circular',
      size: 'large',
    } as unknown as MenuButtonState;

    const styled = useMenuButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.icon).not.toBe(state.icon);
    expect(styled.menuIcon).not.toBe(state.menuIcon);

    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-icon-position');
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(state.menuIcon!.className).toBe('consumer-menu-icon');

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(menuButtonClassNames.root);
    expect(styled.root['data-open']).toBe('');
    expect((styled.root as { 'data-icon-position'?: string })['data-icon-position']).toBe('before');
    expect(occurrences(styled.icon!.className!, styles.icon)).toBe(2);
    expect(styled.menuIcon!.className).toContain(styles.menuIcon);
    expect(styled.menuIcon!.className).toContain('consumer-menu-icon');
  });

  it('adds no icon or menuIcon slot when the state carries neither', () => {
    const state = {
      appearance: 'secondary',
      components: { root: 'button', icon: 'span', menuIcon: 'span' },
      iconOnly: true,
      root: { as: 'button' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as MenuButtonState;

    const styled = useMenuButtonStyles(state);

    expect(styled.icon).toBeUndefined();
    expect(styled.menuIcon).toBeUndefined();
    expect((styled.root as { 'data-icon-position'?: string })['data-icon-position']).toBeUndefined();
  });

  it('renders the full pipeline against a frozen headless state without throwing', () => {
    expect(() => render(<MenuButton>Menu</MenuButton>)).not.toThrow();
    expect(() => render(<MenuButton menuIcon={<Custom />}>Menu</MenuButton>)).not.toThrow();
    expect(() => render(<MenuButton menuIcon={null}>Menu</MenuButton>)).not.toThrow();
  });
});
