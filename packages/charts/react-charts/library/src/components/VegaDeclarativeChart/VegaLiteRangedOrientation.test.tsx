import * as React from 'react';
import { render } from '@testing-library/react';
// Initialize the shipping barrel before the native chart/adapter modules.
import { VegaDeclarativeChart } from '../../index';
import { prepareVegaLiteSpec } from './VegaLiteDataTransforms';
import { canRenderVegaRangedSpec, getVegaRangedGeometry } from './VegaLiteRangedGeometry';
import type { VegaLiteSemanticMode, VegaLiteSpec } from './VegaLiteTypes';
import { horizontalRangeSpec, rangedSpec } from '../../testing/fixtures/ranged';

const binTransformSpec: VegaLiteSpec = require('./testing/specs/bin-transform.vl.json');

describe('ranged bar orientation', () => {
  it.each<VegaLiteSemanticMode>(['legacy', 'strict'])(
    'renders the real bin-transform counts from zero, not a strip centered at frequency two (%s)',
    mode => {
      const original = JSON.stringify(binTransformSpec);
      const prepared = prepareVegaLiteSpec(binTransformSpec, { mode });
      expect(prepared.data!.values!.map(row => [row.start, row.end, row.frequency])).toEqual([
        [-4, 0, 2],
        [0, 4, 2],
        [4, 8, 2],
      ]);
      expect(canRenderVegaRangedSpec(prepared)).toBe(true);
      const geometry = getVegaRangedGeometry(prepared, 300, 100);
      // Normalize actual plot coordinates back to the authored domains [-4, 8] and [0, 4].
      expect(
        geometry.marks.map(mark => [
          (mark.x1 / 300) * 12 - 4,
          (mark.x2 / 300) * 12 - 4,
          (1 - mark.y1 / 100) * 4,
          (1 - mark.y2 / 100) * 4,
        ]),
      ).toEqual([
        [-4, 0, 2, 0],
        [0, 4, 2, 0],
        [4, 8, 2, 0],
      ]);
      expect(geometry.marks.map(({ x, y, width, height }) => [x, y, width, height])).toEqual([
        [0, 50, 100, 50],
        [100, 50, 100, 50],
        [200, 50, 100, 50],
      ]);
      expect(JSON.stringify(binTransformSpec)).toBe(original);
    },
  );

  it.each<VegaLiteSemanticMode>(['legacy', 'strict'])(
    'renders three baseline-to-count rectangles through the public component (%s)',
    semanticMode => {
      const { container } = render(
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: binTransformSpec }} semanticMode={semanticMode} />,
      );
      expect(container.querySelector('[role="alert"]')).toBeNull();
      const svg = container.querySelector('svg')!;
      expect(svg).toHaveAttribute('width', '272');
      expect(svg).toHaveAttribute('height', '172');
      const plot = svg.querySelector('clipPath rect')!;
      const width = Number(plot.getAttribute('width'));
      const height = Number(plot.getAttribute('height'));
      const paths = Array.from(svg.querySelectorAll('path[data-ranged-mark]'));
      expect(paths).toHaveLength(3);
      paths.forEach((path, index) => {
        // Inspect the real SVG path, independently of getVegaRangedGeometry's expected output.
        const coordinates = path
          .getAttribute('d')!
          .match(/-?\d+(?:\.\d+)?/g)!
          .map(Number);
        const left = index / 3;
        const right = (index + 1) / 3;
        const expected = [left, 0.5, right, 0.5, right, 1, left, 1];
        expect(coordinates).toHaveLength(expected.length);
        coordinates.forEach((coordinate, i) => {
          expect(coordinate / (i % 2 === 0 ? width : height)).toBeCloseTo(expected[i], 9);
        });
      });
    },
  );

  it.each([undefined, 'vertical', 'horizontal'] as const)(
    'uses vertical quantitative/quantitative bars unless orient is horizontal (orient=%s)',
    orient => {
      const prepared = prepareVegaLiteSpec(binTransformSpec, { mode: 'strict' });
      const spec = rangedSpec({
        ...prepared,
        mark: { type: 'bar', cornerRadiusEnd: 4, ...(orient && { orient }) },
      });
      const geometry = getVegaRangedGeometry(spec, 300, 100);
      expect(geometry.marks.map(({ y, height, roundedEnd }) => [y, height, roundedEnd])).toEqual(
        Array.from({ length: 3 }, () => (orient === 'horizontal' ? [47.5, 5, 'left'] : [50, 50, 'top'])),
      );
      expect(geometry.marks.map(({ x1, x2 }) => [x1, x2])).toEqual([
        [0, 100],
        [100, 200],
        [200, 300],
      ]);
    },
  );

  it('defaults quantitative/quantitative x2 bars to vertical even without bin metadata', () => {
    const prepared = prepareVegaLiteSpec(binTransformSpec, { mode: 'strict' });
    const spec = rangedSpec({
      ...prepared,
      encoding: {
        ...prepared.encoding,
        x: { field: 'start', type: 'quantitative', scale: { domain: [-4, 8], zero: false } },
      },
    });
    expect(getVegaRangedGeometry(spec, 300, 100).marks.map(({ y1, y2 }) => [y1, y2])).toEqual([
      [50, 100],
      [50, 100],
      [50, 100],
    ]);
  });

  it('retains horizontal endpoint inference for bars with no y channel', () => {
    const spec = rangedSpec({
      ...horizontalRangeSpec,
      encoding: { x: horizontalRangeSpec.encoding!.x, x2: horizontalRangeSpec.encoding!.x2 },
    });
    expect(getVegaRangedGeometry(spec, 200, 100).marks.map(({ x1, x2, roundedEnd }) => [x1, x2, roundedEnd])).toEqual([
      [20, 80, 'left'],
      [180, 120, 'right'],
    ]);
  });

  it.each(['nominal', 'ordinal'] as const)(
    'keeps signed horizontal ranges and primary rounded ends with a %s y channel',
    type => {
      const spec = rangedSpec({
        ...horizontalRangeSpec,
        encoding: { ...horizontalRangeSpec.encoding, y: { ...horizontalRangeSpec.encoding!.y, type } },
      });
      expect(
        getVegaRangedGeometry(spec, 200, 100).marks.map(({ x1, x2, y, height, roundedEnd }) => [
          x1,
          x2,
          y,
          height,
          roundedEnd,
        ]),
      ).toEqual([
        [20, 80, 0, 50, 'left'],
        [180, 120, 50, 50, 'right'],
      ]);
    },
  );
});
