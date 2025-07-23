import * as React from 'react';
import { ChartPopover } from './ChartPopover';
import { getByClass, getById } from '../../utilities/TestUtility.test';
import { act, getByText, render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

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

describe.skip('Popover', () => {
  test('renders the popover component', () => {
    const { container } = render(<ChartPopover isPopoverOpen={true} />);
    const popoverElement = getById(container, /callout1/);
    expect(popoverElement).toBeDefined();
  });

  test('displays the correct XValue', () => {
    const XValue = 'Sample XValue';
    const { container } = render(<ChartPopover XValue={XValue} isPopoverOpen={true} />);
    const XValueElement = getByText(container, /Sample XValue/);
    expect(XValueElement).toBeDefined();
    expect(XValueElement.textContent?.trim()).toBe(XValue);
  });

  test('displays the popover card correctly when XValue is undefined', () => {
    const XValue = undefined;
    const { container } = render(<ChartPopover XValue={XValue} isPopoverOpen={true} />);
    const XValueElement = getByClass(container, /calloutContentX/)[0] as HTMLElement;
    expect(XValueElement.children[0]).toBeUndefined();
  });

  test('displays the correct YValue', () => {
    const YValue = 'Sample YValue';
    const { container } = render(<ChartPopover YValue={YValue} isPopoverOpen={true} />);
    const YValueElement = getByText(container, /Sample YValue/);
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe(YValue);
  });

  test('displays the popover card correctly when YValue is undefined', () => {
    const YValue = undefined;
    const { container } = render(<ChartPopover YValue={YValue} isPopoverOpen={true} />);
    const YValueElement = getByClass(container, /calloutContentY/)[0] as HTMLElement;
    expect(YValueElement.children[0]).toBeUndefined();
  });

  test('displays the correct YValue when YValue is a number', () => {
    const YValue = 123;
    const { container } = render(<ChartPopover YValue={YValue} isPopoverOpen={true} />);
    const YValueElement = getByText(container, /123/);
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe(YValue.toString());
  });

  test('displays the correct YValue when YValue is a date', () => {
    const YValue = new Date('2021-01-01');
    const { container } = render(<ChartPopover YValue={YValue} isPopoverOpen={true} />);
    const YValueElement = getByText(container, '01/01/2021, 12:00:00 AM UTC');
    expect(YValueElement).toBeDefined();
    expect(YValueElement.textContent?.trim()).toBe('01/01/2021, 12:00:00 AM UTC');
  });

  test('displays the correct Legend', () => {
    const Legend = 'Sample Legend';
    const { container } = render(<ChartPopover legend={Legend} isPopoverOpen={true} />);
    const LegendElement = getByText(container, /Sample Legend/);
    expect(LegendElement).toBeDefined();
  });

  test('displays the correct Legend when Legend is a number', () => {
    const Legend = 123;
    const { container } = render(<ChartPopover legend={Legend} isPopoverOpen={true} />);
    const LegendElement = getByText(container, /123/);
    expect(LegendElement).toBeDefined();
    expect(LegendElement.textContent?.trim()).toBe(Legend.toString());
  });

  test('displays the correct Legend when Legend is a date', () => {
    const Legend = new Date('2021-01-01');
    const { container } = render(<ChartPopover legend={Legend} isPopoverOpen={true} />);
    const LegendElement = getByText(container, '01/01/2021, 12:00:00 AM UTC');
    expect(LegendElement).toBeDefined();
    expect(LegendElement.textContent?.trim()).toBe('01/01/2021, 12:00:00 AM UTC');
  });

  test('displays the popover card correctly when Legend is undefined', () => {
    const Legend = undefined;
    const { container } = render(<ChartPopover legend={Legend} isPopoverOpen={true} />);
    const LegendElement = getByClass(container, /calloutlegendText/)[0] as HTMLElement;
    expect(LegendElement.children[0]).toBeUndefined();
  });

  test('displays the correct ratio', () => {
    const ratio: [number, number] = [1, 2];
    const { container } = render(<ChartPopover ratio={ratio} isPopoverOpen={true} />);
    expect(getByClass(container, /ratio/)).toBeDefined();
    const numerator = getByText(container, '1');
    expect(numerator).toBeDefined();
    expect(numerator.textContent).toBe(ratio[0].toLocaleString());
    const denominator = getByText(container, '2');
    expect(denominator).toBeDefined();
    expect(denominator.textContent).toBe(ratio[1].toLocaleString());
  });

  it('displays the correct descriptionMessage', () => {
    const descriptionMessage = 'Sample descriptionMessage';
    const { container } = render(<ChartPopover descriptionMessage={descriptionMessage} isPopoverOpen={true} />);
    const descriptionMessageElement = getByText(container, /Sample descriptionMessage/);
    expect(descriptionMessageElement).toBeDefined();
    expect(descriptionMessageElement.textContent?.trim()).toBe(descriptionMessage);
  });
});

describe('Popover - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<ChartPopover isPopoverOpen={true} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
