import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ChartProps, LineChart, DataVizPalette } from '@fluentui/react-charts';
import { useId } from '@fluentui/react-components';

export const LineChartSecondaryYAxis = (): JSXElement => {
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
  const data: ChartProps = {
    chartTitle: 'Line Chart',
    lineChartData: [
      {
        legend: 'From_Legacy_to_O365',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 216,
          },
          {
            x: new Date('2020-03-03T10:00:00.000Z'),
            y: 218,
          },
          {
            x: new Date('2020-03-03T11:00:00.000Z'),
            y: 217,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 248,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: -252,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 274,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: -260,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 304,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 218,
          },
        ],
        color: DataVizPalette.color3,
      },
      {
        legend: 'All',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 297,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 284,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 282,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: -294,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 224,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: -300,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 298,
          },
        ],
        color: DataVizPalette.color4,
        useSecondaryYScale: true,
      },
    ],
  };

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
        <LineChart
          data={data}
          height={height}
          width={width}
          enablePerfOptimization={true}
          useUTC={true}
          hideTickOverlap={true}
          secondaryYScaleOptions={{}}
        />
      </div>
    </div>
  );
};
LineChartSecondaryYAxis.parameters = {
  docs: {
    description: {},
  },
};
