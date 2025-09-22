import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VSChartDataPoint,
  VerticalStackedChartProps,
  VerticalStackedBarChart,
  LineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const VerticalStackedBarCustomAccessibility = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [showLine, setShowLine] = React.useState<boolean>(true);
  const [barGapMax, setBarGapMax] = React.useState<number>(2);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onShowLineChange = (e: React.FormEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setShowLine(checked.checked as boolean);
  };

  const firstChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 40,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '61%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1-1 of 4, 2020/04/30 Metadata1 61%' },
    },
    {
      legend: 'Metadata2',
      data: 5,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '8%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1-2 of 4, 2020/04/30 Metadata2 8%' },
    },
    {
      legend: 'Metadata3',
      data: 20,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '31%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 1-3 of 4, 2020/04/30 Metadata3 31%' },
    },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 30,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '33%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2-1 of 4, 2020/04/30 Metadata1 33%' },
    },
    {
      legend: 'Metadata2',
      data: 20,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '22%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2-2 of 4, 2020/04/30 Metadata2 22%' },
    },
    {
      legend: 'Metadata3',
      data: 40,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '45%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 2-3 of 4, 2020/04/30 Metadata3 45%' },
    },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Metadata1',
      data: 44,
      color: getColorFromToken(DataVizPalette.color2),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '43%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3-1 of 4, 2020/04/30 Metadata1 43%' },
    },
    {
      legend: 'Metadata2',
      data: 28,
      color: getColorFromToken(DataVizPalette.color1),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '27%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3-2 of 4, 2020/04/30 Metadata2 27%' },
    },
    {
      legend: 'Metadata3',
      data: 30,
      color: getColorFromToken(DataVizPalette.color6),
      xAxisCalloutData: '2020/04/30',
      yAxisCalloutData: '30%',
      callOutAccessibilityData: { ariaLabel: 'Bar series 3-3 of 4, 2020/04/30 Metadata3 30%' },
    },
  ];

  const data: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: 0,

      ...(showLine && {
        lineData: [
          { y: 42, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
          { y: 10, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color2) },
        ],
      }),
      stackCallOutAccessibilityData: {
        ariaLabel:
          'Bar stack series 1 of 3, 0 MetaDate1 61% MetaData2 8% MetaDate3 31% ' +
          'Recommended Builds 10 Supported Builds 42',
      },
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: 20,
      ...(showLine && {
        lineData: [{ y: 33, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) }],
      }),
      stackCallOutAccessibilityData: {
        ariaLabel: 'Bar stack series 2 of 3, 20 MetaDate1 33% MetaData2 22% MetaDate3 45% ' + 'Supported Builds 33',
      },
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: 40,
      ...(showLine && {
        lineData: [
          { y: 60, legend: 'Supported Builds', color: getColorFromToken(DataVizPalette.color5) },
          { y: 20, legend: 'Recommended Builds', color: getColorFromToken(DataVizPalette.color2) },
        ],
      }),
      stackCallOutAccessibilityData: {
        ariaLabel:
          'Bar stack series 3 of 3, 40 MetaDate1 43% MetaData 27% MetaDate3 30% ' +
          'Recommended Builds 20 Supported Builds 60',
      },
    },
  ];

  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth_Custom">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          id="changeWidth_Custom"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight_Custom">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight_Custom"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
        <label htmlFor="ChangeBarGapMax_Custom">BarGapMax:</label>
        <input
          type="range"
          value={barGapMax}
          min={0}
          max={10}
          id="ChangeBarGapMax_Custom"
          onChange={e => setBarGapMax(+e.target.value)}
          aria-valuetext={`ChangebarGapMaxSlider${barGapMax}`}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="show the lines (hide or show the lines)" checked={showLine} onChange={_onShowLineChange} />
      </div>
      <div style={rootStyle}>
        <VerticalStackedBarChart
          chartTitle="Vertical stacked bar chart custom accessibility example"
          barGapMax={barGapMax}
          data={data}
          height={height}
          width={width}
          lineOptions={lineOptions}
          legendProps={{
            allowFocusOnLegends: true,
          }}
        />
      </div>
    </div>
  );
};
VerticalStackedBarCustomAccessibility.parameters = {
  docs: {
    description: {},
  },
};
