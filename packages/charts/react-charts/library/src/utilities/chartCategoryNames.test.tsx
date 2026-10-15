import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { VerticalBarChart } from '../components/VerticalBarChart/VerticalBarChart';
import { HorizontalBarChartWithAxis } from '../components/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis';
import { ScatterChart } from '../components/ScatterChart/ScatterChart';
import { getNextColor } from './colors';
import { cartesianchartClassNames } from '../components/CommonComponents/useCartesianChartStyles.styles';
import type { ScatterChartDataPoint } from '../types/DataPoint';

const names = ['Revenue', 'constructor', '__proto__', 'toString'];

describe('Chart category and legend names', () => {
  beforeEach(() => {
    jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 0;
    });
    jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 650,
      bottom: 50,
      width: 650,
      height: 50,
      toJSON: () => ({}),
    });
    const getComputedStyle = globalThis.getComputedStyle;
    jest.spyOn(globalThis, 'getComputedStyle').mockImplementation(element => {
      const style = getComputedStyle(element);
      style.marginTop = '0px';
      style.marginBottom = '0px';
      return style;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('preserves vertical bar categories and legends in explicit category order', () => {
    const { container } = render(
      <VerticalBarChart
        width={650}
        height={400}
        xAxisCategoryOrder={names}
        data={names.map((name, index) => ({ x: name, y: index + 1, legend: name, color: getNextColor(index) }))}
      />,
    );
    expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(names.length);
    names.forEach((name, index) => {
      expect(screen.getByRole('option', { name: `${name}. ${name}, ${index + 1}.` })).toHaveAttribute(
        'fill',
        getNextColor(index),
      );
      expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false');
    });
    expect(
      Array.from(container.querySelectorAll(`.${cartesianchartClassNames.xAxis} .tick text`), node => node.textContent),
    ).toEqual(names);
  });

  it('preserves horizontal bar categories and legends in explicit category order', () => {
    const { container } = render(
      <HorizontalBarChartWithAxis
        width={650}
        height={400}
        yAxisCategoryOrder={names}
        data={names.map((name, index) => ({ y: name, x: index + 1, legend: name, color: getNextColor(index) }))}
      />,
    );
    expect(container.querySelectorAll('rect[role="option"]')).toHaveLength(names.length);
    names.forEach((name, index) => {
      expect(screen.getByRole('option', { name: `${name}. ${name}, ${index + 1}.` })).toHaveAttribute(
        'fill',
        getNextColor(index),
      );
      expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false');
    });
    expect(
      Array.from(container.querySelectorAll(`.${cartesianchartClassNames.yAxis} .tick text`), node => node.textContent),
    ).toEqual(names);
  });

  it('preserves scatter categories and legends in explicit category order', () => {
    const { container } = render(
      <ScatterChart
        width={650}
        height={400}
        yAxisCategoryOrder={names}
        data={{
          scatterChartData: names.map((name, index) => {
            const point: ScatterChartDataPoint = {
              x: index + 1,
              // @ts-expect-error Exercise the runtime string-axis path; the public type only declares numeric y.
              y: name,
              markerSize: 5,
            };
            return { legend: name, color: getNextColor(index), data: [point] };
          }),
        }}
      />,
    );
    names.forEach((name, index) => {
      expect(screen.getByRole('option', { name: `${index + 1}. ${name}, ${name}.` })).toBeInTheDocument();
      expect(screen.getByRole('option', { name })).toHaveAttribute('aria-selected', 'false');
    });
    expect(
      Array.from(container.querySelectorAll(`.${cartesianchartClassNames.yAxis} .tick text`), node => node.textContent),
    ).toEqual(names);
  });
});
