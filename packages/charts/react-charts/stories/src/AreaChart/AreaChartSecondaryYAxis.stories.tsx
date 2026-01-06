import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { AreaChart, ChartProps, LineChartDataPoint, LineChartPoints } from '@fluentui/react-charts';
import { makeStyles, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const AreaChartSecondaryYAxis = (): JSXElement => {
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
  const chart1Points: LineChartDataPoint[] = [
    {
      x: 20,
      y: 7000,
    },
    {
      x: 25,
      y: 9000,
    },
    {
      x: 30,
      y: 13000,
    },
    {
      x: 35,
      y: 15000,
    },
    {
      x: 40,
      y: 11000,
    },
    {
      x: 45,
      y: 8760,
    },
    {
      x: 50,
      y: 3500,
    },
    {
      x: 55,
      y: 20000,
    },
    {
      x: 60,
      y: 17000,
    },
    {
      x: 65,
      y: 1000,
    },
    {
      x: 70,
      y: 12000,
    },
    {
      x: 75,
      y: 6876,
    },
    {
      x: 80,
      y: 12000,
    },
    {
      x: 85,
      y: 7000,
    },
    {
      x: 90,
      y: 10000,
    },
  ];

  const chart2Points: LineChartDataPoint[] = chart1Points.map((point, index) => {
    return {
      x: point.x,
      y: point.y + Math.floor(Math.random() * 10000),
    };
  });

  const chartPoints: LineChartPoints[] = [
    {
      legend: 'legend1',
      data: chart1Points,
    },
    {
      legend: 'legend2',
      data: chart2Points,
      useSecondaryYScale: true,
    },
  ];

  const chartData: ChartProps = {
    chartTitle: 'Area chart secondary y-axis example',
    lineChartData: chartPoints,
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
        <AreaChart
          height={height}
          width={width}
          data={chartData}
          enablePerfOptimization={true}
          hideTickOverlap={true}
          yAxisTitle="Variation of stock market prices"
          xAxisTitle="Number of days"
          secondaryYAxistitle="Variation of stock market prices 2"
          secondaryYScaleOptions={{}}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </div>
  );
};
AreaChartSecondaryYAxis.parameters = {
  docs: {
    description: {},
  },
};
