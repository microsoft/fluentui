import * as React from 'react';
import { render } from '@testing-library/react';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import { isConformant } from '../../testing/isConformant';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerList } from '../TagPickerList';
import { TagPickerControl } from './TagPickerControl';
import type { TagPickerControlProps, TagPickerControlState } from './TagPickerControl.types';
import { tagPickerControlClassNames, useTagPickerControlStyles } from './useTagPickerControlStyles';

import styles from './TagPickerControl.module.css';

// The real hook is kept; the frozen return is the mutation guard — see testing/freezeState.ts. This
// component is the family's only glyph-rule consumer, so the freeze sits on the hook whose return
// the rule spreads.
jest.mock('@fluentui/react-headless-components-preview/tag-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tag-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTagPickerControl: jest.fn((...args: Parameters<typeof actual.useTagPickerControl>) =>
      deepFreezeState(actual.useTagPickerControl(...args)),
    ),
  };
});

const appearances = ['outline', 'underline', 'filled-lighter', 'filled-darker'] as const;
const sizes = ['medium', 'large', 'extra-large'] as const;

const CONSUMER = <span data-consumer="">C</span>;

/** The 8-input matrix every glyph-rule consumer re-baselines. */
const INPUTS: ReadonlyArray<readonly [string, TagPickerControlProps['expandIcon']]> = [
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

// A TagPicker with ONE child treats that child as the popover, so the trigger half needs a second
// child to exist at all — except under noPopover, where the single child IS the trigger.
const renderControl = (picker: Partial<TagPickerProps> = {}, control: TagPickerControlProps = {}) => {
  const trigger = (
    <TagPickerControl {...control}>
      <TagPickerInput aria-label="Pick" />
    </TagPickerControl>
  );
  const { container } = render(
    <TagPicker {...(picker as TagPickerProps)}>
      {trigger}
      {picker.noPopover ? undefined : <TagPickerList />}
    </TagPicker>,
  );
  const root = container.querySelector<HTMLElement>('.fui-tag-picker-control')!;

  return {
    root,
    aside: root.querySelector<HTMLElement>(`span.${styles.aside}`),
    expandIcon: root.querySelector<HTMLElement>(`span.${styles.expandIcon}`),
    secondaryAction: root.querySelector<HTMLElement>(`span.${styles.secondaryAction}`),
  };
};

const pathOf = (host: Element | null): string | null => host?.querySelector('svg path')?.getAttribute('d') ?? null;

const glyphPath = (icon: React.ReactElement): string | null => pathOf(render(icon).container);

describe('TagPickerControl', () => {
  isConformant({
    Component: TagPickerControl,
    displayName: 'TagPickerControl',
  });

  // T-1
  it('stamps the marker pair on the root', () => {
    const { root } = renderControl();

    expect(root.classList[0]).toBe('fui-tag-picker-control');
    expect(root).toHaveClass('group/fui-tag-picker-control');
    expect(tagPickerControlClassNames.root).toBe('fui-tag-picker-control group/fui-tag-picker-control');
  });

  // T-2, M2, M3. The picker scale, on the control root, and on nothing else in this subtree.
  it('stamps the picker-scale data-size on the root alone', () => {
    sizes.forEach(size => {
      const { root, aside, expandIcon } = renderControl({ size });

      expect(root.getAttribute('data-size')).toBe(size);
      expect(aside!.hasAttribute('data-size')).toBe(false);
      expect(expandIcon!.hasAttribute('data-size')).toBe(false);
      expect(root.querySelector('input')!.hasAttribute('data-size')).toBe(false);
    });
  });

  it('adds only data-size of its own; disabled and invalid come from the headless hook', () => {
    const { root } = renderControl({ disabled: true });
    const names = Array.from(root.attributes)
      .map(attribute => attribute.name)
      .filter(name => name.startsWith('data-'))
      .sort();

    expect(names).toEqual(['data-disabled', 'data-size']);
    expect(root.getAttribute('data-disabled')).toBe('');
  });

  it('maps every appearance onto its own class set', () => {
    const expected: Record<(typeof appearances)[number], string[]> = {
      outline: [styles.outline, styles.outlineInteractive],
      underline: [styles.underline],
      'filled-lighter': [styles.filledLighter],
      'filled-darker': [styles.filledDarker],
    };
    const all = [
      styles.outline,
      styles.outlineInteractive,
      styles.underline,
      styles.filledLighter,
      styles.filledDarker,
    ];

    appearances.forEach(appearance => {
      const { root } = renderControl({ appearance });

      expected[appearance].forEach(className => expect(root).toHaveClass(className));
      all
        .filter(className => !expected[appearance].includes(className))
        .forEach(className => expect(root).not.toHaveClass(className));
    });
  });

  it('defaults to the outline appearance and drops only its interactive half when disabled', () => {
    expect(renderControl().root).toHaveClass(styles.outline);
    expect(renderControl().root).toHaveClass(styles.outlineInteractive);

    const { root } = renderControl({ disabled: true });

    expect(root).toHaveClass(styles.outline);
    expect(root).not.toHaveClass(styles.outlineInteractive);
    expect(root).toHaveClass(styles.disabled);
  });

  // T-3 / M4. The materialisation is gated on noPopover, so a noPopover picker grows no chevron and
  // — because the aside's own renderByDefault is Boolean(secondaryAction || expandIcon) — no aside.
  it('renders no expand icon and no aside under noPopover', () => {
    const { aside, expandIcon } = renderControl({ noPopover: true });

    expect(expandIcon).toBeNull();
    expect(aside).toBeNull();
  });

  it('still renders the aside under noPopover when a secondary action asks for one', () => {
    const { aside, expandIcon, secondaryAction } = renderControl(
      { noPopover: true },
      { secondaryAction: { children: 'more' } },
    );

    expect(aside).not.toBeNull();
    expect(secondaryAction).not.toBeNull();
    expect(expandIcon).toBeNull();
  });

  // T-3, T-4 / M4b, M4c
  describe('expandIcon glyph matrix', () => {
    it.each(INPUTS.map(([label]) => label))('reproduces Griffel for %s', label => {
      const value = INPUTS.find(([name]) => name === label)![1];
      const { aside, expandIcon } = renderControl({}, { expandIcon: value });

      if (label === 'null') {
        // Slot-level null removes the slot outright, and with it the aside it was the only reason for.
        expect(expandIcon).toBeNull();
        expect(aside).toBeNull();

        return;
      }

      expect(expandIcon).not.toBeNull();

      if (FALLBACK_INPUTS.includes(label)) {
        expect(pathOf(expandIcon)).toBe(glyphPath(<ChevronDownRegular />));

        return;
      }

      if (label === "shorthand ''") {
        expect(expandIcon!.querySelector('svg')).toBeNull();
        expect(expandIcon!.textContent).toBe('');

        return;
      }

      expect(expandIcon!.querySelector('[data-consumer]')).not.toBeNull();
      expect(expandIcon!.querySelector('svg')).toBeNull();
    });

    it('draws the chevron, not some other glyph', () => {
      expect(pathOf(renderControl().expandIcon)).toBe(glyphPath(<ChevronDownRegular />));
      expect(pathOf(renderControl().expandIcon)).not.toBe(glyphPath(<DismissRegular />));
    });
  });

  it('applies one module class per slot', () => {
    const { root, aside, expandIcon, secondaryAction } = renderControl({}, { secondaryAction: { children: 'more' } });

    expect(root).toHaveClass(styles.root);
    expect(aside).toHaveClass(styles.aside);
    expect(expandIcon).toHaveClass(styles.expandIcon);
    expect(secondaryAction).toHaveClass(styles.secondaryAction);
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { root } = renderControl({}, { className: 'consumer' });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'filled-darker',
      aside: { className: 'aside' },
      disabled: false,
      expandIcon: { className: 'expand' },
      invalid: true,
      root: { className: 'consumer' },
      secondaryAction: { className: 'secondary' },
      size: 'large',
    } as unknown as TagPickerControlState;

    const styled = useTagPickerControlStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.aside).not.toBe(state.aside);
    expect(state.root.className).toBe('consumer');
    expect('data-size' in state.root).toBe(false);
    expect(styled.root.className).toContain('consumer');
    expect(styled.aside!.className).toContain('aside');
    expect(styled.expandIcon!.className).toContain('expand');
    expect(styled.secondaryAction!.className).toContain('secondary');
    expect(styled.root).toHaveProperty('data-size', 'large');
  });

  // The frozen headless return turns an in-place write anywhere in the glyph-rule pipeline into a
  // thrown TypeError. Every glyph-rule input is exercised: the pre-hook materialisation, the
  // post-hook restoration and the slot-removing branch each reach the state by a different path.
  it('applies the glyph rule to a frozen headless state without mutating it', () => {
    INPUTS.forEach(([, expandIcon]) => {
      expect(() => renderControl({}, { expandIcon })).not.toThrow();
    });

    expect(() => renderControl({ noPopover: true })).not.toThrow();
    expect(() => renderControl({ disabled: true, size: 'extra-large' })).not.toThrow();
  });
});
