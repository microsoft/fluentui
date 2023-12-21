import { fireEvent } from '@testing-library/dom';
import { testWithWait } from '../../utilities/TestUtility.test';
import { HorizontalBarChartWithAxis } from './HorizontalBarChartWithAxis';
import { points_HBCWA } from '../../utilities/data';

describe('HorizontalBarChartWithAxis - mouse events', () => {
  testWithWait(
    'Should render callout correctly on mouseover',
    HorizontalBarChartWithAxis,
    { data: points_HBCWA, calloutProps: { doNotLayer: true } },
    container => {
      const bars = container.querySelectorAll('rect');
      fireEvent.mouseOver(bars[1]);
      expect(container).toMatchSnapshot();
    },
  );
});
