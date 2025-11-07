import * as React from 'react';
import {
  ChartProps,
  LineChartProps,
  LineChart,
  DataVizPalette,
  getColorFromToken,
  ChartAnnotation,
} from '@fluentui/react-charts';
import { JSXElement, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const LineChartAnnotationsExample = (props: LineChartProps): JSXElement => {
  const classes = useStyles();
  const [width, setWidth] = React.useState<number>(960);
  const [height, setHeight] = React.useState<number>(520);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const chartData: ChartProps = {
    chartTitle: 'Weekly signups',
    lineChartData: [
      {
        legend: 'Signups',
        color: getColorFromToken(DataVizPalette.color3),
        data: [
          { x: 0, y: 18 },
          { x: 1, y: 26 },
          { x: 2, y: 31 },
          { x: 3, y: 37 },
          { x: 4, y: 44 },
          { x: 5, y: 51 },
          { x: 6, y: 47 },
        ],
      },
    ],
  };

  const primaryColor = getColorFromToken(DataVizPalette.color3);
  const experimentColor = getColorFromToken(DataVizPalette.color6);
  const milestoneColor = '#d83b01';

  const annotations: ChartAnnotation[] = [
    {
      id: 'launch-html',
      text: `<div><strong>Launch day</strong><br /><span style="color:${primaryColor}">+18% conversions</span></div>`,
      coordinates: { type: 'data', x: 1, y: 26 },
      layout: {
        align: 'start',
        verticalAlign: 'bottom',
        offsetX: 16,
        offsetY: -68,
        maxWidth: 220,
        clipToBounds: true,
      },
      style: {
        backgroundColor: '#ffffff',
        borderColor: primaryColor,
        borderWidth: 1,
        borderRadius: 12,
        padding: '12px 16px',
        fontWeight: 600,
        boxShadow: '0 12px 24px rgba(15, 23, 42, 0.18)',
      },
      connector: {
        strokeColor: primaryColor,
        strokeWidth: 2,
        startPadding: 24,
        endPadding: 6,
        arrow: 'end',
      },
    },
    {
      id: 'experiment',
      text: `<div><strong>Pricing experiment</strong><br /><em>A/B test running</em><ul><li>Variant B at 52%</li>
        <li>Average order ↑</li></ul></div>`,
      coordinates: { type: 'data', x: 3, y: 37 },
      layout: {
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 132,
        offsetY: -12,
        maxWidth: 280,
        clipToBounds: false,
      },
      style: {
        backgroundColor: '#f4f9ff',
        borderColor: experimentColor,
        borderWidth: 1,
        borderRadius: 16,
        padding: '14px 18px',
        boxShadow: '0 10px 20px rgba(15, 23, 42, 0.16)',
      },
      connector: {
        strokeColor: experimentColor,
        strokeWidth: 2,
        startPadding: 18,
        endPadding: 4,
        dashArray: '5, 5',
        arrow: 'end',
      },
    },
    {
      id: 'stretch-goal',
      text: `<span>Stretch goal<br /><strong>5k signups</strong></span>`,
      coordinates: { type: 'relative', x: 0.84, y: 0.34 },
      layout: { align: 'center', verticalAlign: 'middle', clipToBounds: false },
      style: {
        backgroundColor: 'rgba(216, 59, 1, 0.08)',
        borderColor: milestoneColor,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderRadius: 8,
        padding: '6px 14px',
        textColor: milestoneColor,
        fontWeight: 600,
      },
    },
    {
      id: 'offset-info',
      text: `<div><strong>Note:</strong> Values rounded to nearest whole signup.</div>`,
      coordinates: { type: 'pixel', x: 24, y: 24 },
      layout: { align: 'start', verticalAlign: 'top', clipToBounds: false },
      style: {
        backgroundColor: '#ffffff',
        borderColor: '#c7c7c7',
        borderWidth: 1,
        borderRadius: 6,
        padding: '8px 12px',
        fontSize: '12px',
      },
    },
  ];

  const rootStyle = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <label htmlFor="changeWidth_Styled">Change Width:</label>
        <input
          type="range"
          value={width}
          min={200}
          max={1500}
          id="changeWidth_Styled"
          onChange={_onWidthChange}
          aria-valuetext={`ChangeWidthSlider${width}`}
        />
        <span>{width}</span>
        <label htmlFor="changeHeight_Styled">Change Height:</label>
        <input
          type="range"
          value={height}
          min={200}
          max={1500}
          id="changeHeight_Styled"
          onChange={_onHeightChange}
          aria-valuetext={`ChangeHeightslider${height}`}
        />
        <span>{height}</span>
      </div>
      <div style={rootStyle}>
        <LineChart
          data={chartData}
          annotations={annotations}
          height={height}
          width={width}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </div>
  );
};

LineChartAnnotationsExample.parameters = {
  docs: {
    description: {},
  },
};
