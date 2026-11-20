import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { DeclarativeChart } from './DeclarativeChart';

describe('DeclarativeChart focus restoration', () => {
  beforeEach(() => {
    jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      width: 600,
      height: 400,
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      bottom: 400,
      right: 600,
      toJSON: () => ({}),
    });
    jest.spyOn(global, 'requestAnimationFrame').mockImplementation(callback => {
      callback(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    {
      name: 'gauge',
      data: [
        {
          type: 'indicator',
          mode: 'gauge+number',
          value: 25,
          gauge: {
            axis: { range: [0, 100] },
            steps: [
              { range: [0, 50], name: 'First' },
              { range: [50, 100], name: 'Second' },
            ],
          },
        },
      ],
      target: 'path[role="option"]',
    },
    {
      name: 'vertical bar',
      data: [{ type: 'bar', name: 'First', x: ['First', 'Second'], y: [10, 20] }],
      target: 'rect[role="option"]',
    },
    {
      name: 'line',
      data: [
        { type: 'scatter', mode: 'lines', line: { shape: 'linear' }, name: 'First', x: [1, 2], y: [10, 20] },
        { type: 'scatter', mode: 'lines', line: { shape: 'linear' }, name: 'Second', x: [1, 2], y: [20, 30] },
      ],
      target: 'path[id^="lineID"][tabindex="0"]',
    },
  ])('keeps focus on the $name legend after a legend toggle', ({ data, target }) => {
    const { container } = render(
      <DeclarativeChart chartSchema={{ plotlySchema: { data, layout: { showlegend: true } } }} />,
    );
    const chartElement = container.querySelector<SVGElement>(target);
    expect(chartElement).not.toBeNull();
    act(() => chartElement!.focus());
    expect(container.ownerDocument.activeElement).toBe(chartElement);
    const legend = container.querySelector<HTMLButtonElement>('button[role="option"]');
    expect(legend).not.toBeNull();
    act(() => legend!.focus());

    fireEvent.click(legend!);

    expect(container.ownerDocument.activeElement).toBe(legend);
  });
});
