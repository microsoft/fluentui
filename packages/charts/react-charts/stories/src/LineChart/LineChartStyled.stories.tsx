import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { LineChartProps, LineChart, DataVizPalette } from '@fluentui/react-charts';

export const LineChartStyled = (props: LineChartProps): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const points = [
    {
      data: [
        { x: new Date('2018/01/06'), y: 10, xAxisCalloutData: 'Appointment 1' },
        { x: new Date('2018/01/16'), y: 18, xAxisCalloutData: 'Appointment 2' },
        { x: new Date('2018/01/20'), y: 24, xAxisCalloutData: 'Appointment 3' },
        { x: new Date('2018/01/24'), y: 35, xAxisCalloutData: 'Appointment 4' },
        { x: new Date('2018/01/26'), y: 35, xAxisCalloutData: 'Appointment 5' },
        { x: new Date('2018/01/29'), y: 90, xAxisCalloutData: 'Appointment 6' },
      ],
      legend: 'first legend',
      lineOptions: {
        lineBorderWidth: '4',
      },
      color: DataVizPalette.color10,
    },
  ];

  const data = {
    chartTitle: 'Line Chart',
    lineChartData: points,
  };
  const rootStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Styled"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Styled">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Styled"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <div style={rootStyle}>
        <LineChart
          data={data}
          strokeWidth={4}
          yMaxValue={90}
          showXAxisLablesTooltip
          height={height}
          width={width}
          tickFormat={'%m/%d'}
          tickValues={[new Date('2018-01-01'), new Date('2018-02-09')]}
          enablePerfOptimization={true}
        />
      </div>
    </>
  );
};
LineChartStyled.parameters = {
  docs: {
    description: {},
  },
};
