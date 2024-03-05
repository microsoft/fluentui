import { render } from '@testing-library/react';
import * as React from 'react';
import { ChartHoverCard } from './ChartHoverCard';
import { getByClass } from '../TestUtility.test';

describe('ChartHoverCard', () => {
  test('renders the chart hover card component', () => {
    const { container } = render(<ChartHoverCard />);
    const chartHoverCardElement = getByClass(container, /calloutContentRoot/);
    expect(chartHoverCardElement).toBeDefined();
  });

  test('displays the correct XValue', () => {
    const XValue = 'Sample XValue';
    const { container } = render(<ChartHoverCard XValue={XValue} />);
    const XValueElement = getByClass(container, /calloutContentX/)[0] as HTMLElement;
    expect(XValueElement).toBeDefined();
    expect(XValueElement.textContent?.trim()).toBe(XValue);
  });

  test('displays the chart hover card correctly when XValue is undefined', () => {
    const XValue = undefined;
    const { container } = render(<ChartHoverCard XValue={XValue} />);
    expect(getByClass(container, /calloutContentX/)).toBeDefined();
  });

  test('displays the correct YValue', () => {
    const YValue = 'Sample YValue';
    const { container } = render(<ChartHoverCard YValue={YValue} />);
    const YValueElement = getByClass(container, /calloutContentY/)[0] as HTMLElement;
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe(YValue);
  });

  test('displays the chart hover card correctly when YValue is undefined', () => {
    const YValue = undefined;
    const { container } = render(<ChartHoverCard YValue={YValue} />);
    expect(getByClass(container, /calloutContentY/)).toBeDefined();
  });

  test('displays the correct YValue when YValue is a number', () => {
    const YValue = 123;
    const { container } = render(<ChartHoverCard YValue={YValue} />);
    const YValueElement = getByClass(container, /calloutContentY/)[0] as HTMLElement;
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe(YValue.toString());
  });

  test('displays the correct YValue when YValue is a date', () => {
    const YValue = new Date('2021-01-01');
    const { container } = render(<ChartHoverCard YValue={YValue} />);
    const YValueElement = getByClass(container, /calloutContentY/)[0] as HTMLElement;
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe(YValue.toLocaleDateString());
  });

  test('displays the correct Legend', () => {
    const Legend = 'Sample Legend';
    const { container } = render(<ChartHoverCard Legend={Legend} />);
    const LegendElement = getByClass(container, /calloutlegendText/);
    expect(LegendElement).toBeDefined();
    expect(LegendElement[0].textContent?.trim()).toBe(Legend);
  });

  test('displays the correct Legend when Legend is a number', () => {
    const Legend = 123;
    const { container } = render(<ChartHoverCard Legend={Legend} />);
    const LegendElement = getByClass(container, /calloutlegendText/);
    expect(LegendElement).toBeDefined();
    expect(LegendElement[0].textContent?.trim()).toBe(Legend.toString());
  });

  test('displays the correct Legend when Legend is a date', () => {
    const Legend = new Date('2021-01-01');
    const { container } = render(<ChartHoverCard Legend={Legend} />);
    const LegendElement = getByClass(container, /calloutlegendText/);
    expect(LegendElement).toBeDefined();
    expect(LegendElement[0].textContent?.trim()).toBe(Legend.toLocaleDateString());
  });

  test('displays the chart hover card correctly when Legend is undefined', () => {
    const Legend = undefined;
    const { container } = render(<ChartHoverCard Legend={Legend} />);
    expect(getByClass(container, /calloutlegendText/)).toBeDefined();
  });

  test('displays the correct ratio', () => {
    const ratio: [number, number] = [1, 2];
    const { container } = render(<ChartHoverCard ratio={ratio} />);
    expect(getByClass(container, /ratio/)).toBeDefined();
    const numerator = getByClass(container, /numerator/)[0] as HTMLElement;
    expect(numerator).toBeDefined();
    expect(numerator.textContent).toBe(ratio[0].toLocaleString());
    const denominator = getByClass(container, /denominator/)[0] as HTMLElement;
    expect(denominator).toBeDefined();
    expect(denominator.textContent).toBe(ratio[1].toLocaleString());
  });

  it('displays the correct descriptionMessage', () => {
    const descriptionMessage = 'Sample descriptionMessage';
    const { container } = render(<ChartHoverCard descriptionMessage={descriptionMessage} />);
    const descriptionMessageElement = getByClass(container, /descriptionMessage/)[0] as HTMLElement;
    expect(descriptionMessageElement).toBeDefined();
    expect(descriptionMessageElement.textContent?.trim()).toBe(descriptionMessage);
  });
});
