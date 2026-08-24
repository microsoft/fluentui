import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SwatchPicker as HeadlessSwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';

import { isConformant } from '../../../testing/isConformant';
import { SwatchPicker } from '../SwatchPicker';
import { ColorSwatch } from './ColorSwatch';
import type { ColorSwatchState } from './ColorSwatch.types';
import { colorSwatchClassNames, useColorSwatchStyles } from './useColorSwatchStyles';

import styles from './ColorSwatch.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/swatch-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/swatch-picker');
  const { deepFreezeState } = require('../../../testing/freezeState');

  return {
    ...actual,
    useColorSwatch: (...args: Parameters<typeof actual.useColorSwatch>) =>
      deepFreezeState(actual.useColorSwatch(...args)),
  };
});

const sizes = ['extra-small', 'small', 'medium', 'large'] as const;
const shapes = ['rounded', 'square', 'circular'] as const;

const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('ColorSwatch', () => {
  isConformant({
    Component: ColorSwatch,
    displayName: 'ColorSwatch',
    requiredProps: { value: 'a', color: '#f00' },
  });

  it('stamps its marker pair and module class, slash-free first', () => {
    const { getByTestId } = render(<ColorSwatch data-testid="root" value="a" color="#f00" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-color-swatch');
    expect(root).toHaveClass('group/fui-color-swatch');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-color-swatch');
    expect(colorSwatchClassNames.root).toBe('fui-color-swatch group/fui-color-swatch');
  });

  it('stamps its own resolved size and shape, defaulting to medium and square', () => {
    const { getByTestId } = render(
      <>
        <ColorSwatch data-testid="default" value="a" color="#f00" />
        {sizes.map(size => (
          <ColorSwatch key={size} data-testid={`size-${size}`} size={size} value="a" color="#f00" />
        ))}
        {shapes.map(shape => (
          <ColorSwatch key={shape} data-testid={`shape-${shape}`} shape={shape} value="a" color="#f00" />
        ))}
      </>,
    );

    expect(getByTestId('default').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('default').getAttribute('data-shape')).toBe('square');

    for (const size of sizes) {
      expect(getByTestId(`size-${size}`).getAttribute('data-size')).toBe(size);
    }

    for (const shape of shapes) {
      expect(getByTestId(`shape-${shape}`).getAttribute('data-shape')).toBe(shape);
    }
  });

  it('lets its own size and shape beat the picker', () => {
    const { getByTestId } = render(
      <SwatchPicker size="large" shape="circular">
        <ColorSwatch data-testid="inherit" value="a" color="#f00" />
        <ColorSwatch data-testid="override" value="b" color="#0f0" size="small" shape="rounded" />
      </SwatchPicker>,
    );

    expect(getByTestId('inherit').getAttribute('data-size')).toBe('large');
    expect(getByTestId('inherit').getAttribute('data-shape')).toBe('circular');
    expect(getByTestId('override').getAttribute('data-size')).toBe('small');
    expect(getByTestId('override').getAttribute('data-shape')).toBe('rounded');
  });

  it('falls back to medium and square inside a headless picker, which publishes neither', () => {
    // Standalone, the context's own default value already supplies both; the `?? 'medium'` and
    // `?? 'square'` guards are reachable only here, where a provider IS present but publishes
    // undefined for all three look props.
    const { getByTestId } = render(
      <HeadlessSwatchPicker>
        <ColorSwatch data-testid="root" value="a" color="#f00" />
      </HeadlessSwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-size')).toBe('medium');
    expect(getByTestId('root').getAttribute('data-shape')).toBe('square');
  });

  it('restores the default glyph on a disabled swatch and on nothing else', () => {
    const { getByTestId } = render(
      <>
        <ColorSwatch data-testid="disabled" value="a" color="#f00" disabled />
        <ColorSwatch data-testid="enabled" value="b" color="#0f0" />
      </>,
    );

    const disabled = getByTestId('disabled');
    const span = disabled.querySelector('span');

    expect(span).not.toBeNull();
    expect(span!.querySelectorAll('svg')).toHaveLength(1);
    expect(getByTestId('enabled').querySelector('span')).toBeNull();
    expect(getByTestId('enabled').querySelector('svg')).toBeNull();
  });

  it('resolves the glyph seam edge inputs', () => {
    const { getByTestId } = render(
      <>
        {/* Griffel blanks this one; the uniform post-hook rule restores the glyph instead. */}
        <ColorSwatch data-testid="children-null" value="a" color="#f00" disabled disabledIcon={{ children: null }} />
        <ColorSwatch data-testid="slot-null" value="b" color="#0f0" disabled disabledIcon={null} />
        <ColorSwatch
          data-testid="consumer"
          value="c"
          color="#00f"
          disabled
          disabledIcon={{ children: <b data-testid="consumer-glyph" /> }}
        />
        <ColorSwatch data-testid="empty-obj" value="d" color="#ff0" disabled disabledIcon={{}} />
      </>,
    );

    expect(getByTestId('children-null').querySelectorAll('svg')).toHaveLength(1);
    expect(getByTestId('slot-null').querySelector('span')).toBeNull();
    expect(getByTestId('consumer').querySelector('svg')).toBeNull();
    expect(getByTestId('consumer').querySelector('b')).not.toBeNull();
    expect(getByTestId('empty-obj').querySelectorAll('svg')).toHaveLength(1);
  });

  it('builds the disabledIcon slot with the element type the render function expects', () => {
    // The slot is materialised before the headless hook runs, so its elementType has to agree
    // with the hook's own components.disabledIcon. A disagreement is DOM-invisible — the render
    // function reads components — and assertSlots only warns, so nothing else would catch it.
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);

    try {
      render(<ColorSwatch data-testid="root" value="a" color="#f00" disabled />);

      expect(warn.mock.calls.flat().join('\n')).not.toContain('assertSlots');
    } finally {
      warn.mockRestore();
    }
  });

  it('decorates the icon and disabledIcon slots', () => {
    const { getByTestId } = render(
      <>
        <ColorSwatch data-testid="icon" value="a" color="#f00" icon={{ children: 'x', className: 'consumer-icon' }} />
        <ColorSwatch data-testid="disabled" value="b" color="#0f0" disabled disabledIcon={{ className: 'consumer' }} />
      </>,
    );

    // fuicm-icon is shared by four shipped components under jest, so the disabledIcon slot is
    // identified by the unique fuicm-disabled-icon ident and its element position.
    const disabledIcon = getByTestId('disabled').querySelector('span')!;

    expect(disabledIcon).toHaveClass(styles.disabledIcon);
    expect(disabledIcon).toHaveClass(styles.icon);
    expect(disabledIcon).toHaveClass('consumer');

    const icon = getByTestId('icon').querySelector('span')!;

    expect(icon).toHaveClass(styles.icon);
    expect(icon).not.toHaveClass(styles.disabledIcon);
    expect(icon).toHaveClass('consumer-icon');
  });

  it('leaves the per-instance inline style exactly as the headless hook wrote it', () => {
    const { getByTestId } = render(
      <ColorSwatch data-testid="root" value="a" color="#f00" borderColor="#0f0" style={{ margin: '2px' }} />,
    );

    const root = getByTestId('root');

    // Declaration ORDER is the assertion: the headless custom properties come first and the
    // consumer's own style last. Anything the windmod layer wrote, or a re-ordered spread,
    // changes this string. Whitespace is jsdom's serialization, not the component's.
    expect(root.getAttribute('style')!.replace(/\s+/g, '').replace(/;$/, '')).toBe(
      '--fui-SwatchPicker--color:#f00;--fui-SwatchPicker--borderColor:#0f0;margin:2px',
    );
  });

  it('keeps the headless selection stamps and button contract', () => {
    const { getByTestId } = render(
      <SwatchPicker defaultSelectedValue="a">
        <ColorSwatch data-testid="a" value="a" color="#f00" />
        <ColorSwatch data-testid="b" value="b" color="#0f0" disabled />
      </SwatchPicker>,
    );

    const selected = getByTestId('a');

    expect(selected.tagName).toBe('BUTTON');
    expect(selected.getAttribute('type')).toBe('button');
    expect(selected.getAttribute('role')).toBe('radio');
    // The headless package spells its own stamps as presence attributes; windmod adds none of
    // its own here and duplicates none of these.
    expect(selected.getAttribute('data-selected')).toBe('');

    const disabled = getByTestId('b');

    expect(disabled.getAttribute('data-disabled')).toBe('');
    expect(disabled).toBeDisabled();
  });

  it('does not fire a selection change from a disabled swatch', () => {
    const onSelectionChange = jest.fn();
    const { getByTestId } = render(
      <SwatchPicker onSelectionChange={onSelectionChange}>
        <ColorSwatch data-testid="a" value="a" color="#f00" disabled />
      </SwatchPicker>,
    );

    fireEvent.click(getByTestId('a'));

    expect(onSelectionChange).not.toHaveBeenCalled();
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLButtonElement>();
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ColorSwatch
        ref={ref}
        data-testid="root"
        value="a"
        color="#f00"
        id="cs"
        aria-label="red"
        className="consumer"
        onClick={onClick}
      />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('cs');
    expect(root.getAttribute('aria-label')).toBe('red');
    expect(root).toHaveClass('consumer');

    fireEvent.click(root);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'button', icon: 'span', disabledIcon: 'span' },
      root: { className: 'consumer' },
      icon: { className: 'consumer-icon' },
      disabledIcon: { className: 'consumer-disabled' },
      size: 'large',
      shape: 'circular',
    } as unknown as ColorSwatchState;

    const styled = useColorSwatchStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-size');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(state.disabledIcon!.className).toBe('consumer-disabled');
    expect(stampsOf(styled.root)['data-size']).toBe('large');
    expect(stampsOf(styled.root)['data-shape']).toBe('circular');
    expect(styled.icon!.className).toContain('consumer-icon');
    expect(styled.disabledIcon!.className).toContain('consumer-disabled');
  });

  it('leaves suppressed slots undefined', () => {
    const state = {
      components: { root: 'button', icon: 'span', disabledIcon: 'span' },
      root: {},
      size: 'medium',
      shape: 'square',
    } as unknown as ColorSwatchState;

    const styled = useColorSwatchStyles(state);

    expect(styled.icon).toBeUndefined();
    expect(styled.disabledIcon).toBeUndefined();
  });
});
