import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { GroupedVerticalBarChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const GroupedVerticalBarDefault = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };

  const data = [
    {
      name: 'Jan - Mar',
      series: [
        {
          key: 'series1',
          data: 33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/04/30',
          yAxisCalloutData: '29%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 1 of 2 2022, x value 2022/04/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: 44000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/04/30',
          yAxisCalloutData: '44%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 2 of 2 2023, x value 2023/04/30, y value 44%',
          },
        },
        {
          key: 'series3',
          data: 54000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/04/30',
          yAxisCalloutData: '44%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 3 of 4 2022, x value 2024/04/30, y value 44%',
          },
        },
        {
          key: 'series4',
          data: 24000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/04/30',
          yAxisCalloutData: '44%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jan - Mar 1 of 4, Bar series 4 of 4 2021, x value 2021/04/30, y value 44%',
          },
        },
      ],
    },
    {
      name: 'Apr - Jun',
      series: [
        {
          key: 'series1',
          data: 33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/05/30',
          yAxisCalloutData: '29%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 1 of 2 2022, x value 2022/05/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: 3000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/05/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 2 of 2 2023, x value 2023/05/30, y value 3%',
          },
        },
        {
          key: 'series3',
          data: 9000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/05/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 3 of 4 2024, x value 2024/05/30, y value 3%',
          },
        },
        {
          key: 'series4',
          data: 12000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/05/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Apr - Jun 2 of 4, Bar series 4 of 4 2021, x value 2021/05/30, y value 3%',
          },
        },
      ],
    },

    {
      name: 'Jul - Sep',
      series: [
        {
          key: 'series1',
          data: 14000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/06/30',
          yAxisCalloutData: '13%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 1 of 2 2022, x value 2022/06/30, y value 13%',
          },
        },
        {
          key: 'series2',
          data: 50000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/06/30',
          yAxisCalloutData: '50%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 2 of 2 2023, x value 2023/06/30, y value 50%',
          },
        },
        {
          key: 'series3',
          data: 60000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/06/30',
          yAxisCalloutData: '50%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 3 of 4 2024, x value 2024/06/30, y value 50%',
          },
        },
        {
          key: 'series4',
          data: 10000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/06/30',
          yAxisCalloutData: '50%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Jul - Sep 3 of 4, Bar series 4 of 4 2021, x value 2021/06/30, y value 50%',
          },
        },
      ],
    },
    {
      name: 'Oct - Dec',
      series: [
        {
          key: 'series1',
          data: 33000,
          color: getColorFromToken(DataVizPalette.color3),
          legend: '2022',
          xAxisCalloutData: '2022/07/30',
          yAxisCalloutData: '29%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 1 of 2 2022, x value 2022/07/30, y value 29%',
          },
        },
        {
          key: 'series2',
          data: 3000,
          color: getColorFromToken(DataVizPalette.color4),
          legend: '2023',
          xAxisCalloutData: '2023/07/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 2 of 2 2023, x value 2023/07/30, y value 3%',
          },
        },
        {
          key: 'series3',
          data: 6000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2024',
          xAxisCalloutData: '2024/07/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 3 of 4 2024, x value 2024/07/30, y value 3%',
          },
        },
        {
          key: 'series4',
          data: 15000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
          xAxisCalloutData: '2021/07/30',
          yAxisCalloutData: '3%',
          callOutAccessibilityData: {
            ariaLabel: 'Group Oct - Dec 4 of 4, Bar series 4 of 4 2021, x value 2021/07/30, y value 3%',
          },
        },
      ],
    },
  ];
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <text>
        In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
        So instead of a numeric value, the callout will show the date that is passed in the{' '}
        <code>xAxisCalloutData</code> property.
      </text>
      <br />
      <div style={{ display: 'flex' }}>
        <label htmlFor="changeWidth">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1000}
          onChange={_onWidthChange}
          id="changeWidth"
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <label htmlFor="changeHeight">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1000}
          id="changeHeight"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <div style={rootStyle}>
        <GroupedVerticalBarChart
          culture={window.navigator.language}
          chartTitle="Grouped Vertical Bar chart basic example"
          data={data}
          height={height}
          width={width}
          hideLabels={hideLabels}
        />
      </div>
    </>
  );
};
GroupedVerticalBarDefault.parameters = {
  docs: {
    description: {},
  },
};
