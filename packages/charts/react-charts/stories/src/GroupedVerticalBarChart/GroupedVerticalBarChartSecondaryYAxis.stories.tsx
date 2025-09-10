import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  GroupedVerticalBarChart,
  DataVizPalette,
  getColorFromToken,
  GroupedVerticalBarChartData,
} from '@fluentui/react-charts';
import { useId } from '@fluentui/react-components';

export const GroupedVerticalBarSecondaryYAxis = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(700);
  const [height, setHeight] = React.useState<number>(300);
  const _widthSliderId = useId('width-slider-');
  const _heightSliderId = useId('height-slider-');
  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const data: GroupedVerticalBarChartData[] = [
    {
      name: 'Jan - Mar',
      series: [
        {
          key: 'series1',
          data: 24000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
        },
        {
          key: 'series2',
          data: 54000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2022',
          useSecondaryYScale: true,
        },
      ],
    },
    {
      name: 'Apr - Jun',
      series: [
        {
          key: 'series1',
          data: 12000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
        },
        {
          key: 'series2',
          data: 9000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2022',
          useSecondaryYScale: true,
        },
      ],
    },
    {
      name: 'Jul - Sep',
      series: [
        {
          key: 'series1',
          data: 10000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
        },
        {
          key: 'series2',
          data: 60000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2022',
          useSecondaryYScale: true,
        },
      ],
    },
    {
      name: 'Oct - Dec',
      series: [
        {
          key: 'series1',
          data: 15000,
          color: getColorFromToken(DataVizPalette.color6),
          legend: '2021',
        },
        {
          key: 'series2',
          data: 6000,
          color: getColorFromToken(DataVizPalette.color5),
          legend: '2022',
          useSecondaryYScale: true,
        },
      ],
    },
  ];

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <div className="containerDiv">
      <label htmlFor={_widthSliderId}>Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        id={_widthSliderId}
        onChange={_onWidthChange}
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor={_heightSliderId}>Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id={_heightSliderId}
        onChange={_onHeightChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
      <div style={rootStyle}>
        <GroupedVerticalBarChart
          chartTitle="Grouped Vertical Bar chart secondary y-axis example"
          data={data}
          height={height}
          width={width}
          barWidth={16}
          hideTickOverlap={true}
          secondaryYScaleOptions={{}}
        />
      </div>
    </div>
  );
};
GroupedVerticalBarSecondaryYAxis.parameters = {
  docs: {
    description: {},
  },
};
