import * as React from 'react';
import { render } from '@testing-library/react';
import { isHTMLElement } from '@fluentui/react-utilities';
import { VegaDeclarativeChart } from '../../index';
import type { VegaLiteSpec } from './VegaLiteTypes';
import {
  transformVegaLiteToScatterChartProps,
  transformVegaLiteToVerticalBarChartProps,
} from './VegaLiteSchemaAdapter';

const barSpec: VegaLiteSpec = {
  width: 300,
  height: 200,
  mark: 'bar',
  data: {
    values: [
      { category: 'A', value: 2, region: 'North' },
      { category: 'B', value: 4, region: 'South' },
    ],
  },
  encoding: {
    x: { field: 'category', type: 'nominal' },
    y: { field: 'value', type: 'quantitative' },
  },
};

describe.each(['bar', 'point'] as const)('native Vega %s sizing', mark => {
  const nativeSpec: VegaLiteSpec = {
    ...barSpec,
    mark,
    ...(mark === 'point' ? { encoding: { x: { field: 'value', type: 'quantitative' }, y: barSpec.encoding!.y } } : {}),
  };
  const transform = mark === 'bar' ? transformVegaLiteToVerticalBarChartProps : transformVegaLiteToScatterChartProps;
  afterEach(() => jest.restoreAllMocks());

  it('passes authored dimensions to the native responsive container', () => {
    expect(transform(nativeSpec, { current: new Map() })).toMatchObject({
      width: 300,
      height: 200,
    });
  });

  it('gives an unsized chart a definite default height while retaining responsive width', () => {
    const { width, height, ...unsizedSpec } = nativeSpec;
    expect(transform(unsizedSpec, { current: new Map() })).toMatchObject({
      width: undefined,
      height: 350,
    });
  });

  it.each(['unit', 'facet', 'unsized'] as const)('settles real %s marks in a content-sized host', kind => {
    // Unlike a constant jsdom rectangle, this models the browser feedback: an unconstrained
    // 100%-height container grows with its own SVG. A definite responsive ancestor breaks it.
    let measurements = 0;
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      let fixedHeight: number | undefined;
      let fixedWidth: number | undefined;
      let ancestor: Element | null = this;
      while (ancestor) {
        if (isHTMLElement(ancestor)) {
          if (fixedHeight === undefined && ancestor.style.height.endsWith('px')) {
            fixedHeight = parseFloat(ancestor.style.height);
          }
          if (fixedWidth === undefined && ancestor.style.width.endsWith('px')) {
            fixedWidth = parseFloat(ancestor.style.width);
          }
        }
        ancestor = ancestor.parentElement;
      }
      const isChart = this.classList.contains('fui-cart__root');
      if (isChart && ++measurements > 100) {
        throw new Error('Native chart height did not settle in a content-sized host');
      }
      const width = fixedWidth ?? 640;
      const height = this.classList.contains('fui-cart__legendContainer')
        ? 32
        : fixedHeight ?? (isChart ? Number(this.querySelector('svg')?.getAttribute('height')) + 38 : 20);
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
    const { width, height, ...unsizedSpec } = nativeSpec;
    const { data, ...facetUnit } = nativeSpec;
    const spec: VegaLiteSpec =
      kind === 'facet'
        ? { data, facet: { field: 'region', type: 'nominal' }, spec: facetUnit }
        : kind === 'unsized'
        ? unsizedSpec
        : nativeSpec;
    const chart = (chartSpec: VegaLiteSpec) => (
      <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: chartSpec }} semanticMode="strict" />
    );
    const { container, rerender } = render(chart(spec));
    const charts = container.querySelectorAll('svg.fui-cart__chart');
    expect(charts).toHaveLength(kind === 'facet' ? 2 : 1);
    const markSelector = mark === 'bar' ? 'rect[role="option"]' : 'circle[role="option"]';
    charts.forEach(svg => {
      const legendHeight = svg.closest('.fui-cart__root')!.querySelector('.fui-cart__legendContainer') ? 32 : 0;
      expect(svg).toHaveAttribute('height', String((kind === 'unsized' ? 350 : 200) - legendHeight));
      expect(svg).toHaveAttribute('width', kind === 'unsized' ? '640' : '300');
      expect(svg.querySelectorAll(markSelector).length).toBeGreaterThan(0);
    });
    // A genuine data update must still reach the native renderer, without reviving the feedback.
    const updatedData = { values: barSpec.data!.values!.map(row => ({ ...row, value: Number(row.value) + 1 })) };
    rerender(chart({ ...spec, data: updatedData }));
    expect(container.querySelectorAll(markSelector)).toHaveLength(2);
    expect(measurements).toBeLessThan(100);
  });
});
