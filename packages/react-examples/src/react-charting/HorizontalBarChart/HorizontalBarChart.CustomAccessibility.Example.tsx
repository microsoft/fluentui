import * as React from 'react';
import { HorizontalBarChart, IChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import { ThemeContext } from '@fluentui/react';

export const HorizontalBarChartCustomAccessibilityExample: React.FunctionComponent<{}> = () => {
  const theme = React.useContext(ThemeContext);

  const getData = (isDarkMode: boolean): IChartProps[] => {
    return [
      {
        chartTitle: 'one',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about one' },
        chartDataAccessibilityData: { ariaLabel: 'Data 1543 of 15000' },
        chartData: [
          {
            legend: 'one',
            horizontalBarChartdata: { x: 1543, y: 15000 },
            color: getColorFromToken(DataVizPalette.color9, isDarkMode),
            xAxisCalloutData: '2021/06/10',
            yAxisCalloutData: '10%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart one 2021/06/10 10%' },
          },
        ],
      },
      {
        chartTitle: 'two',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about two' },
        chartDataAccessibilityData: { ariaLabel: 'Data 800 of 15000' },
        chartData: [
          {
            legend: 'two',
            horizontalBarChartdata: { x: 800, y: 15000 },
            color: getColorFromToken(DataVizPalette.color10, isDarkMode),
            xAxisCalloutData: '2021/06/11',
            yAxisCalloutData: '5%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart two 2021/06/11 5%' },
          },
        ],
      },
      {
        chartTitle: 'three',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about three' },
        chartDataAccessibilityData: { ariaLabel: 'Data 8888 of 15000' },
        chartData: [
          {
            legend: 'three',
            horizontalBarChartdata: { x: 8888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color11, isDarkMode),
            xAxisCalloutData: '2021/06/12',
            yAxisCalloutData: '59%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart three 2021/06/12 59%' },
          },
        ],
      },
      {
        chartTitle: 'four',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about four' },
        chartDataAccessibilityData: { ariaLabel: 'Data 15888 of 15000' },
        chartData: [
          {
            legend: 'four',
            horizontalBarChartdata: { x: 15888, y: 15000 },
            color: getColorFromToken(DataVizPalette.color12, isDarkMode),
            xAxisCalloutData: '2021/06/13',
            yAxisCalloutData: '105%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart four 2021/06/13 105%' },
          },
        ],
      },
      {
        chartTitle: 'five',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about five' },
        chartDataAccessibilityData: { ariaLabel: 'Data 11444 of 15000' },
        chartData: [
          {
            legend: 'five',
            horizontalBarChartdata: { x: 11444, y: 15000 },
            color: getColorFromToken(DataVizPalette.color13, isDarkMode),
            xAxisCalloutData: '2021/06/14',
            yAxisCalloutData: '76%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart five 2021/06/14 76%' },
          },
        ],
      },
      {
        chartTitle: 'six',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about six' },
        chartDataAccessibilityData: { ariaLabel: 'Data 14000 of 15000' },
        chartData: [
          {
            legend: 'six',
            horizontalBarChartdata: { x: 14000, y: 15000 },
            color: getColorFromToken(DataVizPalette.color14, isDarkMode),
            xAxisCalloutData: '2021/06/15',
            yAxisCalloutData: '93%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart six 2021/06/15 93%' },
          },
        ],
      },
      {
        chartTitle: 'seven',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about seven' },
        chartDataAccessibilityData: { ariaLabel: 'Data 9855 of 15000' },
        chartData: [
          {
            legend: 'seven',
            horizontalBarChartdata: { x: 9855, y: 15000 },
            color: getColorFromToken(DataVizPalette.color15, isDarkMode),
            xAxisCalloutData: '2021/06/16',
            yAxisCalloutData: '65%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart seven 2021/06/16 65%' },
          },
        ],
      },
      {
        chartTitle: 'eight',
        chartTitleAccessibilityData: { ariaLabel: 'Bar chart depicting about eight' },
        chartDataAccessibilityData: { ariaLabel: 'Data 4250 of 15000' },
        chartData: [
          {
            legend: 'eight',
            horizontalBarChartdata: { x: 4250, y: 15000 },
            color: getColorFromToken(DataVizPalette.color16, isDarkMode),
            xAxisCalloutData: '2021/06/17',
            yAxisCalloutData: '28%',
            callOutAccessibilityData: { ariaLabel: 'Bar series 1 of chart eight 2021/06/17 28%' },
          },
        ],
      },
    ];
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <HorizontalBarChart data={getData(theme?.isInverted ?? false)} />
    </div>
  );
};
