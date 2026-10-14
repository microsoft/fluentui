import type { VegaLitePositionEncoding, VegaLiteSpec } from '../../components/VegaDeclarativeChart/VegaLiteTypes';

// Local fixture vocabulary: the shared, intentionally minimal Vega types are not changed by P2.
type Position = Omit<VegaLitePositionEncoding, 'scale'> & {
  scale?:
    | (NonNullable<VegaLitePositionEncoding['scale']> & {
        paddingInner?: number;
        paddingOuter?: number;
        clamp?: boolean;
      })
    | null;
};
type Fixture = Omit<VegaLiteSpec, 'mark' | 'encoding'> & {
  mark?:
    | string
    | {
        type: string;
        cornerRadiusEnd?: number;
        orient?: 'horizontal' | 'vertical';
        thickness?: number;
        width?: number;
        height?: number;
        size?: number;
        tooltip?: false | null;
        color?: string;
      };
  encoding?: Omit<NonNullable<VegaLiteSpec['encoding']>, 'x' | 'y' | 'xOffset'> & {
    x?: Position;
    y?: Position;
    xOffset?: Position;
    yOffset?: Position;
  };
};

export const rangedSpec = (spec: Fixture): VegaLiteSpec => spec as unknown as VegaLiteSpec;

export const groupedOffsetSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: 'bar',
  data: {
    values: [
      { category: 'A', slot: 'first', paletteColor: 'red', amount: 4 },
      { category: 'A', slot: 'second', paletteColor: 'red', amount: 8 },
      { category: 'B', slot: 'first', paletteColor: 'blue', amount: -4 },
      { category: 'B', slot: 'second', paletteColor: 'red', amount: 2 },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
    y: { field: 'amount', type: 'quantitative', scale: { domain: [-10, 10] } },
    xOffset: { field: 'slot', type: 'nominal' },
    color: { field: 'paletteColor', type: 'nominal', scale: { range: ['#c00', '#00c'] } },
  },
});

export const horizontalRangeSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: { type: 'bar', cornerRadiusEnd: 4 },
  data: {
    values: [
      { task: 'A', value: -8, baseline: -2 },
      { task: 'B', value: 8, baseline: 2 },
    ],
  },
  encoding: {
    x: { field: 'value', type: 'quantitative', scale: { domain: [-10, 10] } },
    x2: { field: 'baseline' },
    y: { field: 'task', type: 'ordinal', scale: { paddingInner: 0, paddingOuter: 0 } },
  },
});

export const rectangleRangeSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: 'rect',
  data: { values: [{ left: 8, right: 2, top: 6, bottom: -2 }] },
  encoding: {
    x: { field: 'left', type: 'quantitative', scale: { domain: [0, 10] } },
    x2: { field: 'right' },
    y: { field: 'top', type: 'quantitative', scale: { domain: [-10, 10] } },
    y2: { field: 'bottom' },
  },
});

export const numericOffsetSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: 'rect',
  data: { values: [{ left: 2, right: 6, top: 4, bottom: -4, dx: 5, dy: 10 }] },
  encoding: {
    x: { field: 'left', type: 'quantitative', scale: { domain: [0, 10] } },
    x2: { field: 'right' },
    y: { field: 'top', type: 'quantitative', scale: { domain: [-10, 10] } },
    y2: { field: 'bottom' },
    xOffset: { field: 'dx', type: 'quantitative', scale: null },
    yOffset: { field: 'dy', type: 'quantitative', scale: null },
  },
});

export const sameFieldCellSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: 'rect',
  data: {
    values: [
      { category: 'A', row: 'one' },
      { category: 'B', row: 'one' },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
    y: { field: 'row', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
    xOffset: { field: 'category', type: 'nominal' },
    yOffset: { field: 'row', type: 'nominal' },
  },
});

export const plainTickSpec = rangedSpec({
  width: 200,
  height: 100,
  mark: { type: 'tick', thickness: 2 },
  data: {
    values: [
      { category: 'A', amount: 4 },
      { category: 'B', amount: -4 },
    ],
  },
  encoding: {
    x: { field: 'amount', type: 'quantitative', scale: { domain: [-10, 10] } },
    y: { field: 'category', type: 'nominal', scale: { paddingInner: 0, paddingOuter: 0 } },
  },
});

export const roundedBarSpec = rangedSpec({
  ...plainTickSpec,
  mark: { type: 'bar', cornerRadiusEnd: 4 },
});
