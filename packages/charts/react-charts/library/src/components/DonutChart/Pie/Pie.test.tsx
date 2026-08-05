import { render } from '@testing-library/react';
import * as React from 'react';
import { DonutChart } from '../index';
import type { ChartProps } from '../index';
import { pieInsideDonutStringClassName } from './usePieStyles.styles';

/**
 * Regression coverage for PR #36513 review item 11: `wrapTextInsideDonut` historically ran a
 * DOCUMENT-WIDE d3 `selectAll` over a class token shared by every Pie instance, so mounting one
 * DonutChart re-wrapped the center text of every other DonutChart on the page using the LAST
 * mounted chart's radius. The wrap is now scoped to each Pie's own `<g>` (Pie.tsx passes its
 * root node to `wrapTextInsideDonut`).
 */

const chartDataA: ChartProps = {
  chartTitle: 'Donut A',
  chartData: [
    { legend: 'first', data: 20000, color: '#DADADA' },
    { legend: 'second', data: 39000, color: '#0078D4' },
  ],
};

const chartDataB: ChartProps = {
  chartTitle: 'Donut B',
  chartData: [
    { legend: 'third', data: 120, color: '#00bcf2' },
    { legend: 'fourth', data: 130, color: '#b4a0ff' },
  ],
};

beforeAll(() => {
  // https://github.com/jsdom/jsdom/issues/3368
  global.ResizeObserver = class ResizeObserver {
    public observe() {
      // do nothing
    }
    public unobserve() {
      // do nothing
    }
    public disconnect() {
      // do nothing
    }
  };
});

test('wrapping the center value of one DonutChart must not rewrap other DonutCharts (per-instance scope)', () => {
  // jsdom has no SVG layout: report every measured tspan as 100px wide. With
  // maxWidth = innerRadius * 2 - 5 (TEXT_PADDING), chart A (innerRadius 60 → maxWidth 115)
  // never overflows and keeps ONE tspan, while chart B (innerRadius 35 → maxWidth 65)
  // overflows on every appended word and wraps to one tspan PER word.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const svgElementPrototype: any = (window.SVGElement as any).prototype;
  const originalGetComputedTextLength = svgElementPrototype.getComputedTextLength;
  svgElementPrototype.getComputedTextLength = jest.fn().mockReturnValue(100);

  try {
    const { container } = render(
      <div>
        <DonutChart data={chartDataA} innerRadius={60} valueInsideDonut="Grand total sum" hideLegend={true} />
        <DonutChart data={chartDataB} innerRadius={35} valueInsideDonut="Total value here" hideLegend={true} />
      </div>,
    );

    const centerTexts = container.querySelectorAll(`.${pieInsideDonutStringClassName}`);
    expect(centerTexts).toHaveLength(2);
    const [textA, textB] = Array.from(centerTexts);

    // Chart B wraps against its own radius: one tspan per word.
    expect(textB.querySelectorAll('tspan')).toHaveLength(3);
    expect(textB.textContent!.replace(/\s+/g, ' ').trim()).toBe('Total value here');

    // Chart A must keep its own single-line wrap. Under the document-wide selectAll, chart B's
    // mount effect re-wrapped chart A's text with B's maxWidth (65), splitting it into three
    // tspans — the regression this test pins.
    expect(textA.querySelectorAll('tspan')).toHaveLength(1);
    expect(textA.textContent!.trim()).toBe('Grand total sum');
  } finally {
    svgElementPrototype.getComputedTextLength = originalGetComputedTextLength;
  }
});
