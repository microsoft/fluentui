import * as React from 'react';
import { fireEvent, render, waitFor, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { tokens } from '@fluentui/react-theme';
import { VegaDeclarativeChart } from '../../index';
import { transformVegaLiteToVerticalStackedBarChartProps } from './VegaLiteSchemaAdapter';
import type { VegaLiteSpec } from './VegaLiteTypes';
import { specificationCorpus } from './testing/specs/manifest';

const months = ['April', 'May', 'June'];
const channels = ['Self-service', 'Assisted'];
const colors = [tokens.colorBrandBackground, tokens.colorPaletteGreenBackground3];
const values = [
  { month: 'April', channel: 'Self-service', tickets: 30, priority: 2 },
  { month: 'April', channel: 'Assisted', tickets: 10, priority: 1 },
  { month: 'May', channel: 'Self-service', tickets: 45, priority: 2 },
  { month: 'May', channel: 'Assisted', tickets: 30, priority: 1 },
  { month: 'June', channel: 'Self-service', tickets: 60, priority: 2 },
  { month: 'June', channel: 'Assisted', tickets: 20, priority: 1 },
];

function monthlySpec(descending = false): VegaLiteSpec {
  return {
    width: 640,
    height: 320,
    data: { values },
    mark: 'bar',
    encoding: {
      x: { field: 'month', type: 'nominal', sort: months },
      y: { field: 'tickets', type: 'quantitative', stack: 'normalize', axis: { format: '.0%' } },
      color: { field: 'channel', type: 'nominal', scale: { domain: channels, range: colors } },
      order: { field: 'priority', type: 'quantitative', sort: descending ? 'descending' : 'ascending' },
      tooltip: [
        { field: 'month', title: 'Month' },
        { field: 'channel', title: 'Channel' },
        { field: 'tickets', title: 'Raw tickets', format: '.0f' },
      ],
    },
  };
}

const corpus = specificationCorpus.find(entry => entry.file === 'normalized-bar-order.vl.json')!.spec;

function visibleCategoryOrder(svg: Element, labels: string[]): string[] {
  // D3 can retain old tick DOM insertion order while moving the ticks to new positions.
  return Array.from(svg.querySelectorAll('text'))
    .filter(text => labels.includes(text.textContent!))
    .sort((left, right) => {
      const position = (text: Element) =>
        Number(/translate\(([^,\s)]+)/.exec(text.parentElement!.getAttribute('transform')!)![1]);
      return position(left) - position(right);
    })
    .map(text => text.textContent!);
}

describe('native stacked-bar category, stack and legend orders are independent', () => {
  beforeEach(() => {
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      // Text measurement and legend height must not consume the entire plot.
      const isText = ['text', 'tspan', 'span'].includes(this.tagName.toLowerCase());
      const width = isText ? (this.textContent?.length ?? 0) * 6 : 640;
      const height = this.classList.contains('fui-cart__legendContainer') ? 32 : isText ? 16 : 320;
      return { x: 0, y: 0, top: 0, left: 0, bottom: height, right: width, width, height, toJSON: () => ({}) };
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

  it.each([false, true])('keeps domain legends and raw tooltips with descending=%s', descending => {
    const spec = monthlySpec(descending);
    const original = JSON.stringify(spec);
    const props = transformVegaLiteToVerticalStackedBarChartProps(spec, { current: new Map() });
    expect(props.xAxisCategoryOrder).toEqual(months);
    expect(props.data.map(stack => stack.xAxisPoint)).toEqual(months);
    expect(props.legendProps?.legends).toEqual(channels.map((title, index) => ({ title, color: colors[index] })));
    expect(props.hideLabels).toBe(true);
    props.data.forEach((stack, index) => {
      expect(stack.chartData.map(point => point.legend)).toEqual(descending ? channels : [...channels].reverse());
      expect(stack.chartData.reduce((total, point) => total + Number(point.data), 0)).toBeCloseTo(1);
      stack.chartData.forEach(point => {
        const row = values.find(value => value.month === months[index] && value.channel === point.legend)!;
        expect(point.color).toBe(colors[channels.indexOf(point.legend)]);
        const tooltip = props.onRenderCalloutPerDataPoint!(point);
        expect(renderToStaticMarkup(tooltip!)).toContain(`>${row.tickets}<`);
        expect(point.callOutAccessibilityData?.ariaLabel).toContain(`Raw tickets: ${row.tickets}`);
      });
    });
    expect(JSON.stringify(spec)).toBe(original);
  });

  it('retains explicit category domains and absent color-domain entries without phantom segments', () => {
    const spec: VegaLiteSpec = {
      ...corpus,
      encoding: {
        ...corpus.encoding,
        x: { field: 'category', type: 'nominal', scale: { domain: ['A', 'B'] } },
      },
    };
    const original = JSON.stringify(spec);
    const props = transformVegaLiteToVerticalStackedBarChartProps(spec, { current: new Map() });
    expect(props.xAxisCategoryOrder).toEqual(['A', 'B']);
    expect(props.data.map(stack => stack.xAxisPoint)).toEqual(['A', 'B']);
    expect(props.legendProps?.legends?.map(legend => legend.title)).toEqual(['First', 'Second', 'Absent']);
    expect(props.data.map(stack => stack.chartData.map(point => point.legend))).toEqual([
      ['Second', 'First'],
      ['Second', 'First'],
    ]);
    expect(props.data.map(stack => stack.chartData.map(point => point.data))).toEqual([
      [0.75, 0.25],
      [0.75, 0.25],
    ]);
    expect(JSON.stringify(spec)).toBe(original);
  });

  it('does not hide ordinary stack totals', () => {
    const spec = monthlySpec();
    spec.encoding!.y!.stack = 'zero';
    const props = transformVegaLiteToVerticalStackedBarChartProps(spec, { current: new Map() });
    expect(props.hideLabels).not.toBe(true);
    expect(props.data[0].chartData.map(point => point.data)).toEqual([10, 30]);
  });

  it.each(['legacy', 'strict'] as const)(
    'renders stable public months and legends across both %s control states',
    async mode => {
      const chart = (descending: boolean) => (
        <VegaDeclarativeChart chartSchema={{ vegaLiteSpec: monthlySpec(descending) }} semanticMode={mode} />
      );
      const { container, rerender } = render(chart(false));
      for (const descending of [false, true, false]) {
        rerender(chart(descending));
        const svg = container.querySelector('svg.fui-cart__chart')!;
        await waitFor(() => expect(svg.querySelectorAll('rect[role="option"]')).toHaveLength(6));
        expect(visibleCategoryOrder(svg, months)).toEqual(months);
        expect(
          Array.from(container.querySelectorAll('button[aria-label]')).map(button => button.getAttribute('aria-label')),
        ).toEqual(channels);
        expect(svg.querySelectorAll('[aria-label^="Total:"]')).toHaveLength(0);
        let previousX = -Infinity;
        months.forEach(month => {
          const marks = Array.from(svg.querySelectorAll<SVGRectElement>('rect[role="option"]')).filter(mark =>
            mark.getAttribute('aria-label')!.includes(`Month: ${month};`),
          );
          expect(marks).toHaveLength(2);
          expect(marks.map(mark => mark.getAttribute('aria-label')!.split('; ')[1])).toEqual(
            (descending ? channels : [...channels].reverse()).map(channel => `Channel: ${channel}`),
          );
          const x = Number(marks[0].getAttribute('x'));
          expect(x).toBeGreaterThan(previousX);
          previousX = x;
          expect(Number(marks[0].getAttribute('y'))).toBeGreaterThan(Number(marks[1].getAttribute('y')));
          for (const mark of marks) {
            const row = values.find(value =>
              mark.getAttribute('aria-label')!.includes(`Month: ${value.month}; Channel: ${value.channel};`),
            )!;
            // Native axis-title tooltips share this role; identify the semantic data tooltip by its full label.
            const tooltipLabel = `Month: ${row.month}; Channel: ${row.channel}; Raw tickets: ${row.tickets}`;
            fireEvent.focus(mark);
            expect(within(container.ownerDocument.body).getByRole('tooltip', { name: tooltipLabel })).toHaveTextContent(
              `Raw tickets${row.tickets}`,
            );
            fireEvent.blur(mark);
            fireEvent.mouseOver(mark);
            expect(within(container.ownerDocument.body).getByRole('tooltip', { name: tooltipLabel })).toHaveTextContent(
              `Raw tickets${row.tickets}`,
            );
            fireEvent.mouseLeave(mark);
          }
        });
      }
    },
  );

  it.each(['legacy', 'strict'] as const)('renders the complete public corpus domain in %s mode', async mode => {
    const { container } = render(<VegaDeclarativeChart chartSchema={{ vegaLiteSpec: corpus }} semanticMode={mode} />);
    expect(
      Array.from(container.querySelectorAll('button[aria-label]')).map(button => button.getAttribute('aria-label')),
    ).toEqual(['First', 'Second', 'Absent']);
    const svg = container.querySelector('svg.fui-cart__chart')!;
    await waitFor(() => expect(svg.querySelectorAll('rect[role="option"]')).toHaveLength(4));
    expect(visibleCategoryOrder(svg, ['A', 'B'])).toEqual(['A', 'B']);
    expect(svg.querySelectorAll('rect[role="option"]')).toHaveLength(4);
    expect(svg.querySelectorAll('[aria-label^="Total:"]')).toHaveLength(0);
  });

  it('retains native legend hover and host selection callbacks with adapter domain legends', () => {
    const onSchemaChange = jest.fn();
    const { container } = render(
      <VegaDeclarativeChart
        chartSchema={{ vegaLiteSpec: monthlySpec() }}
        semanticMode="strict"
        onSchemaChange={onSchemaChange}
      />,
    );
    const legend = within(container).getByRole('option', { name: 'Self-service' });
    const assisted = Array.from(container.querySelectorAll('svg rect[role="option"]')).find(mark =>
      mark.getAttribute('aria-label')!.includes('Channel: Assisted;'),
    )!;
    expect(assisted).toHaveAttribute('opacity', '1');
    fireEvent.mouseOver(legend);
    expect(assisted).toHaveAttribute('opacity', '0.1');
    fireEvent.mouseOut(legend);
    expect(assisted).toHaveAttribute('opacity', '1');
    fireEvent.click(legend);
    expect(onSchemaChange).toHaveBeenLastCalledWith(expect.objectContaining({ selectedLegends: ['Self-service'] }));
    expect(legend).toHaveAttribute('aria-selected', 'true');
    expect(assisted).toHaveAttribute('opacity', '0.1');
    fireEvent.click(legend);
    expect(onSchemaChange).toHaveBeenLastCalledWith(expect.objectContaining({ selectedLegends: [] }));
    expect(assisted).toHaveAttribute('opacity', '1');
  });
});
