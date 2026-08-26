import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { useSwatchPickerContextValue } from '@fluentui/react-headless-components-preview/swatch-picker';

import { isConformant } from '../../testing/isConformant';
import { stampsOf } from '../../testing/stampsOf';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { EmptySwatch } from '../EmptySwatch/EmptySwatch';
import { ImageSwatch } from '../ImageSwatch/ImageSwatch';
import { SwatchPicker } from './SwatchPicker';
import { SwatchPickerRow } from '../SwatchPickerRow/SwatchPickerRow';
import type { SwatchPickerState } from './SwatchPicker.types';
import { swatchPickerClassNames, useSwatchPickerStyles } from './useSwatchPickerStyles';

import styles from './SwatchPicker.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/swatch-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/swatch-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSwatchPicker: (...args: Parameters<typeof actual.useSwatchPicker>) =>
      deepFreezeState(actual.useSwatchPicker(...args)),
  };
});

const spacings = ['small', 'medium'] as const;

// Reads the context the picker publishes, which is the only place the difference between
// "shape left undefined" and "shape defaulted to square" is observable — every swatch resolves
// square for itself either way.
const ContextProbe = ({ testId }: { testId: string }): React.ReactElement => {
  const size = useSwatchPickerContextValue(ctx => ctx.size);
  const shape = useSwatchPickerContextValue(ctx => ctx.shape);
  const spacing = useSwatchPickerContextValue(ctx => ctx.spacing);

  return <i data-testid={testId} data-ctx={JSON.stringify({ size, shape, spacing })} />;
};

describe('SwatchPicker', () => {
  isConformant({
    Component: SwatchPicker,
    displayName: 'SwatchPicker',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<SwatchPicker data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-swatch-picker');
    expect(root).toHaveClass('group/fui-swatch-picker');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-swatch-picker');
    expect(swatchPickerClassNames.root).toBe('fui-swatch-picker group/fui-swatch-picker');
  });

  it('stamps its own resolved spacing, defaulting to medium', () => {
    const { getByTestId } = render(
      <>
        <SwatchPicker data-testid="default" />
        {spacings.map(spacing => (
          <SwatchPicker key={spacing} data-testid={spacing} spacing={spacing} />
        ))}
      </>,
    );

    expect(getByTestId('default').getAttribute('data-spacing')).toBe('medium');

    for (const spacing of spacings) {
      expect(getByTestId(spacing).getAttribute('data-spacing')).toBe(spacing);
    }
  });

  it('publishes size and shape to the swatches through the swatchPicker context', () => {
    const { getByTestId } = render(
      <SwatchPicker size="large" shape="circular">
        <ColorSwatch data-testid="color" value="a" color="#f00" />
        <ImageSwatch data-testid="image" value="b" src="x.png" />
        <EmptySwatch data-testid="empty" />
      </SwatchPicker>,
    );

    for (const id of ['color', 'image', 'empty']) {
      expect(getByTestId(id).getAttribute('data-size')).toBe('large');
      expect(getByTestId(id).getAttribute('data-shape')).toBe('circular');
    }
  });

  it('publishes spacing to a row through the swatchPicker context', () => {
    const { getByTestId } = render(
      <>
        <SwatchPicker layout="grid" spacing="small">
          <SwatchPickerRow data-testid="small" />
        </SwatchPicker>
        <SwatchPicker layout="grid">
          <SwatchPickerRow data-testid="default" />
        </SwatchPicker>
      </>,
    );

    expect(getByTestId('small').getAttribute('data-spacing')).toBe('small');
    expect(getByTestId('default').getAttribute('data-spacing')).toBe('medium');
  });

  it('leaves the picker shape undefined by default, so each swatch resolves square itself', () => {
    const { getByTestId } = render(
      <SwatchPicker size="large">
        <ColorSwatch data-testid="color" value="a" color="#f00" />
      </SwatchPicker>,
    );

    // A defaulted shape on the picker would be a context-visible divergence from Griffel; the
    // swatch's own square fallback is what must produce this value.
    expect(getByTestId('color').getAttribute('data-shape')).toBe('square');
    expect(getByTestId('color').getAttribute('data-size')).toBe('large');
  });

  it('publishes shape as undefined, and size and spacing as resolved values', () => {
    const { getByTestId } = render(
      <>
        <SwatchPicker>
          <ContextProbe testId="defaults" />
        </SwatchPicker>
        <SwatchPicker size="large" shape="circular" spacing="small">
          <ContextProbe testId="explicit" />
        </SwatchPicker>
      </>,
    );

    expect(JSON.parse(getByTestId('defaults').getAttribute('data-ctx')!)).toEqual({
      size: 'medium',
      spacing: 'medium',
    });
    expect(JSON.parse(getByTestId('explicit').getAttribute('data-ctx')!)).toEqual({
      size: 'large',
      shape: 'circular',
      spacing: 'small',
    });
  });

  it('keeps the headless layout stamps and roles', () => {
    const { getByTestId } = render(
      <>
        <SwatchPicker data-testid="row" />
        <SwatchPicker data-testid="grid" layout="grid">
          <SwatchPickerRow data-testid="gridrow" />
        </SwatchPicker>
      </>,
    );

    const row = getByTestId('row');

    expect(row.getAttribute('data-layout')).toBe('row');
    expect(row.getAttribute('role')).toBe('radiogroup');
    expect(row.getAttribute('focusgroup')).toBe('radiogroup');

    const grid = getByTestId('grid');

    expect(grid.getAttribute('data-layout')).toBe('grid');
    expect(grid.getAttribute('role')).toBe('grid');
    expect(grid.getAttribute('focusgroup')).toBe('grid manual rowflow');
    expect(getByTestId('gridrow').getAttribute('focusgrouprow')).toBe('');
    expect(getByTestId('gridrow').getAttribute('role')).toBe('row');
  });

  it('selects on mount from defaultSelectedValue and moves selection on click', () => {
    const onSelectionChange = jest.fn();
    const { getByTestId } = render(
      <SwatchPicker defaultSelectedValue="a" onSelectionChange={onSelectionChange}>
        <ColorSwatch data-testid="a" value="a" color="#f00" />
        <ColorSwatch data-testid="b" value="b" color="#0f0" />
      </SwatchPicker>,
    );

    expect(getByTestId('a').getAttribute('aria-checked')).toBe('true');
    expect(getByTestId('b').getAttribute('aria-checked')).toBe('false');

    fireEvent.click(getByTestId('b'));

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(onSelectionChange.mock.calls[0][1]).toMatchObject({ selectedValue: 'b', selectedSwatch: '#0f0' });
    expect(getByTestId('b').getAttribute('aria-checked')).toBe('true');
    expect(getByTestId('a').getAttribute('aria-checked')).toBe('false');
  });

  it('does not self-toggle a controlled selectedValue', () => {
    const onSelectionChange = jest.fn();
    const { getByTestId } = render(
      <SwatchPicker selectedValue="a" onSelectionChange={onSelectionChange}>
        <ColorSwatch data-testid="a" value="a" color="#f00" />
        <ColorSwatch data-testid="b" value="b" color="#0f0" />
      </SwatchPicker>,
    );

    fireEvent.click(getByTestId('b'));

    expect(onSelectionChange).toHaveBeenCalledTimes(1);
    expect(getByTestId('a').getAttribute('aria-checked')).toBe('true');
    expect(getByTestId('b').getAttribute('aria-checked')).toBe('false');
  });

  it('swaps the swatch roles and selection attribute in grid layout', () => {
    const { getByTestId } = render(
      <SwatchPicker layout="grid" defaultSelectedValue="a">
        <SwatchPickerRow>
          <ColorSwatch data-testid="a" value="a" color="#f00" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );

    const swatch = getByTestId('a');

    expect(swatch.getAttribute('role')).toBe('gridcell');
    expect(swatch.getAttribute('aria-selected')).toBe('true');
    expect(swatch.getAttribute('aria-checked')).toBeNull();
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <SwatchPicker
        ref={ref}
        data-testid="root"
        id="sp"
        aria-label="picker"
        className="consumer"
        style={{ margin: 2 }}
      />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('sp');
    expect(root.getAttribute('aria-label')).toBe('picker');
    expect(root).toHaveClass('consumer');
    // The shared base hook drops the consumer's `style` on this root, on both libraries. The
    // windmod layer neither reinstates it nor writes a style of its own, so parity is exact.
    expect(root.getAttribute('style')).toBeNull();
  });

  it('changes nothing but the root slot, which is what the context values may not depend on', () => {
    const state = {
      components: { root: 'div' },
      root: { className: 'consumer' },
      isGrid: false,
      selectedValue: 'a',
      requestSelectionChange: () => undefined,
      spacing: 'small',
      size: 'large',
      shape: 'circular',
    } as unknown as SwatchPickerState;

    const styled = useSwatchPickerStyles(state);
    const changed = (Object.keys(styled) as (keyof SwatchPickerState)[]).filter(key => styled[key] !== state[key]);

    // useSwatchPickerContextValues reads isGrid/size/shape/spacing/selectedValue/
    // requestSelectionChange. As long as `root` is the only key this hook rewrites, the context
    // sees the same values before and after styling. Anything else here breaks that.
    expect(changed).toEqual(['root']);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { className: 'consumer' },
      spacing: 'small',
      size: 'large',
      shape: 'circular',
    } as unknown as SwatchPickerState;

    const styled = useSwatchPickerStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-spacing');
    expect(stampsOf(styled.root)['data-spacing']).toBe('small');
    expect(styled.root.className).toContain('consumer');
    expect(styled.size).toBe('large');
    expect(styled.shape).toBe('circular');
  });
});
