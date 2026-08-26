import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import { renderDropdown, useDropdown } from '@fluentui/react-headless-components-preview/dropdown';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { isConformant } from '../../testing/isConformant';
import { Field } from '../Field/Field';
import { Listbox } from '../Listbox/Listbox';
import { Option } from '../Option/Option';
import { Dropdown } from './Dropdown';
import type { DropdownProps, DropdownState } from './Dropdown.types';
import { dropdownClassNames, useDropdownStyles } from './useDropdownStyles';

import styles from './Dropdown.module.css';

// The real hook and renderer are kept; the spies expose the state at the two seams the windmod
// layer works on. The frozen return is the mutation guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/dropdown', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/dropdown');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useDropdown: jest.fn((...args: Parameters<typeof actual.useDropdown>) =>
      deepFreezeState(actual.useDropdown(...args)),
    ),
    renderDropdown: jest.fn(actual.renderDropdown),
  };
});

const useDropdownSpy = useDropdown as unknown as jest.Mock;
const renderSpy = renderDropdown as unknown as jest.Mock;

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const CONSUMER = <span data-consumer="">C</span>;

/** The 8-input matrix every glyph-rule consumer re-baselines. */
const INPUTS: ReadonlyArray<readonly [string, DropdownProps['expandIcon']]> = [
  ['unsupplied', undefined],
  ['null', null],
  ['{}', {}],
  ['{children: undefined}', { children: undefined }],
  ['{children: null}', { children: null }],
  ['{children: <C/>}', { children: CONSUMER }],
  ['shorthand <C/>', CONSUMER],
  ["shorthand ''", ''],
];

/** Inputs that leave the fallback in charge; the remaining four are consumer-owned or slot-removing. */
const FALLBACK_INPUTS = ['unsupplied', '{}', '{children: undefined}', '{children: null}'];

const OPTIONS = (
  <>
    <Option value="a">One</Option>
    <Option value="b">Two</Option>
  </>
);

const FRUIT = (
  <>
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
    <Option value="blueberry">Blueberry</Option>
    <Option value="cherry">Cherry</Option>
  </>
);

const renderDrop = (props: DropdownProps = {}, children: React.ReactNode = OPTIONS) => {
  const { container } = render(<Dropdown {...props}>{children}</Dropdown>);
  const root = container.firstElementChild as HTMLElement;

  return {
    root,
    // renderDropdown emits the trigger first and the clear button as its sibling, so the trigger is
    // the first button in document order; the clear button is reached by its own bucket instead.
    button: root.querySelector<HTMLButtonElement>('button')!,
    clearButton: root.querySelector<HTMLButtonElement>(`.${styles.clearButton}`),
    expandIcon: root.querySelector<HTMLElement>(`span.${styles.icon}`),
    // The jest css-module proxy drops the component segment, so Dropdown's `root` and Listbox's
    // `root` are the same string; the surface is reached by the listbox marker class instead.
    listbox: root.querySelector<HTMLElement>('.fui-listbox'),
    options: Array.from(root.querySelectorAll<HTMLElement>('[role="option"]')),
  };
};

const pathOf = (host: Element | null): string | null => host?.querySelector('svg path')?.getAttribute('d') ?? null;

const glyphPath = (icon: React.ReactElement): string | null => pathOf(render(icon).container);

const activeText = (root: HTMLElement): string | null => {
  const id = root.querySelector('button')!.getAttribute('aria-activedescendant');

  return id ? root.querySelector(`#${id}`)!.textContent : null;
};

describe('Dropdown', () => {
  beforeEach(() => {
    useDropdownSpy.mockClear();
    renderSpy.mockClear();
  });

  // T-1
  isConformant({
    Component: Dropdown,
    displayName: 'Dropdown',
    primarySlot: 'button',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderDrop();

    expect(root).toHaveClass('fui-dropdown');
    expect(root).toHaveClass('group/fui-dropdown');
    expect(root.classList[0]).toBe('fui-dropdown');
    expect(dropdownClassNames.root).toBe('fui-dropdown group/fui-dropdown');
  });

  it('applies one module class per slot', () => {
    const { root, button, expandIcon, listbox } = renderDrop({ open: true });

    expect(root).toHaveClass(styles.root);
    expect(button).toHaveClass(styles.button);
    expect(button).not.toHaveClass(styles.root);
    expect(expandIcon).toHaveClass(styles.icon);
    expect(listbox).toHaveClass(styles.listbox);
  });

  // §1.1(b) — the expand icon is INSIDE the trigger and the clear button is its sibling.
  it('nests the expand icon in the trigger and keeps the clear button a sibling', () => {
    const { root, button, expandIcon, clearButton } = renderDrop();

    expect(button.contains(expandIcon)).toBe(true);
    expect(button.contains(clearButton)).toBe(false);
    expect(Array.from(root.children)).toEqual([button, clearButton]);
  });

  // §1.2 — the value and the placeholder are one bare text node on the button, and the styling
  // channel is data-placeholder on the ROOT.
  it('renders the value and the placeholder through the same text node', () => {
    expect(renderDrop({ defaultValue: 'One' }).button.textContent).toBe('One');
    expect(renderDrop({ defaultValue: 'One' }).root.hasAttribute('data-placeholder')).toBe(false);

    const { root, button } = renderDrop({ placeholder: 'Pick one' });

    expect(button.textContent).toBe('Pick one');
    expect(button.hasAttribute('placeholder')).toBe(false);
    expect(root.getAttribute('data-placeholder')).toBe('');
  });

  // T-2
  it('maps every appearance onto its own class set', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outline, styles.outlineInteractive],
      underline: [styles.underline],
      'filled-darker': [styles.filledDarker],
      'filled-lighter': [styles.filledLighter],
    };

    const all = [
      styles.outline,
      styles.outlineInteractive,
      styles.underline,
      styles.filledDarker,
      styles.filledLighter,
    ];

    appearances.forEach(appearance => {
      const { root } = renderDrop({ appearance });

      expected[appearance].forEach(className => expect(root).toHaveClass(className));
      all
        .filter(className => !expected[appearance].includes(className))
        .forEach(className => expect(root).not.toHaveClass(className));
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root } = renderDrop();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(styles.outline);
    expect(root).toHaveClass(styles.outlineInteractive);
  });

  it('drops only the interactive half of the outline appearance when disabled', () => {
    const { root } = renderDrop({ disabled: true });

    expect(root).toHaveClass(styles.outline);
    expect(root).not.toHaveClass(styles.outlineInteractive);
    expect(root).toHaveClass(styles.disabled);
  });

  // T-3
  it('stamps data-size on the root alone, and inherits it from a Field ancestor', () => {
    sizes.forEach(size => {
      const { root, button, expandIcon } = renderDrop({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(button.hasAttribute('data-size')).toBe(false);
      expect(expandIcon!.hasAttribute('data-size')).toBe(false);
    });

    const { container } = render(
      <Field size="large">
        <Dropdown>{OPTIONS}</Dropdown>
      </Field>,
    );

    expect(container.querySelector('.fui-dropdown')!.getAttribute('data-size')).toBe('large');

    const { container: overridden } = render(
      <Field size="large">
        <Dropdown size="small">{OPTIONS}</Dropdown>
      </Field>,
    );

    expect(overridden.querySelector('.fui-dropdown')!.getAttribute('data-size')).toBe('small');
  });

  // T-4. Griffel's Dropdown does NOT gate invalid on !disabled, where its Input does.
  it('picks the invalid class that matches the appearance, disabled or not', () => {
    appearances.forEach(appearance => {
      const underline = appearance === 'underline';
      const { root } = renderDrop({ appearance, 'aria-invalid': true } as DropdownProps);

      expect(root.classList.contains(styles.invalid)).toBe(!underline);
      expect(root.classList.contains(styles.invalidUnderline)).toBe(underline);

      const { root: off } = renderDrop({ appearance });

      expect(off).not.toHaveClass(styles.invalid);
      expect(off).not.toHaveClass(styles.invalidUnderline);
    });

    const { root } = renderDrop({ 'aria-invalid': true, disabled: true } as DropdownProps);

    expect(root).toHaveClass(styles.invalid);
    expect(root).toHaveClass(styles.disabled);
  });

  it('gates the invalid look on aria-invalid resolving to true, not on the headless attribute', () => {
    expect(renderDrop({ 'aria-invalid': 'grammar' } as DropdownProps).root).not.toHaveClass(styles.invalid);
    expect(renderDrop({ 'aria-invalid': 'grammar' } as DropdownProps).root.getAttribute('data-invalid')).toBe(
      'grammar',
    );
    expect(renderDrop({ 'aria-invalid': 'true' } as DropdownProps).root).toHaveClass(styles.invalid);
  });

  // T-5. Both slots hide the same way, in inverse conditions — Griffel's Dropdown removes the
  // chevron outright where its Combobox clips it (DD-C).
  it('swaps one hiding mechanism between the expand icon and the clear button', () => {
    const plain = renderDrop();

    expect(plain.expandIcon).not.toHaveClass(styles.iconHidden);
    expect(plain.clearButton).toHaveClass(styles.iconHidden);
    expect(plain.clearButton).toHaveClass(styles.clearButton);
    expect(plain.clearButton).toHaveClass(styles.icon);

    const clearing = renderDrop({ clearable: true, defaultSelectedOptions: ['a'], defaultValue: 'One' });

    expect(clearing.expandIcon).toHaveClass(styles.iconHidden);
    expect(clearing.clearButton).not.toHaveClass(styles.iconHidden);
    expect(clearing.root.getAttribute('data-clearable')).toBe('');
  });

  it('drops the clear slot entirely under multiselect', () => {
    const { clearButton, root } = renderDrop({
      clearable: true,
      multiselect: true,
      defaultSelectedOptions: ['a'],
    });

    expect(clearButton).toBeNull();
    expect(root.hasAttribute('data-clearable')).toBe(false);
  });

  // T-8, slot-scoped. Griffel's Dropdown expandIcon is a bare <span> on both sides, so the glyph is
  // the whole comparison; the trigger's data-tabster blob is a Griffel-only markup divergence that
  // owes no CSS and is deliberately not compared.
  describe.each([
    ['expandIcon', {} as DropdownProps, ChevronDownRegular],
    [
      'clearButton',
      { clearable: true, defaultSelectedOptions: ['a'], defaultValue: 'One' } as DropdownProps,
      DismissRegular,
    ],
  ] as const)('%s D1 matrix', (slotName, extra, Glyph) => {
    it.each(INPUTS.map(([label]) => label))('reproduces Griffel for %s', label => {
      const value = INPUTS.find(([name]) => name === label)![1];
      const parts = renderDrop({ ...extra, [slotName]: value });
      const slot = slotName === 'expandIcon' ? parts.expandIcon : parts.clearButton;

      if (label === 'null') {
        // Slot-level null removes the slot outright.
        expect(slot).toBeNull();

        return;
      }

      expect(slot).not.toBeNull();

      if (FALLBACK_INPUTS.includes(label)) {
        expect(pathOf(slot)).toBe(glyphPath(<Glyph />));

        return;
      }

      if (label === "shorthand ''") {
        expect(slot!.querySelector('svg')).toBeNull();
        expect(slot!.textContent).toBe('');

        return;
      }

      expect(slot!.querySelector('[data-consumer]')).not.toBeNull();
      expect(slot!.querySelector('svg')).toBeNull();
    });
  });

  it('gives the two glyph slots different default glyphs', () => {
    const { expandIcon, clearButton } = renderDrop();

    expect(pathOf(expandIcon)).toBe(glyphPath(<ChevronDownRegular />));
    expect(pathOf(clearButton)).toBe(glyphPath(<DismissRegular />));
    expect(pathOf(expandIcon)).not.toBe(pathOf(clearButton));
  });

  // T-6. `fui-listbox` is windmod Listbox's marker pair and nothing else emits it, which is the only
  // structural discriminator jest has — the css-module proxy makes every module's `root` one string.
  it('renders windmod Listbox as the surface, with the resolved slot intact', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { listbox } = renderDrop({ open: true });

    expect(listbox).not.toBeNull();
    expect(listbox).toHaveClass('fui-listbox');
    expect(listbox).toHaveClass('group/fui-listbox');
    expect(listbox).toHaveClass(styles.listbox);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();

    const base = useDropdownSpy.mock.results.at(-1)!.value as DropdownState;
    const styled = renderSpy.mock.calls.at(-1)![0] as DropdownState;

    /* eslint-disable @typescript-eslint/no-deprecated -- the components map is what the swap edits */
    expect(base.components.listbox).not.toBe(Listbox);
    expect(styled.components.listbox).toBe(Listbox);
    /* eslint-enable @typescript-eslint/no-deprecated */
    expect((styled.listbox as unknown as Record<symbol, unknown>)[SLOT_ELEMENT_TYPE_SYMBOL]).toBe(Listbox);

    // Everything useListboxSlot merged in — the id, the merged ref and both handlers — has to
    // survive the element-type re-stamp; only the className may change.
    const slot = base.listbox as unknown as Record<string, unknown>;
    const restamped = styled.listbox as unknown as Record<string, unknown>;
    const handlers = Object.keys(slot).filter(key => key.startsWith('on'));

    expect(handlers.length).toBeGreaterThanOrEqual(2);
    expect(slot.id).toBe(listbox!.id);
    expect(slot.ref).toBeDefined();
    Object.keys(slot)
      .filter(key => key !== 'className')
      .forEach(key => expect(restamped[key]).toBe(slot[key]));
  });

  // The promotion attribute lives on the Listbox's own root, so a consumer's override travels
  // through the Dropdown's listbox shorthand — which is what lets a VR scene hold six open
  // surfaces at once, `popover: 'auto'` being mutually exclusive.
  it('lets a consumer override the surface popover mode through the listbox slot', () => {
    expect(renderDrop({ open: true }).listbox!.getAttribute('popover')).toBe('auto');
    expect(renderDrop({ open: true, listbox: { popover: 'manual' } }).listbox!.getAttribute('popover')).toBe('manual');
  });

  // T-7. jsdom drops the inline `width: anchor-size(width)` that matchTargetSize writes, so the
  // width restoration is proved by the browser probe and the dropdown-width VR scenes; the other
  // five defaults leave traces jsdom keeps.
  it('restores Griffel positioning defaults the headless layer drops', () => {
    const { listbox } = renderDrop({ open: true });
    const style = listbox!.getAttribute('style')!;

    expect(listbox!.getAttribute('data-placement')).toBe('below-start');
    expect(style).toContain('position-area: block-end span-inline-end');
    expect(style).toContain('position-try-fallbacks: block-start, inline-end, inline-end span-block-end');
    expect(style).toContain('margin-block-start: 2px');
  });

  it.each([
    ['position', { position: 'above' } as const, (el: HTMLElement) => el.getAttribute('data-placement')],
    ['align', { align: 'end' } as const, (el: HTMLElement) => el.getAttribute('data-placement')],
    ['offset', { offset: { crossAxis: 0, mainAxis: 24 } } as const, (el: HTMLElement) => el.getAttribute('style')],
  ])('lets a consumer override the restored %s', (_name, positioning, read) => {
    const restored = read(renderDrop({ open: true }).listbox!);
    const overridden = read(renderDrop({ open: true, positioning }).listbox!);

    expect(overridden).not.toBe(restored);
  });

  it('keeps the restored defaults a consumer did not override', () => {
    const { listbox } = renderDrop({ open: true, positioning: { offset: { crossAxis: 0, mainAxis: 24 } } });

    expect(listbox!.getAttribute('data-placement')).toBe('below-start');
    expect(listbox!.getAttribute('style')).toContain('margin-block-start: 24px');
  });

  // Typeahead writes no class and nothing distinguishing on the trigger; every DOM effect is
  // an active-descendant attribute on an Option, and the trigger's text never changes.
  it('opens on the first typed character while closed', () => {
    const { root, button } = renderDrop({}, FRUIT);

    expect(root.hasAttribute('data-open')).toBe(false);
    fireEvent.keyDown(button, { key: 'b' });
    expect(root.getAttribute('data-open')).toBe('');
  });

  it('moves the active descendant without touching the trigger text or classes', () => {
    const { root, button } = renderDrop({ open: true }, FRUIT);
    const before = button.getAttribute('class');

    fireEvent.keyDown(button, { key: 'c' });

    expect(activeText(root)).toBe('Cherry');
    expect(root.querySelector('[data-activedescendant]')!.textContent).toBe('Cherry');
    expect(root.querySelector('[data-activedescendant-focusvisible]')!.textContent).toBe('Cherry');
    expect(button.textContent).toBe('');
    expect(button.getAttribute('class')).toBe(before);
    expect(document.activeElement).not.toBe(root.querySelector('[role="option"]'));
  });

  // T-10. The 500ms buffer, and the same-letter cycling, are the whole of Dropdown's own typeahead
  // contribution — behaviour with no pixel.
  describe('typeahead buffer', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('matches a multi-character prefix typed within the buffer window', () => {
      const { root, button } = renderDrop({ open: true }, FRUIT);

      fireEvent.keyDown(button, { key: 'b' });
      expect(activeText(root)).toBe('Banana');

      fireEvent.keyDown(button, { key: 'l' });
      expect(activeText(root)).toBe('Blueberry');
    });

    it('cycles same-initial options when the same letter repeats', () => {
      const { root, button } = renderDrop({ open: true }, FRUIT);

      fireEvent.keyDown(button, { key: 'b' });
      expect(activeText(root)).toBe('Banana');

      fireEvent.keyDown(button, { key: 'b' });
      expect(activeText(root)).toBe('Blueberry');
    });

    it('resets the buffer after 500ms', () => {
      const { root, button } = renderDrop({ open: true }, FRUIT);

      fireEvent.keyDown(button, { key: 'b' });
      expect(activeText(root)).toBe('Banana');

      jest.advanceTimersByTime(600);

      // With the buffer cleared the search is a bare "l", which matches nothing, so the controller
      // blurs instead of landing on Blueberry.
      fireEvent.keyDown(button, { key: 'l' });
      expect(activeText(root)).toBeNull();
    });
  });

  // T-11
  it('adds only data-size of its own; the five state attributes come from the headless hook', () => {
    const { root } = renderDrop({ open: true, clearable: true, defaultSelectedOptions: ['a'], defaultValue: 'One' });
    const styled = renderSpy.mock.calls.at(-1)![0] as DropdownState;
    const base = useDropdownSpy.mock.results.at(-1)!.value as DropdownState;

    ['data-open', 'data-disabled', 'data-placeholder', 'data-invalid', 'data-clearable'].forEach(name => {
      expect(styled.root[name as 'data-open']).toBe(base.root[name as 'data-open']);
    });
    expect(root.getAttribute('data-size')).toBe('medium');
    expect('data-size' in (base.root as object)).toBe(false);
  });

  // M6 has no pixel guard: the filled border keyword is identical to the token in every theme the
  // VR gate runs, and diverges only in teams-high-contrast, where the token resolves to #ffffff.
  // jsdom applies no module declaration either, so the authored text is the one permanent guard.
  it('authors the literal transparent keyword on the filled appearances, not the token', () => {
    const module = readFileSync(join(__dirname, 'Dropdown.module.css'), 'utf8');
    const bodyOf = (local: string) => module.slice(module.indexOf(`.${local} {`)).split('}')[0];

    ['filled-lighter', 'filled-darker'].forEach(local => {
      expect(bodyOf(local)).toContain('border-transparent ');
      expect(bodyOf(local)).not.toContain('border-transparent-stroke');
    });
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root, button } = renderDrop({ root: { className: 'consumer' } });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(button).not.toHaveClass('consumer');
  });

  // T-12 is the frozen headless return above; this is the styles hook's own no-mutation contract.
  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled-darker',
      button: { 'aria-invalid': true, className: 'native', disabled: false },
      clearButton: { className: 'clear' },
      expandIcon: { className: 'expand' },
      listbox: { className: 'surface' },
      root: { className: 'consumer' },
      showClearButton: true,
      size: 'large',
    } as unknown as DropdownState;

    const styled = useDropdownStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.button).not.toBe(state.button);
    expect(styled.listbox).not.toBe(state.listbox);
    expect(styled.expandIcon).not.toBe(state.expandIcon);
    expect(styled.clearButton).not.toBe(state.clearButton);

    expect(state.root.className).toBe('consumer');
    expect(state.button.className).toBe('native');
    expect(state.listbox!.className).toBe('surface');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.button.className).toContain('native');
    expect(styled.listbox!.className).toContain('surface');
    expect(styled.expandIcon!.className).toContain('expand');
    expect(styled.clearButton!.className).toContain('clear');
  });
});
