import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Supplied by the monorepo for adjacent tests.
import { render, screen, within } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
// Initialize the public barrel before the responsive native chart factories.
import { VegaDeclarativeChart } from '../../index';
import { planVegaDeclarativeChartViews } from './VegaDeclarativeChartView';
import { buildVegaViewTree, getVegaViewSourceSpec } from './VegaLiteViewTree';
import type { VegaLiteSpec } from './VegaLiteTypes';

function freeze<T>(value: T): T {
  if (value && typeof value === 'object') {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function heatmap(type: 'quantitative' | 'temporal'): VegaLiteSpec {
  return {
    width: 400,
    height: 200,
    mark: 'rect',
    data: {
      values: [
        { x: 'First', y: 'Row', value: 1 },
        { x: 'Last', y: 'Row', value: 9 },
      ],
    },
    encoding: {
      x: { field: 'x', type: 'nominal' },
      y: { field: 'y', type: 'nominal' },
      color: { field: 'value', type, scale: { scheme: 'viridis' } },
    },
  };
}

type GeometryKind = 'ranged' | 'centered';
type DomainLocation = 'authored' | 'inherited' | 'inferred' | 'layered';

function composedGeometry(kind: GeometryKind, reverse: boolean | undefined, location: DomainLocation): VegaLiteSpec {
  const color: NonNullable<VegaLiteSpec['encoding']>['color'] = {
    field: 'series',
    type: 'nominal',
    scale: {
      ...(location === 'inferred' ? {} : { domain: ['A', 'B'] }),
      range: ['red', 'blue'],
      ...(reverse === undefined ? {} : { reverse }),
    },
  };
  const children: VegaLiteSpec[] = ['B', 'A'].map(series => ({
    width: 400,
    height: 200,
    ...(location === 'layered'
      ? { layer: [{ mark: kind === 'ranged' ? 'bar' : 'area' }] }
      : { mark: kind === 'ranged' ? 'bar' : 'area' }),
    data: {
      values: [
        { x: 0, end: 2, y: 2, series },
        { x: 1, end: 3, y: 4, series },
      ],
    },
    encoding: {
      x: { field: 'x', type: 'quantitative' },
      ...(kind === 'ranged'
        ? { x2: { field: 'end' }, y: { field: 'series', type: 'nominal' } }
        : { y: { field: 'y', type: 'quantitative', stack: 'center' } }),
      ...(location === 'inherited' ? {} : { color }),
    },
  }));
  return { ...(location === 'inherited' ? { encoding: { color } } : {}), hconcat: children };
}

beforeEach(() => {
  resetIdsForTests();
  // Model only host layout: all adapters, geometry renderers, legends and effects remain real.
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const text = this.tagName.toLowerCase() === 'text';
    const legend = this.getAttribute('role') === 'listbox' || /legend/i.test(this.getAttribute('class') ?? '');
    const width = text ? Math.max(1, this.textContent?.length ?? 0) * 7 : 640;
    const height = text ? 18 : legend ? 32 : 400;
    return { width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON: () => ({}) };
  });
  const computedStyle = globalThis.getComputedStyle;
  jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
    const style = computedStyle(element);
    return {
      ...style,
      marginTop: '0px',
      marginBottom: '0px',
      getPropertyValue: (property: string) => style.getPropertyValue(property),
    } as CSSStyleDeclaration;
  });
});

afterEach(() => jest.restoreAllMocks());

describe('composed view categorical legends', () => {
  describe.each(['quantitative', 'temporal'] as const)('%s color', type => {
    it.each([false, true])('does not enumerate continuous values (layered=%s)', layered => {
      const { mark, ...unit } = heatmap(type);
      const child: VegaLiteSpec = layered ? { ...unit, layer: [{ mark: mark! }] } : { ...unit, mark };
      const spec = freeze({ hconcat: [child, child] });
      const tree = freeze(buildVegaViewTree(spec, { mode: 'strict' }));
      const before = JSON.stringify(tree);
      const colorMap = { current: new Map<string, string>() };
      const plan = planVegaDeclarativeChartViews(tree, spec, colorMap, false, 'strict');
      expect(plan.legends).toEqual([]);
      expect(colorMap.current.size).toBe(0);
      if (tree.type !== 'concat' || plan.type !== 'concat') {
        throw new Error('Expected composed view');
      }
      plan.children.forEach((view, index) => {
        const node = tree.children[index];
        if (node.type !== 'unit' || view.type !== 'unit') {
          throw new Error('Expected unit child');
        }
        expect(view.legends).toEqual([]);
        expect(view.hideLegend).toBe(true);
        expect(view.sourceSpec).toBe(getVegaViewSourceSpec(node.spec));
        expect(view.nativeSpec).toEqual({ ...view.sourceSpec, height: view.spec.height });
      });
      expect(JSON.stringify(tree)).toBe(before);
    });
  });

  it('renders actual continuous heatmap cells without a fake categorical legend union', () => {
    const spec = freeze({ hconcat: [heatmap('quantitative'), heatmap('quantitative')] });
    const before = JSON.stringify(spec);
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />);
    const children = container.querySelectorAll('[data-vega-view]');
    expect(children).toHaveLength(2);
    children.forEach(child => {
      expect(child.querySelector('svg.fui-cart__chart')).toBeTruthy();
      const cells = child.querySelectorAll('g[role="option"] > rect');
      expect(cells).toHaveLength(2);
      expect(cells[0]).toHaveAttribute('fill', 'rgb(68, 1, 84)');
      expect(cells[1]).toHaveAttribute('fill', 'rgb(253, 231, 37)');
      expect(child.innerHTML).not.toMatch(/NaN|Infinity/);
    });
    expect(screen.queryByRole('listbox', { name: 'Legends' })).toBeNull();
    expect(JSON.stringify(spec)).toBe(before);
  });

  describe.each(['ranged', 'centered'] as const)('%s actual public output', kind => {
    it('uses the entire domain, including absent categories, without changing native cached colors or provenance', () => {
      const input = composedGeometry(kind, true, 'inherited');
      input.encoding!.color!.scale!.domain = ['A', 'Unused', 'B'];
      const spec = freeze(input);
      const tree = freeze(buildVegaViewTree(spec, { mode: 'strict' }));
      const before = JSON.stringify(tree);
      const colorMap = {
        current: new Map([
          ['A', 'purple'],
          ['B', 'yellow'],
        ]),
      };
      const plan = planVegaDeclarativeChartViews(tree, spec, colorMap, false, 'strict');
      // Reverse domain indices, not the two-element range: index 2 wraps to red.
      expect(plan.legends).toEqual([
        { title: 'A', color: 'red' },
        { title: 'Unused', color: 'blue' },
        { title: 'B', color: 'red' },
      ]);
      expect(Array.from(colorMap.current)).toEqual([
        ['A', 'purple'],
        ['B', 'yellow'],
      ]);
      if (tree.type !== 'concat' || plan.type !== 'concat') {
        throw new Error('Expected composed view');
      }
      plan.children.forEach((view, index) => {
        const node = tree.children[index];
        if (node.type !== 'unit' || view.type !== 'unit') {
          throw new Error('Expected unit child');
        }
        expect(view.sourceSpec).toBe(getVegaViewSourceSpec(node.spec));
        expect(view.sourceSpec.encoding?.color?.scale?.domain).toEqual(['A', 'Unused', 'B']);
        expect(view.nativeSpec).toEqual({ ...view.sourceSpec, height: view.spec.height });
        expect(view.hideLegend).toBe(true);
      });
      expect(JSON.stringify(tree)).toBe(before);

      const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />);
      const selector = kind === 'ranged' ? 'path[data-ranged-mark]' : 'path[data-centered-series]';
      const marks = container.querySelectorAll(selector);
      expect(marks).toHaveLength(kind === 'ranged' ? 4 : 2);
      marks.forEach(mark => expect(mark).toHaveAttribute('fill', 'red'));
      const legend = screen.getByRole('listbox', { name: 'Legends' });
      (['A', 'Unused', 'B'] as const).forEach(series => {
        const option = within(legend).getByRole('option', { name: series });
        const swatch = option.querySelector<HTMLElement>('[style*="background-color"]');
        expect(swatch!.style.backgroundColor).toBe(series === 'Unused' ? 'blue' : 'red');
      });
    });

    describe.each(['authored', 'inherited', 'inferred', 'layered'] as const)('%s domain', location => {
      it.each([undefined, false, true])('matches shared swatches to real mark fills (reverse=%s)', reverse => {
        const spec = freeze(composedGeometry(kind, reverse, location));
        const before = JSON.stringify(spec);
        const { container } = render(
          <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />,
        );
        const children = container.querySelectorAll('[data-vega-view]');
        expect(children).toHaveLength(2);
        expect(screen.getAllByRole('listbox', { name: 'Legends' })).toHaveLength(1);
        const legend = screen.getByRole('listbox', { name: 'Legends' });
        expect(
          within(legend)
            .getAllByRole('option')
            .map(option => option.textContent),
        ).toEqual(['A', 'B']);
        const expected = reverse ? { A: 'blue', B: 'red' } : { A: 'red', B: 'blue' };
        // Check real renderer output first so a planner-only palette assertion cannot hide a mismatch.
        children.forEach((child, index) => {
          const series = index === 0 ? 'B' : 'A';
          const selector = kind === 'ranged' ? 'path[data-ranged-mark]' : 'path[data-centered-series]';
          const marks = child.querySelectorAll(selector);
          expect(marks).toHaveLength(kind === 'ranged' ? 2 : 1);
          marks.forEach(mark => {
            if (kind === 'centered') {
              expect(mark).toHaveAttribute('data-legend', series);
            }
            expect(mark).toHaveAttribute('fill', expected[series]);
            expect(mark.getAttribute('d')).not.toMatch(/NaN|Infinity/);
          });
          expect(child.querySelector('[role="listbox"][aria-label="Legends"]')).toBeNull();
        });
        (['A', 'B'] as const).forEach(series => {
          const option = within(legend).getByRole('option', { name: series });
          const swatch = option.querySelector<HTMLElement>('[style*="background-color"]');
          expect(swatch).not.toBeNull();
          expect(swatch!.style.backgroundColor).toBe(expected[series]);
        });
        expect(JSON.stringify(spec)).toBe(before);
      });
    });
  });

  it('keeps native categorical entries across an independent continuous-color boundary', () => {
    const spec: VegaLiteSpec = freeze({
      resolve: { scale: { color: 'independent' } },
      hconcat: [
        { hconcat: [heatmap('quantitative'), heatmap('quantitative')] },
        {
          hconcat: [
            {
              width: 400,
              height: 200,
              mark: 'line',
              data: {
                values: [
                  { x: 0, y: 2, series: 'Category' },
                  { x: 1, y: 4, series: 'Category' },
                ],
              },
              encoding: {
                x: { field: 'x', type: 'quantitative' },
                y: { field: 'y', type: 'quantitative' },
                color: { field: 'series', type: 'nominal', scale: { range: ['red'] } },
              },
            },
          ],
        },
      ],
    });
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: spec }} semanticMode="strict" />);
    const legend = screen.getByRole('listbox', { name: 'Legends' });
    expect(
      within(legend)
        .getAllByRole('option')
        .map(option => option.textContent),
    ).toEqual(['Category']);
    const swatch = within(legend)
      .getByRole('option', { name: 'Category' })
      .querySelector<HTMLElement>('[style*="background-color"]');
    expect(swatch!.style.backgroundColor).toBe('red');
    expect(container.querySelector('line[id^="lineID"]')).toHaveAttribute('stroke', 'red');
    container.querySelectorAll('[data-vega-view]').forEach(child => {
      expect(child.querySelector('[role="listbox"][aria-label="Legends"]')).toBeNull();
    });
  });
});
