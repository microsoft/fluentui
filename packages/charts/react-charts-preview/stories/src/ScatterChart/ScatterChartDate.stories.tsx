import * as React from 'react';
import { ScatterChart, DataVizPalette, getColorFromToken, ChartProps } from '@fluentui/react-charts-preview';
import { Switch, Checkbox, CheckboxOnChangeData } from '@fluentui/react-components';

export const ScatterChartDate = () => {
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
        legend: 'From_Legacy_to_O365',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 216000,
            markerSize: 10,
          },
          {
            x: new Date('2020-03-03T10:00:00.000Z'),
            y: 218123,
            markerSize: 33,
          },
          {
            x: new Date('2020-03-03T11:00:00.000Z'),
            y: 217124,
            markerSize: 11,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 248000,
            markerSize: 13,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 252000,
            markerSize: 5,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 274000,
            markerSize: 17,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 260000,
            markerSize: 20,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 304000,
            markerSize: 11,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 218000,
            markerSize: 29,
          },
        ],
        color: DataVizPalette.color3,
        onLineClick: () => console.log('From_Legacy_to_O365'),
      },
      {
        legend: 'All',
        data: [
          {
            x: new Date('2020-03-03T00:00:00.000Z'),
            y: 297000,
            markerSize: 10,
          },
          {
            x: new Date('2020-03-04T00:00:00.000Z'),
            y: 284000,
            markerSize: 20,
          },
          {
            x: new Date('2020-03-05T00:00:00.000Z'),
            y: 282000,
            markerSize: 8,
          },
          {
            x: new Date('2020-03-06T00:00:00.000Z'),
            y: 294000,
            markerSize: 15,
          },
          {
            x: new Date('2020-03-07T00:00:00.000Z'),
            y: 224000,
            markerSize: 4,
          },
          {
            x: new Date('2020-03-08T00:00:00.000Z'),
            y: 300000,
            markerSize: 8,
          },
          {
            x: new Date('2020-03-09T00:00:00.000Z'),
            y: 298000,
            markerSize: 10,
          },
        ],
        color: DataVizPalette.color4,
      },
      {
        legend: 'single point',
        data: [
          {
            x: new Date('2020-03-05T12:00:00.000Z'),
            y: 232000,
            markerSize: 30,
          },
        ],
        color: DataVizPalette.color5,
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
ScatterChartDate.parameters = {
  docs: {
    description: {},
  },
};
