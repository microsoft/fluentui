import * as React from 'react';
import { ScatterChart, DataVizPalette, getColorFromToken, ChartProps } from '@fluentui/react-charts-preview';
import { Switch, Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const ScatterChartString = () => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [hideLabels, setHideLabels] = React.useState<boolean>(false);
  const [showAxisTitles, setShowAxisTitles] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onHideLabelsCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideLabels(checked.checked as boolean);
  };
  const _onToggleAxisTitlesCheckChange = React.useCallback(ev => {
    setShowAxisTitles(ev.currentTarget.checked);
  }, []);

  const data: ChartProps = {
    chartTitle: 'Line Chart Basic Example',
    lineChartData: [
      {
        legend: 'Series 1',
        data: [
          {
            x: 'Cat S1.1',
            y: 216,
            markerSize: 10,
          },
          {
            x: 'Cat S1.2',
            y: 181,
            markerSize: 40,
          },
          {
            x: 'Cat S1.3',
            y: 124,
            markerSize: 8,
          },
          {
            x: 'Cat S1.4',
            y: 248,
            markerSize: 15,
          },
          {
            x: 'Cat S2.2',
            y: 52,
            markerSize: 13,
          },
          {
            x: 'Cat S2.3',
            y: 740,
            markerSize: 19,
          },
        ],
        color: DataVizPalette.color3,
      },
      {
        legend: 'Series 2',
        data: [
          {
            x: 'Cat S2.1',
            y: 97,
            markerSize: 20,
          },
          {
            x: 'Cat S2.2',
            y: 284,
            markerSize: 17,
          },
          {
            x: 'Cat S1.3',
            y: 182,
            markerSize: 11,
          },
          {
            x: 'Cat S2.3',
            y: 94,
            markerSize: 60,
          },
          {
            x: 'Cat S1.5',
            y: 154,
            markerSize: 4,
          },
          {
            x: 'Cat S1.6',
            y: 30,
            markerSize: 12,
          },
          {
            x: 'Cat S1.7',
            y: 498,
            markerSize: 29,
          },
        ],
        color: DataVizPalette.color4,
      },
    ],
  };

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <text>
        In this example the <code>xAxisCalloutData</code> property overrides the x value that is shown on the callout.
        So instead of a numeric value, the callout will show the date that is passed in the{' '}
        <code>xAxisCalloutData</code> property.
      </text>
      <br />
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
      <div style={{ marginTop: '10px' }}>
        <Checkbox label="Hide labels" checked={hideLabels} onChange={_onHideLabelsCheckChange} />
      </div>
      <Switch
        label={showAxisTitles ? 'Show axis titles' : 'Hide axis titles'}
        checked={showAxisTitles}
        onChange={_onToggleAxisTitlesCheckChange}
        style={{ marginTop: '10px' }}
      />
      <div style={rootStyle}>
        <ScatterChart culture={window.navigator.language} data={data} height={height} width={width} />
      </div>
    </>
  );
};
ScatterChartString.parameters = {
  docs: {
    description: {},
  },
};
