import * as React from 'react';
import { render } from '@testing-library/react';
import { renderSplitButton } from '@fluentui/react-headless-components-preview/split-button';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import { isConformant } from '../../testing/isConformant';
import { Button } from '../Button/Button';
import { MenuButton } from '../MenuButton/MenuButton';
import { SplitButton } from './SplitButton';
import type { SplitButtonState } from './SplitButton.types';
import { splitButtonClassNames, useSplitButtonStyles } from './useSplitButtonStyles';

import styles from './SplitButton.module.css';

// The real render is kept; the spy only exposes the state the component hands it, which is the
// only place `components` is observable.
jest.mock('@fluentui/react-headless-components-preview/split-button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/split-button');

  return { ...actual, renderSplitButton: jest.fn(actual.renderSplitButton) };
});

const renderSpy = renderSplitButton as unknown as jest.Mock;

// The jest css-module proxy drops the component and hash segments, so SplitButton's `root`,
// Button's `root` and MenuButton's `root` are the same string — only the occurrence count
// distinguishes them.
const occurrences = (className: string, target: string): number =>
  className.split(' ').filter(name => name === target).length;

const buttonsOf = (root: HTMLElement): HTMLButtonElement[] => Array.from(root.querySelectorAll('button'));

const primaryOf = (root: HTMLElement): HTMLButtonElement => buttonsOf(root)[0];

const menuOf = (root: HTMLElement): HTMLButtonElement => buttonsOf(root)[1];

const chevronOf = (button: HTMLElement): SVGElement | null => button.querySelector<SVGElement>('svg[data-fui-icon]');

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;
const Custom = (): React.ReactElement => <i data-testid="custom" />;

const appearances = ['secondary', 'primary', 'outline', 'subtle', 'transparent'] as const;

describe('SplitButton', () => {
  beforeEach(() => {
    renderSpy.mockClear();
  });

  isConformant({
    Component: SplitButton,
    displayName: 'SplitButton',
  });

  it('stamps its marker pair first', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    const root = getByTestId('root');

    expect(root.className).toContain(splitButtonClassNames.root);
    expect(root).toHaveClass('fui-split-button');
    expect(root).toHaveClass('group/fui-split-button');
    expect(root.classList[0]).toBe('fui-split-button');
  });

  it('carries the root class of every stylesheet on the composition exactly once each', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    const root = getByTestId('root');
    const total = [root, primaryOf(root), menuOf(root)].reduce(
      (count, element) => count + occurrences(element.className, styles.root),
      0,
    );

    // SplitButton root + the primary Button root + MenuButton's own root and Button's beneath it.
    expect(total).toBe(4);
    expect(occurrences(root.className, styles.root)).toBe(1);
  });

  it('renders the two children as the windmod Button and MenuButton', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    const root = getByTestId('root');
    const primary = primaryOf(root);
    const menu = menuOf(root);

    expect(primary).toHaveClass('fui-button');
    expect(primary).toHaveClass('group/fui-button');

    expect(menu).toHaveClass('fui-menu-button');
    expect(menu).toHaveClass('group/fui-menu-button');
    expect(menu).toHaveClass('fui-button');
    expect(menu).toHaveClass('group/fui-button');
  });

  // assertSlots rewrites a slot's element type to match state.components and warns; a half-done
  // swap in either direction is silent in the DOM of one environment but not the other.
  it('swaps state.components alongside the slot element types, without an assertSlots warning', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    render(<SplitButton>Send</SplitButton>);

    // eslint-disable-next-line @typescript-eslint/no-deprecated -- the swap under test is exactly this map
    const { components } = renderSpy.mock.calls[0][0] as SplitButtonState;

    expect(components.menuButton).toBe(MenuButton);
    expect(components.primaryActionButton).toBe(Button);
    expect(warn).not.toHaveBeenCalled();

    warn.mockRestore();
  });

  it('carries the primaryActionButton class', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    expect(primaryOf(getByTestId('root'))).toHaveClass(styles.primaryActionButton);
  });

  it('carries the menuButton class', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    expect(menuOf(getByTestId('root'))).toHaveClass(styles.menuButton);
  });

  it('stamps the resolved appearance on the root', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="default">Send</SplitButton>
        {appearances.map(appearance => (
          <SplitButton key={appearance} data-testid={appearance} appearance={appearance}>
            Send
          </SplitButton>
        ))}
      </>,
    );

    expect(getByTestId('default').getAttribute('data-appearance')).toBe('secondary');

    appearances.forEach(appearance => {
      expect(getByTestId(appearance).getAttribute('data-appearance')).toBe(appearance);
    });
  });

  it('stamps the disabled attributes independently and only when set', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="plain">Send</SplitButton>
        <SplitButton data-testid="disabled" disabled>
          Send
        </SplitButton>
        <SplitButton data-testid="disabled-focusable" disabledFocusable>
          Send
        </SplitButton>
      </>,
    );

    const plain = getByTestId('plain');

    expect(plain.hasAttribute('data-disabled')).toBe(false);
    expect(plain.hasAttribute('data-disabled-focusable')).toBe(false);

    const disabled = getByTestId('disabled');

    expect(disabled.hasAttribute('data-disabled')).toBe(true);
    expect(disabled.hasAttribute('data-disabled-focusable')).toBe(false);

    const disabledFocusable = getByTestId('disabled-focusable');

    expect(disabledFocusable.hasAttribute('data-disabled-focusable')).toBe(true);
    expect(disabledFocusable.hasAttribute('data-disabled')).toBe(false);
  });

  it('feeds the look props into both children', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="default">Send</SplitButton>
        <SplitButton data-testid="look" appearance="primary" size="large">
          Send
        </SplitButton>
        <SplitButton data-testid="circular" shape="circular">
          Send
        </SplitButton>
      </>,
    );

    const byDefault = getByTestId('default');

    // Button carries no `rounded` class — the default shape is the absence of the other two.
    [primaryOf(byDefault), menuOf(byDefault)].forEach(button => {
      expect(button.getAttribute('data-size')).toBe('medium');
      expect(button).not.toHaveClass('fuicm-circular');
      expect(button).not.toHaveClass('fuicm-square');
    });

    const look = getByTestId('look');

    [primaryOf(look), menuOf(look)].forEach(button => {
      expect(button.getAttribute('data-appearance')).toBe('primary');
      expect(button.getAttribute('data-size')).toBe('large');
    });

    const circular = getByTestId('circular');

    // Button selects shape by module class, not by a data attribute.
    expect(primaryOf(circular)).toHaveClass('fuicm-circular');
    expect(menuOf(circular)).toHaveClass('fuicm-circular');
  });

  it('lets a per-slot look prop win over the split button’s', () => {
    const { getByTestId } = render(
      <SplitButton data-testid="root" appearance="primary" menuButton={{ appearance: 'subtle' }}>
        Send
      </SplitButton>,
    );

    const root = getByTestId('root');

    expect(primaryOf(root).getAttribute('data-appearance')).toBe('primary');
    expect(menuOf(root).getAttribute('data-appearance')).toBe('subtle');
  });

  // The glyph identity, not just its presence: the chevron the composed MenuButton restores.
  it('inherits the default chevron from the composed MenuButton', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="root">Send</SplitButton>
        <span data-testid="reference">
          <ChevronDownRegular />
        </span>
      </>,
    );

    const rendered = chevronOf(menuOf(getByTestId('root')))!
      .querySelector('path')!
      .getAttribute('d');

    expect(rendered).toBe(getByTestId('reference').querySelector('path')!.getAttribute('d'));
  });

  it('removes the chevron slot entirely for menuIcon={null}', () => {
    const { getByTestId } = render(
      <SplitButton data-testid="root" menuIcon={null}>
        Send
      </SplitButton>,
    );

    const menu = menuOf(getByTestId('root'));

    expect(chevronOf(menu)).toBeNull();
    expect(menu.querySelectorAll('span')).toHaveLength(0);
  });

  it('passes menuIcon through to the menu button', () => {
    const { getByTestId, queryByTestId } = render(
      <>
        <SplitButton data-testid="custom-icon" menuIcon={<Custom />}>
          Send
        </SplitButton>
        <SplitButton data-testid="props" menuIcon={{ className: 'consumer-menu-icon' }}>
          Send
        </SplitButton>
      </>,
    );

    expect(queryByTestId('custom')).not.toBeNull();
    expect(chevronOf(menuOf(getByTestId('custom-icon')))).toBeNull();

    const withProps = menuOf(getByTestId('props'));

    expect(chevronOf(withProps)).not.toBeNull();
    expect(withProps.querySelector('.consumer-menu-icon')).not.toBeNull();
  });

  it('renders a div wrapping the primary button then the menu button', () => {
    const { getByTestId } = render(<SplitButton data-testid="root">Send</SplitButton>);

    const root = getByTestId('root');

    expect(root.tagName).toBe('DIV');
    expect(root.children).toHaveLength(2);
    expect(buttonsOf(root)).toHaveLength(2);
    expect(root.firstElementChild).toBe(primaryOf(root));
    expect(primaryOf(root).textContent).toBe('Send');
  });

  it('drops either child for a null slot', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="no-menu" menuButton={null}>
          Send
        </SplitButton>
        <SplitButton data-testid="no-primary" primaryActionButton={null}>
          Send
        </SplitButton>
      </>,
    );

    const noMenu = buttonsOf(getByTestId('no-menu'));

    expect(noMenu).toHaveLength(1);
    expect(noMenu[0]).toHaveClass(styles.primaryActionButton);

    const noPrimary = buttonsOf(getByTestId('no-primary'));

    expect(noPrimary).toHaveLength(1);
    expect(noPrimary[0]).toHaveClass(styles.menuButton);
  });

  it('leaves the upstream aria-labelledby wiring alone and passes menuButton props through', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="wired">Send</SplitButton>
        <SplitButton data-testid="labelled" menuButton={{ 'aria-label': 'More' }}>
          Send
        </SplitButton>
      </>,
    );

    const wired = getByTestId('wired');

    expect(menuOf(wired).getAttribute('aria-labelledby')).toBe(primaryOf(wired).id);
    expect(primaryOf(wired).id).toBeTruthy();

    expect(menuOf(getByTestId('labelled')).hasAttribute('aria-labelledby')).toBe(false);
    expect(menuOf(getByTestId('labelled')).getAttribute('aria-label')).toBe('More');
  });

  it('routes icon and iconPosition to the primary button only', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="before" icon={<Glyph />}>
          Send
        </SplitButton>
        <SplitButton data-testid="after" icon={<Glyph />} iconPosition="after">
          Send
        </SplitButton>
      </>,
    );

    const before = getByTestId('before');

    expect(primaryOf(before).querySelector('[data-testid="glyph"]')).not.toBeNull();
    expect(menuOf(before).querySelector('[data-testid="glyph"]')).toBeNull();
    expect(primaryOf(before).getAttribute('data-icon-position')).toBe('before');

    expect(primaryOf(getByTestId('after')).getAttribute('data-icon-position')).toBe('after');
  });

  it('propagates disabled and disabledFocusable to both children', () => {
    const { getByTestId } = render(
      <>
        <SplitButton data-testid="disabled" disabled>
          Send
        </SplitButton>
        <SplitButton data-testid="disabled-focusable" disabledFocusable>
          Send
        </SplitButton>
      </>,
    );

    buttonsOf(getByTestId('disabled')).forEach(button => {
      expect(button).toBeDisabled();
    });

    buttonsOf(getByTestId('disabled-focusable')).forEach(button => {
      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect(button.hasAttribute('disabled')).toBe(false);
    });
  });

  it('forwards the ref to the wrapper', () => {
    const ref = React.createRef<HTMLDivElement>();

    render(
      <SplitButton data-testid="root" ref={ref}>
        Send
      </SplitButton>,
    );

    expect(ref.current!.tagName).toBe('DIV');
    expect(ref.current!).toHaveClass('fui-split-button');
  });

  it('forwards a primaryActionButton slot ref to the primary button', () => {
    const ref = React.createRef<HTMLButtonElement>();

    const { getByTestId } = render(
      <SplitButton data-testid="root" primaryActionButton={{ ref }}>
        Send
      </SplitButton>,
    );

    expect(ref.current).toBe(primaryOf(getByTestId('root')));
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
      disabled: true,
      disabledFocusable: false,
      menuButton: { className: 'consumer-menu' },
      primaryActionButton: { className: 'consumer-primary' },
      root: { as: 'div', className: 'consumer' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as SplitButtonState;

    Object.freeze(state);
    Object.freeze(state.root);
    Object.freeze(state.menuButton);
    Object.freeze(state.primaryActionButton);

    const styled = useSplitButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.menuButton).not.toBe(state.menuButton);
    expect(styled.primaryActionButton).not.toBe(state.primaryActionButton);

    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.menuButton!.className).toBe('consumer-menu');
    expect(state.primaryActionButton!.className).toBe('consumer-primary');

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(splitButtonClassNames.root);
    expect((styled.root as { 'data-appearance'?: string })['data-appearance']).toBe('primary');
    expect((styled.root as { 'data-disabled'?: true })['data-disabled']).toBe(true);
    expect((styled.root as { 'data-disabled-focusable'?: true })['data-disabled-focusable']).toBeUndefined();
    expect(styled.menuButton!.className).toContain(styles.menuButton);
    expect(styled.primaryActionButton!.className).toContain(styles.primaryActionButton);
  });

  it('adds no child slot when the state carries none', () => {
    const state = {
      appearance: 'secondary',
      components: { root: 'div', menuButton: MenuButton, primaryActionButton: Button },
      root: { as: 'div' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as SplitButtonState;

    const styled = useSplitButtonStyles(state);

    expect(styled.menuButton).toBeUndefined();
    expect(styled.primaryActionButton).toBeUndefined();
  });
});
