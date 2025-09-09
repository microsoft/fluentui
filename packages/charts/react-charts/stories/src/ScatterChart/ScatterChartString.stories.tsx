import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ScatterChart, DataVizPalette, ChartProps } from '@fluentui/react-charts';
import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const ScatterChartString = (): JSXElement => {
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
    chartTitle: 'Sales Performance by Category',
    scatterChartData: [
      {
        legend: 'Region 1',
        data: [
          {
            x: 'Electronics',
            y: 50000, // Revenue in dollars
            markerSize: 25, // Units sold
          },
          {
            x: 'Furniture',
            y: 30000,
            markerSize: 20,
          },
          {
            x: 'Clothing',
            y: 20000,
            markerSize: 15,
          },
          {
            x: 'Toys',
            y: 15000,
            markerSize: 10,
          },
          {
            x: 'Books',
            y: 10000,
            markerSize: 8,
          },
        ],
        color: DataVizPalette.color3,
      },
      {
        legend: 'Region 2',
        data: [
          {
            x: 'Electronics',
            y: 60000,
            markerSize: 30,
          },
          {
            x: 'Furniture',
            y: 25000,
            markerSize: 18,
          },
          {
            x: 'Clothing',
            y: 22000,
            markerSize: 16,
          },
          {
            x: 'Toys',
            y: 12000,
            markerSize: 12,
          },
          {
            x: 'Books',
            y: 8000,
            markerSize: 6,
          },
        ],
        color: DataVizPalette.color4,
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <text>Scatter chart string x example.</text>
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
          xAxisTitle={'Product Category'}
          yAxisTitle={'Revenue in dollars'}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </>
  );
};
ScatterChartString.parameters = {
  docs: {
    description: {},
  },
};
