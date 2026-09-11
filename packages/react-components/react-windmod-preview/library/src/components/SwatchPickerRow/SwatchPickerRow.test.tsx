import * as React from 'react';
import { render } from '@testing-library/react';

import { SwatchPicker as HeadlessSwatchPicker } from '@fluentui/react-headless-components-preview/swatch-picker';

import { isConformant } from '../../testing/isConformant';
import { ColorSwatch } from '../ColorSwatch/ColorSwatch';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { SwatchPickerRow } from './SwatchPickerRow';
import type { SwatchPickerRowState } from './SwatchPickerRow.types';
import { swatchPickerRowClassNames, useSwatchPickerRowStyles } from './useSwatchPickerRowStyles';

import styles from './SwatchPickerRow.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/swatch-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/swatch-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useSwatchPickerRow: (...args: Parameters<typeof actual.useSwatchPickerRow>) =>
      deepFreezeState(actual.useSwatchPickerRow(...args)),
  };
});

const stampsOf = (root: object): Record<string, string | undefined> => root as Record<string, string | undefined>;

describe('SwatchPickerRow', () => {
  isConformant({
    Component: SwatchPickerRow,
    displayName: 'SwatchPickerRow',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<SwatchPickerRow data-testid="root" />);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-swatch-picker-row');
    expect(root).toHaveClass('group/fui-swatch-picker-row');
    expect(root).toHaveClass(styles.root);
    expect(root.classList[0]).toBe('fui-swatch-picker-row');
    expect(swatchPickerRowClassNames.root).toBe('fui-swatch-picker-row group/fui-swatch-picker-row');
  });

  it('stamps the spacing it reads from the picker, falling back to medium standalone', () => {
    const { getByTestId } = render(
      <>
        <SwatchPickerRow data-testid="standalone" />
        <SwatchPicker layout="grid" spacing="small">
          <SwatchPickerRow data-testid="small" />
        </SwatchPicker>
        <SwatchPicker layout="grid" spacing="medium">
          <SwatchPickerRow data-testid="medium" />
        </SwatchPicker>
      </>,
    );

    expect(getByTestId('standalone').getAttribute('data-spacing')).toBe('medium');
    expect(getByTestId('small').getAttribute('data-spacing')).toBe('small');
    expect(getByTestId('medium').getAttribute('data-spacing')).toBe('medium');
  });

  it('falls back to medium inside a headless picker, which publishes no spacing', () => {
    // Standalone, the context's own default value already supplies medium; the `?? 'medium'`
    // guard is reachable only here, where a provider IS present but publishes undefined.
    const { getByTestId } = render(
      <HeadlessSwatchPicker layout="grid">
        <SwatchPickerRow data-testid="root" />
      </HeadlessSwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-spacing')).toBe('medium');
  });

  it('takes no spacing prop of its own', () => {
    const { getByTestId } = render(
      <SwatchPicker layout="grid" spacing="small">
        {/* @ts-expect-error SwatchPickerRow takes no spacing prop — it reads the context */}
        <SwatchPickerRow data-testid="root" spacing="medium" />
      </SwatchPicker>,
    );

    expect(getByTestId('root').getAttribute('data-spacing')).toBe('small');
  });

  it('keeps the headless row contract and nests its swatches', () => {
    const { getByTestId } = render(
      <SwatchPicker layout="grid">
        <SwatchPickerRow data-testid="row">
          <ColorSwatch data-testid="swatch" value="a" color="#f00" />
        </SwatchPickerRow>
      </SwatchPicker>,
    );

    const row = getByTestId('row');

    expect(row.getAttribute('role')).toBe('row');
    expect(row.getAttribute('focusgrouprow')).toBe('');
    expect(row.contains(getByTestId('swatch'))).toBe(true);
  });

  it('passes consumer props through to the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <SwatchPickerRow
        ref={ref}
        data-testid="root"
        id="spr"
        aria-label="row"
        className="consumer"
        style={{ margin: 2 }}
      />,
    );

    const root = getByTestId('root');

    expect(ref.current).toBe(root);
    expect(root.id).toBe('spr');
    expect(root.getAttribute('aria-label')).toBe('row');
    expect(root).toHaveClass('consumer');
    // The shared base hook drops the consumer's `style` on this root, on both libraries. The
    // windmod layer neither reinstates it nor writes a style of its own, so parity is exact.
    expect(root.getAttribute('style')).toBeNull();
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      root: { className: 'consumer' },
      spacing: 'small',
    } as unknown as SwatchPickerRowState;

    const styled = useSwatchPickerRowStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-spacing');
    expect(stampsOf(styled.root)['data-spacing']).toBe('small');
    expect(styled.root.className).toContain('consumer');
  });
});
