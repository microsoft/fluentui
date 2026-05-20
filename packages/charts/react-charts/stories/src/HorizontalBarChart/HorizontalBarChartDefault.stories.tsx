import * as React from 'react';
import { HorizontalBarChart, DataVizGradientPalette, getGradientFromToken } from '@fluentui/react-charts';
import type { JSXElement } from '@fluentui/react-components';
import { Switch } from '@fluentui/react-components';

export const HorizontalBarBasic = (): JSXElement => {
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);
  const data = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient1),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '10%',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient2),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '5%',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient3),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '59%',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient4),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '106%',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient5),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '76%',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient6),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '93%',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient7),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '66%',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, total: 15000 },
          color: getGradientFromToken(DataVizGradientPalette.gradient8),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '28%',
        },
      ],
    },
  ];

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient ON' : 'Enable Gradient OFF'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />
      </div>
      <div style={{ maxWidth: 600 }}>
        <HorizontalBarChart
          data={data}
          chartDataMode={'default'}
          className={'hbcbasic'}
          enableGradient={enableGradient}
        />
      </div>
    </>
  );
};

HorizontalBarBasic.parameters = {
  docs: {
    description: {},
  },
};
