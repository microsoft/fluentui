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
import { useId, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const VerticalStackedBarSecondaryYAxis = (): JSXElement => {
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
  const firstChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Electronics',
      data: 120,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      legend: 'Furniture',
      data: 80,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      legend: 'Clothing',
      data: 150,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      legend: 'Groceries',
      data: 200,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      legend: 'Toys',
      data: 90,
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Electronics',
      data: 140,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      legend: 'Furniture',
      data: 100,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      legend: 'Clothing',
      data: 130,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      legend: 'Groceries',
      data: 220,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      legend: 'Toys',
      data: 110,
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Electronics',
      data: 160,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      legend: 'Furniture',
      data: 120,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      legend: 'Clothing',
      data: 140,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      legend: 'Groceries',
      data: 250,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      legend: 'Toys',
      data: 100,
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  const fourthChartPoints: VSChartDataPoint[] = [
    {
      legend: 'Electronics',
      data: 180,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      legend: 'Furniture',
      data: 140,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      legend: 'Clothing',
      data: 160,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      legend: 'Groceries',
      data: 300,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      legend: 'Toys',
      data: 120,
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  const data: VerticalStackedChartProps[] = [
    {
      chartData: firstChartPoints,
      xAxisPoint: 0,
      lineData: [
        {
          y: 150,
          legend: 'Sales Target',
          color: getColorFromToken(DataVizPalette.color9),
          useSecondaryYScale: true,
        },
      ],
    },
    {
      chartData: secondChartPoints,
      xAxisPoint: 20,
      lineData: [
        {
          y: 180,
          legend: 'Sales Target',
          color: getColorFromToken(DataVizPalette.color9),
          useSecondaryYScale: true,
        },
      ],
    },
    {
      chartData: thirdChartPoints,
      xAxisPoint: 40,
      lineData: [
        {
          y: 200,
          legend: 'Sales Target',
          color: getColorFromToken(DataVizPalette.color9),
          useSecondaryYScale: true,
        },
      ],
    },
    {
      chartData: fourthChartPoints,
      xAxisPoint: 60,
      lineData: [
        {
          y: 250,
          legend: 'Sales Target',
          color: getColorFromToken(DataVizPalette.color9),
          useSecondaryYScale: true,
        },
      ],
    },
  ];

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const lineOptions: LineChartLineOptions = { lineBorderWidth: '2' };
  const barGapMax = 2;

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
        <VerticalStackedBarChart
          chartTitle="Vertical stacked bar chart secondary y-axis example"
          data={data}
          height={height}
          width={width}
          barGapMax={barGapMax}
          lineOptions={lineOptions}
          hideTickOverlap={true}
          yAxisTitle="Variation of number of sales"
          xAxisTitle="Number of days"
          secondaryYScaleOptions={{}}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </div>
  );
};
VerticalStackedBarSecondaryYAxis.parameters = {
  docs: {
    description: {},
  },
};
