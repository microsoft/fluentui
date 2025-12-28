import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ScatterChart, DataVizPalette, ChartProps } from '@fluentui/react-charts';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const ScatterChartDate = (): JSXElement => {
  const classes = useStyles();
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const data: ChartProps = {
    chartTitle: 'Website Traffic and Sales Performance',
    scatterChartData: [
      {
        legend: 'Website Traffic',
        data: [
          {
            x: new Date('2023-03-01T00:00:00.000Z'),
            y: 5000, // Number of visitors
            markerSize: 15, // Number of transactions
          },
          {
            x: new Date('2023-03-02T00:00:00.000Z'),
            y: 7000,
            markerSize: 20,
          },
          {
            x: new Date('2023-03-03T00:00:00.000Z'),
            y: 6500,
            markerSize: 18,
          },
          {
            x: new Date('2023-03-04T00:00:00.000Z'),
            y: 8000,
            markerSize: 25,
          },
          {
            x: new Date('2023-03-05T00:00:00.000Z'),
            y: 9000,
            markerSize: 30,
          },
          {
            x: new Date('2023-03-06T00:00:00.000Z'),
            y: 8500,
            markerSize: 28,
          },
          {
            x: new Date('2023-03-07T00:00:00.000Z'),
            y: 9500,
            markerSize: 35,
          },
        ],
        color: DataVizPalette.color3,
      },
      {
        legend: 'Sales Performance',
        data: [
          {
            x: new Date('2023-03-01T00:00:00.000Z'),
            y: 2000, // Revenue in dollars
            markerSize: 10, // Number of transactions
          },
          {
            x: new Date('2023-03-02T00:00:00.000Z'),
            y: 3000,
            markerSize: 15,
          },
          {
            x: new Date('2023-03-03T00:00:00.000Z'),
            y: 2500,
            markerSize: 12,
          },
          {
            x: new Date('2023-03-04T00:00:00.000Z'),
            y: 4000,
            markerSize: 20,
          },
          {
            x: new Date('2023-03-05T00:00:00.000Z'),
            y: 4500,
            markerSize: 22,
          },
          {
            x: new Date('2023-03-06T00:00:00.000Z'),
            y: 4200,
            markerSize: 18,
          },
          {
            x: new Date('2023-03-07T00:00:00.000Z'),
            y: 5000,
            markerSize: 25,
          },
        ],
        color: DataVizPalette.color4,
      },
      {
        legend: 'Promotional Campaign',
        data: [
          {
            x: new Date('2023-03-05T12:00:00.000Z'),
            y: 6000, // Revenue spike due to promotion
            markerSize: 40, // Number of transactions
          },
        ],
        color: DataVizPalette.color5,
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <text>Scatter chart date x example.</text>
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
      <div style={rootStyle}>
        <ScatterChart
          culture={window.navigator.language}
          data={data}
          height={height}
          width={width}
          xAxisTitle={'Date'}
          yAxisTitle={'Number of visitors'}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </>
  );
};
ScatterChartDate.parameters = {
  docs: {
    description: {},
  },
};
