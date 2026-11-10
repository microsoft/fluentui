import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { ChartTypes, createNumericYAxis, createStringYAxis, XAxisTypes } from '../../utilities/index';
import { CartesianChart } from './CartesianChart';

describe('CartesianChart events', () => {
  it('separates keyboard blur from mouse leave', () => {
    const onChartBlur = jest.fn();
    const onChartMouseLeave = jest.fn();
    const { container } = render(
      <CartesianChart
        points={[]}
        chartType={ChartTypes.LineChart}
        xAxisType={XAxisTypes.NumericAxis}
        width={300}
        height={200}
        legendBars={null}
        hideLegend
        hideTooltip
        tickParams={{}}
        getDomainNRangeValues={() => ({ dStartValue: 0, dEndValue: 1, rStartValue: 0, rEndValue: 100 })}
        getMinMaxOfYAxis={() => ({ startValue: 0, endValue: 1 })}
        createYAxis={createNumericYAxis}
        createStringYAxis={createStringYAxis}
        onChartBlur={onChartBlur}
        onChartMouseLeave={onChartMouseLeave}
      >
        {() => null}
      </CartesianChart>,
    );
    const chart = container.querySelector<HTMLDivElement>('[role="presentation"]');

    expect(chart).not.toBeNull();
    fireEvent.blur(chart!);
    expect(onChartBlur).toHaveBeenCalledTimes(1);
    expect(onChartMouseLeave).not.toHaveBeenCalled();

    fireEvent.mouseLeave(chart!);
    expect(onChartMouseLeave).toHaveBeenCalledTimes(1);
    expect(onChartBlur).toHaveBeenCalledTimes(1);
  });
});
