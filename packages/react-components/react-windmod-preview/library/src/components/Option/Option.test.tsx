import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Listbox } from '../Listbox/Listbox';
import { Option } from './Option';
import type { OptionProps, OptionState } from './Option.types';
import { optionClassNames, useOptionStyles } from './useOptionStyles';

import styles from './Option.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/combobox', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/combobox');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useOption: (...args: Parameters<typeof actual.useOption>) => deepFreezeState(actual.useOption(...args)),
  };
});

const CONSUMER = <span data-consumer="">C</span>;

/** The 8-input matrix every D1 consumer re-baselines (CONTEXT.md, GLYPH RULE). */
const INPUTS: ReadonlyArray<readonly [string, OptionProps['checkIcon']]> = [
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

type Mode = { multiselect?: boolean; selectedOptions?: string[] };

const SINGLE: Mode = {};
const MULTI_UNSELECTED: Mode = { multiselect: true };
const MULTI_SELECTED: Mode = { multiselect: true, selectedOptions: ['a'] };

// OptionProps is a union (text + children, or string children); Partial distributes over it, so a
// bare override object type-checks while the JSX site below still supplies the string children.
const renderOption = (mode: Mode, props: Partial<OptionProps> = {}) => {
  const { container } = render(
    <Listbox {...mode}>
      <Option value="a" {...props}>
        One
      </Option>
    </Listbox>,
  );

  // The jest css-module proxy drops the component segment, so Option's `root` and Listbox's `root`
  // are the same string; the option is reached by its marker class, which is component-scoped.
  return {
    root: container.querySelector<HTMLElement>('.fui-option'),
    checkIcon: container.querySelector<HTMLElement>(`.${styles.checkIcon}`),
  };
};

const glyphOf = (checkIcon: HTMLElement | null) => {
  const svg = checkIcon?.querySelector('svg') ?? null;

  return { viewBox: svg?.getAttribute('viewBox') ?? null, text: checkIcon?.textContent ?? null };
};

describe('Option', () => {
  isConformant({
    Component: Option,
    displayName: 'Option',
    requiredProps: { value: 'a', children: 'One' } as OptionProps,
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderOption(SINGLE);

    expect(root).toHaveClass('fui-option');
    expect(root).toHaveClass('group/fui-option');
    expect(root!.classList[0]).toBe('fui-option');
    expect(optionClassNames.root).toBe('fui-option group/fui-option');
  });

  it('applies one module class per slot', () => {
    const { root, checkIcon } = renderOption(SINGLE);

    expect(root).toHaveClass(styles.root);
    expect(checkIcon).toHaveClass(styles.checkIcon);
    expect(checkIcon).not.toHaveClass(styles.root);
  });

  it('emits the check indicator before the row content', () => {
    const { root, checkIcon } = renderOption(SINGLE);

    expect(root!.firstElementChild).toBe(checkIcon);
  });

  // T-12: the headless hook owns these; a windmod re-stamp would be a duplicate.
  it('leaves the headless selection stamps alone', () => {
    expect(renderOption(SINGLE).root!.getAttribute('data-selected')).toBeNull();
    expect(renderOption(MULTI_UNSELECTED).root!.getAttribute('data-multiselect')).toBe('');
    expect(renderOption(MULTI_SELECTED).root!.getAttribute('data-selected')).toBe('');
    expect(renderOption(SINGLE, { disabled: true }).root!.getAttribute('data-disabled')).toBe('');
    expect(renderOption(SINGLE).root!.hasAttribute('data-disabled')).toBe(false);

    const state = { root: {}, checkIcon: {} } as unknown as OptionState;

    expect(Object.keys(useOptionStyles(state).root)).toEqual(['className']);
  });

  it('switches role and selection attribute with the listbox mode', () => {
    expect(renderOption(SINGLE).root!.getAttribute('role')).toBe('option');
    expect(renderOption(MULTI_SELECTED).root!.getAttribute('role')).toBe('menuitemcheckbox');
    expect(renderOption(MULTI_SELECTED).root!.getAttribute('aria-checked')).toBe('true');
  });

  // T-7, slot-scoped, with a glyph-identity column: Griffel's three states emit three different
  // glyphs (CheckmarkFilled / nothing / Checkmark12Filled), and only viewBox distinguishes the two
  // that are SVGs — comparing SVG-stripped markup would not catch a swap. Expectations are the
  // Griffel output recorded by combobox-probe/out/c2-glyph-seam.json, per slot.
  describe.each([
    ['single-select', SINGLE, { viewBox: '0 0 20 20' }],
    ['multiselect, unselected', MULTI_UNSELECTED, { viewBox: null }],
    ['multiselect, selected', MULTI_SELECTED, { viewBox: '0 0 12 12' }],
  ] as const)('checkIcon D1 matrix — %s', (_name, mode, fallback) => {
    it.each(INPUTS.map(([label]) => label))('reproduces Griffel for %s', label => {
      const value = INPUTS.find(([name]) => name === label)![1];
      const { checkIcon } = renderOption(mode, { checkIcon: value });

      if (label === 'null') {
        expect(checkIcon).toBeNull();

        return;
      }

      expect(checkIcon).not.toBeNull();
      expect(checkIcon!.getAttribute('aria-hidden')).toBe('true');

      const glyph = glyphOf(checkIcon);

      if (FALLBACK_INPUTS.includes(label)) {
        expect(glyph.viewBox).toBe(fallback.viewBox);
        // The multiselect-unselected fallback is the EMPTY STRING, so the element stays empty.
        expect(glyph.text).toBe('');

        return;
      }

      if (label === "shorthand ''") {
        expect(glyph.viewBox).toBeNull();
        expect(glyph.text).toBe('');

        return;
      }

      expect(checkIcon!.querySelector('[data-consumer]')).not.toBeNull();
      expect(glyph.viewBox).toBeNull();
    });
  });

  it('keeps the resolved slot props of a checkIcon shorthand', () => {
    const { checkIcon } = renderOption(SINGLE, { checkIcon: { className: 'x', id: 'check' } });

    expect(checkIcon).toHaveClass(styles.checkIcon);
    expect(checkIcon).toHaveClass('x');
    expect(checkIcon!.id).toBe('check');
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderOption(SINGLE, { className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root!
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      checkIcon: { className: 'check' },
      root: { className: 'consumer' },
    } as unknown as OptionState;

    const styled = useOptionStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.checkIcon).not.toBe(state.checkIcon);
    expect(state.root.className).toBe('consumer');
    expect(state.checkIcon!.className).toBe('check');
    expect(styled.root.className).toContain('consumer');
    expect(styled.checkIcon!.className).toContain('check');
    expect(styled.checkIcon!.className).toContain(styles.checkIcon);
  });
});
