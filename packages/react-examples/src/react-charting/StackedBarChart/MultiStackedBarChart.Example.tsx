import * as React from 'react';
import {
  ChartHoverCard,
  IChartDataPoint,
  MultiStackedBarChart,
  IChartProps,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charting';
import { Toggle } from '@fluentui/react/lib/Toggle';

export const MultiStackedBarChartExample: React.FunctionComponent<{}> = () => {
  const [enableGradient, setEnableGradient] = React.useState(false);
  const [roundCorners, setRoundCorners] = React.useState(false);

  const firstChartPoints: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
    },
    {
      legend: 'Passport numbers (USA)',
      data: 23,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '23%',
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
    },
    {
      legend: 'Credit card numbers',
      data: 87,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: getColorFromToken(DataVizPalette.color9),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];
  const firstChartPoints1: IChartDataPoint[] = [
    {
      legend: 'Debit card numbers (EU and USA)',
      data: 40,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '40%',
    },
    {
      legend: 'Passport numbers (USA)',
      data: 56,
      color: getColorFromToken(DataVizPalette.color5),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '56%',
    },
    {
      legend: 'Social security numbers',
      data: 35,
      color: getColorFromToken(DataVizPalette.color3),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '35%',
    },
    {
      legend: 'Credit card numbers',
      data: 92,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '92%',
    },
    {
      legend: 'Tax identification numbers (USA)',
      data: 87,
      color: getColorFromToken(DataVizPalette.color9),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];

  const secondChartPoints: IChartDataPoint[] = [
    {
      legend: 'Phone Numbers',
      data: 40,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
    {
      legend: 'Credit card Numbers',
      data: 23,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '87%',
    },
  ];

  const hideRatio: boolean[] = [false, true, false];

  const hideDenominator: boolean[] = [true, true, false];

  const data: IChartProps[] = [
    {
      chartTitle: 'Monitored',
      chartData: firstChartPoints,
    },
    {
      chartTitle: 'Monitored Second Chart',
      chartData: firstChartPoints1,
    },
    {
      chartTitle: 'Unmonitored',
      chartData: secondChartPoints,
    },
  ];

  function onToggleGradient(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    setEnableGradient(checked);
  }

  function onToggleRoundCorners(ev: React.MouseEvent<HTMLElement>, checked: boolean) {
    setRoundCorners(checked);
  }

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Toggle
          label="Enable Gradient"
          onText="ON"
          offText="OFF"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onToggleGradient}
        />
        &nbsp;&nbsp;
        <Toggle
          label="Rounded Corners"
          onText="ON"
          offText="OFF"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onToggleRoundCorners}
        />
      </div>
      <br />
      <MultiStackedBarChart
        culture={window.navigator.language}
        data={data}
        hideDenominator={hideDenominator}
        hideRatio={hideRatio}
        width={600}
        href={'https://developer.microsoft.com/en-us/'}
        focusZonePropsForLegendsInHoverCard={{ 'aria-label': 'legends Container' }}
        legendsOverflowText={'OverFlow Items'}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <ChartHoverCard Legend={props.legend} YValue={props.yAxisCalloutData || props.data} color={props.color} />
          ) : null
        }
        enableGradient={enableGradient}
        roundCorners={roundCorners}
      />
    </>
  );
};
