import { fireEvent } from '@testing-library/dom';
import { testWithWait } from '../../utilities/TestUtility.test';
import { HorizontalBarChartWithAxis } from './HorizontalBarChartWithAxis';
import { pointsHBCWA } from '../../utilities/test-data';
import { act, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import * as React from 'react';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('HorizontalBarChartWithAxis - mouse events', () => {
  testWithWait(
    'Should render callout correctly on mouseover',
    HorizontalBarChartWithAxis,
    { data: pointsHBCWA, calloutProps: { doNotLayer: true } },
    container => {
      const bars = container.querySelectorAll('rect');
      fireEvent.mouseOver(bars[1]);
      expect(container).toMatchSnapshot();
    },
  );
});

describe('Horizontal Bar Chart With Axis - axe-core', () => {
  test('Should pass accessibility tests', async () => {
    const { container } = render(<HorizontalBarChartWithAxis data={pointsHBCWA} />);
    let axeResults;
    await act(async () => {
      axeResults = await axe(container);
    });
    expect(axeResults).toHaveNoViolations();
  });
});
