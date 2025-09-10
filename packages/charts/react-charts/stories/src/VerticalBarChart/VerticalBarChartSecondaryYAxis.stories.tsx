import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VerticalBarChart,
  VerticalBarChartDataPoint,
  LineChartLineOptions,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { useId, tokens, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const VerticalBarSecondaryYAxis = (): JSXElement => {
  const classes = useStyles();
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
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 0,
      y: 10000,
      legend: 'Oranges',
      color: getColorFromToken(DataVizPalette.color1),
      lineData: {
        y: 7000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 10000,
      y: 50000,
      legend: 'Dogs',
      color: getColorFromToken(DataVizPalette.color2),
      lineData: {
        y: 30000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: getColorFromToken(DataVizPalette.color3),
      lineData: {
        y: 3000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: getColorFromToken(DataVizPalette.color6),
    },
    {
      x: 52000,
      y: 43000,
      legend: 'Giraffes',
      color: getColorFromToken(DataVizPalette.color11),
      lineData: {
        y: 30000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 68000,
      y: 30000,
      legend: 'Cats',
      color: getColorFromToken(DataVizPalette.color4),
      lineData: {
        y: 5000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 80000,
      y: 20000,
      legend: 'Elephants',
      color: getColorFromToken(DataVizPalette.color11),
      lineData: {
        y: 16000,
        useSecondaryYScale: true,
      },
    },
    {
      x: 92000,
      y: 45000,
      legend: 'Monkeys',
      color: getColorFromToken(DataVizPalette.color6),
      lineData: {
        y: 40000,
        useSecondaryYScale: true,
      },
    },
  ];

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };

  return (
    <div className="containerDiv">
      <label htmlFor={_widthSliderId}>Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        onChange={_onWidthChange}
        id={_widthSliderId}
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
        <VerticalBarChart
          chartTitle="Vertical bar chart secondary y-axis example "
          data={points}
          width={width}
          height={height}
          lineLegendText="just line"
          lineLegendColor="brown"
          lineOptions={lineOptions}
          hideTickOverlap={true}
          yAxisTitle="Values of each category"
          xAxisTitle="Different categories of animals and fruits"
          secondaryYScaleOptions={{}}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </div>
  );
};
VerticalBarSecondaryYAxis.parameters = {
  docs: {
    description: {},
  },
};
