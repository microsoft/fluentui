import * as React from 'react';
import { render } from '@testing-library/react';
import { SLOT_ELEMENT_TYPE_SYMBOL } from '@fluentui/react-utilities';
import { renderCombobox, useCombobox } from '@fluentui/react-headless-components-preview/combobox';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { Field } from '../Field/Field';
import { Listbox } from '../Listbox/Listbox';
import { Option } from '../Option/Option';
import { Combobox } from './Combobox';
import type { ComboboxProps, ComboboxState } from './Combobox.types';
import { comboboxClassNames, useComboboxStyles } from './useComboboxStyles';

import styles from './Combobox.module.css';

// The real hook and renderer are kept; the spies expose the state at the two seams the windmod
// layer works on. The frozen return is the mutation guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/combobox', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/combobox');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useCombobox: jest.fn((...args: Parameters<typeof actual.useCombobox>) =>
      deepFreezeState(actual.useCombobox(...args)),
    ),
    renderCombobox: jest.fn(actual.renderCombobox),
  };
});

const useComboboxSpy = useCombobox as unknown as jest.Mock;
const renderSpy = renderCombobox as unknown as jest.Mock;

const appearances = ['outline', 'underline', 'filled-darker', 'filled-lighter'] as const;
const sizes = ['small', 'medium', 'large'] as const;

const CONSUMER = <span data-consumer="">C</span>;

/** The 8-input matrix every glyph-rule consumer re-baselines. */
const INPUTS: ReadonlyArray<readonly [string, ComboboxProps['expandIcon']]> = [
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

const renderCombo = (props: ComboboxProps = {}) => {
  const { container } = render(<Combobox {...props}>{OPTIONS}</Combobox>);
  const root = container.firstElementChild as HTMLElement;
  const icons = Array.from(root.querySelectorAll<HTMLElement>(`.${styles.icon}`));

  return {
    root,
    input: root.querySelector<HTMLInputElement>('input')!,
    icons,
    // The two icon slots share one bucket and are told apart by render order — renderCombobox emits
    // clearIcon before expandIcon. With one icon present the pair is ambiguous, so those cases read
    // `icons` directly instead.
    clearIcon: icons.length === 2 ? icons[0] : null,
    expandIcon: icons.length === 2 ? icons[1] : null,
    // The jest css-module proxy drops the component segment, so Combobox's `root` and Listbox's
    // `root` are the same string; the surface is reached by the listbox marker class instead.
    listbox: root.querySelector<HTMLElement>('.fui-listbox'),
  };
};

const pathOf = (host: Element | null): string | null => host?.querySelector('svg path')?.getAttribute('d') ?? null;

const glyphPath = (icon: React.ReactElement): string | null => pathOf(render(icon).container);

describe('Combobox', () => {
  beforeEach(() => {
    useComboboxSpy.mockClear();
    renderSpy.mockClear();
  });

  isConformant({
    Component: Combobox,
    displayName: 'Combobox',
    primarySlot: 'input',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderCombo();

    expect(root).toHaveClass('fui-combobox');
    expect(root).toHaveClass('group/fui-combobox');
    expect(root.classList[0]).toBe('fui-combobox');
    expect(comboboxClassNames.root).toBe('fui-combobox group/fui-combobox');
  });

  it('applies one module class per slot', () => {
    const { root, input, icons, listbox } = renderCombo({ open: true });

    expect(root).toHaveClass(styles.root);
    expect(input).toHaveClass(styles.input);
    expect(input).not.toHaveClass(styles.root);
    expect(icons).toHaveLength(2);
    icons.forEach(icon => expect(icon).toHaveClass(styles.icon));
    expect(listbox).toHaveClass(styles.listbox);
  });

  it('emits the input, then the clear icon, then the expand icon', () => {
    const { root, input, expandIcon, clearIcon } = renderCombo();
    const children = Array.from(root.children);

    // ComboboxSlots declares expandIcon before clearIcon; the renderer emits the other order.
    expect(children[0]).toBe(input);
    expect(children[1]).toBe(clearIcon);
    expect(children[2]).toBe(expandIcon);
  });

  // T-3
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
      const { root } = renderCombo({ appearance });

      expected[appearance].forEach(className => expect(root).toHaveClass(className));
      all
        .filter(className => !expected[appearance].includes(className))
        .forEach(className => expect(root).not.toHaveClass(className));
    });
  });

  it('defaults to the outline appearance at the medium size', () => {
    const { root } = renderCombo();

    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(styles.outline);
    expect(root).toHaveClass(styles.outlineInteractive);
  });

  it('drops only the interactive half of the outline appearance when disabled', () => {
    const { root } = renderCombo({ disabled: true });

    expect(root).toHaveClass(styles.outline);
    expect(root).not.toHaveClass(styles.outlineInteractive);
    expect(root).toHaveClass(styles.disabled);
  });

  // T-4
  it('stamps data-size on the root alone, and inherits it from a Field ancestor', () => {
    sizes.forEach(size => {
      const { root, input, icons } = renderCombo({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(input.hasAttribute('data-size')).toBe(false);
      icons.forEach(icon => expect(icon.hasAttribute('data-size')).toBe(false));
    });

    const { container } = render(
      <Field size="large">
        <Combobox>{OPTIONS}</Combobox>
      </Field>,
    );

    expect(container.querySelector('.fui-combobox')!.getAttribute('data-size')).toBe('large');

    const { container: overridden } = render(
      <Field size="large">
        <Combobox size="small">{OPTIONS}</Combobox>
      </Field>,
    );

    expect(overridden.querySelector('.fui-combobox')!.getAttribute('data-size')).toBe('small');
  });

  // T-5. Griffel's Combobox does NOT gate invalid on !disabled, where its Input does.
  it('picks the invalid class that matches the appearance, disabled or not', () => {
    appearances.forEach(appearance => {
      const underline = appearance === 'underline';
      const { root } = renderCombo({ appearance, 'aria-invalid': true } as ComboboxProps);

      expect(root.classList.contains(styles.invalid)).toBe(!underline);
      expect(root.classList.contains(styles.invalidUnderline)).toBe(underline);

      const { root: off } = renderCombo({ appearance });

      expect(off).not.toHaveClass(styles.invalid);
      expect(off).not.toHaveClass(styles.invalidUnderline);
    });

    const { root } = renderCombo({ 'aria-invalid': true, disabled: true } as ComboboxProps);

    expect(root).toHaveClass(styles.invalid);
    expect(root).toHaveClass(styles.disabled);
  });

  it('gates the invalid look on aria-invalid resolving to true, not on the headless attribute', () => {
    expect(renderCombo({ 'aria-invalid': 'grammar' } as ComboboxProps).root).not.toHaveClass(styles.invalid);
    expect(renderCombo({ 'aria-invalid': 'grammar' } as ComboboxProps).root.getAttribute('data-invalid')).toBe(
      'grammar',
    );
    expect(renderCombo({ 'aria-invalid': 'true' } as ComboboxProps).root).toHaveClass(styles.invalid);
  });

  // T-6
  it('swaps the two hiding mechanisms between the expand and clear icons', () => {
    const plain = renderCombo();

    expect(plain.expandIcon).not.toHaveClass(styles.iconVisuallyHidden);
    expect(plain.clearIcon).toHaveClass(styles.iconHidden);

    const clearing = renderCombo({ clearable: true, defaultSelectedOptions: ['a'], defaultValue: 'One' });

    expect(clearing.expandIcon).toHaveClass(styles.iconVisuallyHidden);
    expect(clearing.clearIcon).not.toHaveClass(styles.iconHidden);
    expect(clearing.root.getAttribute('data-clearable')).toBe('');
  });

  it('drops the clear slot entirely under multiselect', () => {
    const { icons, root } = renderCombo({ clearable: true, multiselect: true, defaultSelectedOptions: ['a'] });

    expect(icons).toHaveLength(1);
    expect(root.hasAttribute('data-clearable')).toBe(false);
  });

  // The expandIcon assertion is glyph-only: Griffel additionally gives that slot
  // role="button", aria-expanded and a computed name, which the headless slot does not ship.
  describe.each([
    ['expandIcon', {} as ComboboxProps, ChevronDownRegular, DismissRegular],
    [
      'clearIcon',
      { clearable: true, defaultSelectedOptions: ['a'], defaultValue: 'One' } as ComboboxProps,
      DismissRegular,
      ChevronDownRegular,
    ],
  ] as const)('%s glyph rule matrix', (slotName, extra, Glyph, SiblingGlyph) => {
    it.each(INPUTS.map(([label]) => label))('reproduces Griffel for %s', label => {
      const value = INPUTS.find(([name]) => name === label)![1];
      const parts = renderCombo({ ...extra, [slotName]: value });
      const slot = slotName === 'expandIcon' ? parts.expandIcon : parts.clearIcon;

      if (label === 'null') {
        // Slot-level null removes the slot, so the one surviving icon must be the other one.
        expect(parts.icons).toHaveLength(1);
        expect(pathOf(parts.icons[0])).toBe(glyphPath(<SiblingGlyph />));

        return;
      }

      expect(parts.icons).toHaveLength(2);
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

  it('gives the two icon slots different default glyphs', () => {
    const { expandIcon, clearIcon } = renderCombo();

    expect(pathOf(expandIcon)).toBe(glyphPath(<ChevronDownRegular />));
    expect(pathOf(clearIcon)).toBe(glyphPath(<DismissRegular />));
    expect(pathOf(expandIcon)).not.toBe(pathOf(clearIcon));
  });

  // `fui-listbox` is windmod Listbox's marker pair and nothing else emits it, which is the only
  // structural discriminator jest has — the css-module proxy makes every module's `root` one string.
  it('renders windmod Listbox as the surface, with the resolved slot intact', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { listbox } = renderCombo({ open: true });

    expect(listbox).not.toBeNull();
    expect(listbox).toHaveClass('fui-listbox');
    expect(listbox).toHaveClass('group/fui-listbox');
    expect(listbox).toHaveClass(styles.listbox);
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();

    const base = useComboboxSpy.mock.results.at(-1)!.value as ComboboxState;
    const styled = renderSpy.mock.calls.at(-1)![0] as ComboboxState;

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
  // through the Combobox's listbox shorthand — which is what lets a VR scene hold six open
  // surfaces at once, `popover: 'auto'` being mutually exclusive.
  it('lets a consumer override the surface popover mode through the listbox slot', () => {
    expect(renderCombo({ open: true }).listbox!.getAttribute('popover')).toBe('auto');
    expect(renderCombo({ open: true, listbox: { popover: 'manual' } }).listbox!.getAttribute('popover')).toBe('manual');
  });

  // T-10. jsdom drops the inline `width: anchor-size(width)` that matchTargetSize writes, so the
  // width restoration is proved by the c11 browser probe and the combobox-width VR scenes; the other
  // five defaults leave traces jsdom keeps.
  it('restores Griffel positioning defaults the headless layer drops', () => {
    const { listbox } = renderCombo({ open: true });
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
    const restored = read(renderCombo({ open: true }).listbox!);
    const overridden = read(renderCombo({ open: true, positioning }).listbox!);

    expect(overridden).not.toBe(restored);
  });

  it('keeps the restored defaults a consumer did not override', () => {
    const { listbox } = renderCombo({ open: true, positioning: { offset: { crossAxis: 0, mainAxis: 24 } } });

    expect(listbox!.getAttribute('data-placement')).toBe('below-start');
    expect(listbox!.getAttribute('style')).toContain('margin-block-start: 24px');
  });

  it('passes the value machinery through untouched', () => {
    const { input } = renderCombo({ defaultValue: 'One' });

    expect(input.value).toBe('One');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(renderCombo({ placeholder: 'Pick one' }).root.getAttribute('data-placeholder')).toBe('');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root, input } = renderCombo({ root: { className: 'consumer' } });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(input).not.toHaveClass('consumer');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled-darker',
      clearIcon: { className: 'clear' },
      expandIcon: { className: 'expand' },
      input: { 'aria-invalid': true, className: 'native', disabled: false },
      listbox: { className: 'surface' },
      root: { className: 'consumer' },
      showClearIcon: true,
      size: 'large',
    } as unknown as ComboboxState;

    const styled = useComboboxStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.input).not.toBe(state.input);
    expect(styled.listbox).not.toBe(state.listbox);
    expect(styled.expandIcon).not.toBe(state.expandIcon);
    expect(styled.clearIcon).not.toBe(state.clearIcon);

    expect(state.root.className).toBe('consumer');
    expect(state.input.className).toBe('native');
    expect(state.listbox!.className).toBe('surface');
    expect('data-size' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.input.className).toContain('native');
    expect(styled.listbox!.className).toContain('surface');
    expect(styled.expandIcon!.className).toContain('expand');
    expect(styled.clearIcon!.className).toContain('clear');
  });
});
