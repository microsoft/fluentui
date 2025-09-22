import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { ScatterChart, DataVizPalette, ChartProps } from '@fluentui/react-charts';
import { makeStyles, Switch, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  svgTooltip: {
    fill: tokens.colorNeutralBackground2,
  },
});

export const ScatterChartDefault = (): JSXElement => {
  const classes = useStyles();
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onToggleMultiLegendSelection = React.useCallback((ev: any) => {
    setSelectMultipleLegends(ev.currentTarget.checked);
  }, []);

  const data: ChartProps = {
    chartTitle: 'Project Revenue and Transactions Over Time',
    scatterChartData: [
      {
        legend: 'Phase 1',
        data: [
          {
            x: 10,
            y: 50000,
            markerSize: 12, // Number of transactions
          },
          {
            x: 20,
            y: 75000,
            markerSize: 15,
          },
          {
            x: 30,
            y: 90000,
            markerSize: 18,
          },
          {
            x: 40,
            y: 120000,
            markerSize: 22,
          },
          {
            x: 50,
            y: 150000,
            markerSize: 25,
          },
        ],
        color: DataVizPalette.color3,
      },
      {
        legend: 'Phase 2',
        data: [
          {
            x: 60,
            y: 180000,
            markerSize: 28,
          },
          {
            x: 70,
            y: 200000,
            markerSize: 30,
          },
          {
            x: 80,
            y: 220000,
            markerSize: 32,
          },
          {
            x: 90,
            y: 250000,
            markerSize: 35,
          },
          {
            x: 100,
            y: 300000,
            markerSize: 40,
          },
        ],
        color: DataVizPalette.color4,
      },
      {
        legend: 'Milestone',
        data: [
          {
            x: 75,
            y: 250000,
            markerSize: 50, // Large number of transactions
          },
        ],
        color: DataVizPalette.color5,
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
      <text>Scatter chart numeric x example.</text>
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
      <div style={{ marginBottom: '10px' }}>
        <Switch
          label="Select Multiple Legends"
          checked={selectMultipleLegends}
          onChange={_onToggleMultiLegendSelection}
        />
      </div>
      <div style={rootStyle}>
        <ScatterChart
          culture={window.navigator.language}
          data={data}
          height={height}
          width={width}
          xAxisTitle={'Days since project start'}
          yAxisTitle={'Revenue in dollars'}
          legendProps={{
            canSelectMultipleLegends: selectMultipleLegends,
          }}
          styles={{ svgTooltip: classes.svgTooltip }}
        />
      </div>
    </>
  );
};

ScatterChartDefault.parameters = {
  docs: {
    description: {},
  },
};
