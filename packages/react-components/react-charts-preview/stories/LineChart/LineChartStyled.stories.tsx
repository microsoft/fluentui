import * as React from 'react';
import { LineChart, ILineChartProps, ChartHoverCard, ICustomizedCalloutData } from '@fluentui/react-charting';
import { getColorFromToken, DataVizPalette } from '../../src/utilities/colors';
import { Toggle } from '@fluentui/react/lib/Toggle';

export const LCStyled = (props: ILineChartProps) => {
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
          // eslint-disable-next-line react/jsx-no-bind
          onRenderCalloutPerDataPoint={(props: ICustomizedCalloutData) =>
            props ? (
              <ChartHoverCard
                XValue={`${props.values[0].xAxisCalloutData}`}
                Legend={'Custom Legend'}
                YValue={`${props.values[0].yAxisCalloutData || props.values[0].y} h`}
                color={'red'}
              />
            ) : null
          }
          enablePerfOptimization={true}
          legendProps={{
            styles: {
              legend: {
                textTransform: 'none',
              },
            },
          }}
        />
      </div>
    </>
  );
};
LCStyled.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
