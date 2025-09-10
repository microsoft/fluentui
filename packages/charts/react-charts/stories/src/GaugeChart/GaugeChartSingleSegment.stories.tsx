import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, GaugeChart, getColorFromToken } from '@fluentui/react-charts';
import { Switch } from '@fluentui/react-components';

export const GaugeChartSingleSegment = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(252);
  const [height, setHeight] = React.useState<number>(173);
  const [chartValue, setChartValue] = React.useState<number>(50);
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundedCorners, setRoundedCorners] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartValue(parseInt(e.target.value, 10));
  };
  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundedCorners = React.useCallback((ev: any) => {
    setRoundedCorners(ev.currentTarget.checked);
  }, []);

  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex' }}>
          <label htmlFor="width-slider">Width:</label>
          <input
            type="range"
            value={width}
            min={0}
            max={1000}
            id="width-slider"
            onChange={_onWidthChange}
            aria-valuetext={`Width: ${width}`}
          />
          <span>{width}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="height-slider">Height:</label>
          <input
            type="range"
            value={height}
            min={0}
            max={1000}
            id="height-slider"
            onChange={_onHeightChange}
            aria-valuetext={`Height: ${height}`}
          />
          <span>{height}</span>
        </div>
        <div style={{ display: 'flex' }}>
          <label htmlFor="value-slider">Current value:</label>
          <input
            type="range"
            value={chartValue}
            min={0}
            max={100}
            id="value-slider"
            onChange={_onValueChange}
            aria-valuetext={`Current value: ${chartValue}`}
          />
          <span>{chartValue}</span>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient' : 'Disable Gradient'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />
        &nbsp;&nbsp;
        <Switch
          label={roundedCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          checked={roundedCorners}
          onChange={_onSwitchRoundedCorners}
        />
      </div>

      <GaugeChart
        width={width}
        height={height}
        segments={[
          { size: chartValue, legend: 'Used' },
          {
            size: 100 - chartValue,
            color: getColorFromToken(DataVizPalette.color5),
            legend: 'Available',
          },
        ]}
        chartValue={chartValue}
        chartTitle="Storage capacity"
        sublabel="used"
        chartValueFormat={'fraction'}
        variant={'single-segment'}
        enableGradient={enableGradient}
        roundCorners={roundedCorners}
      />
    </>
  );
};
GaugeChartSingleSegment.parameters = {
  docs: {
    description: {},
  },
};
