import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DataVizPalette, GaugeChart, getColorFromToken } from '@fluentui/react-charts';
import { Checkbox, CheckboxOnChangeData, Switch } from '@fluentui/react-components';

export const GaugeChartBasic = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(252);
  const [height, setHeight] = React.useState<number>(128);
  const [chartValue, setChartValue] = React.useState<number>(50);
  const [hideMinMax, setHideMinMax] = React.useState<boolean>(false);
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundedCorners, setRoundedCorners] = React.useState<boolean>(false);
  const [legendMultiSelect, setLegendMultiSelect] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };
  const _onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChartValue(parseInt(e.target.value, 10));
  };
  const _onHideMinMaxCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setHideMinMax(checked.checked as boolean);
  };

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundedCorners = React.useCallback((ev: any) => {
    setRoundedCorners(ev.currentTarget.checked);
  }, []);

  const _onSwitchLegendMultiSelect = React.useCallback((ev: any) => {
    setLegendMultiSelect(ev.currentTarget.checked);
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
      <div style={{ marginTop: '20px' }}>
        <Checkbox label="Hide min and max values" checked={hideMinMax} onChange={_onHideMinMaxCheckChange} />
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
        &nbsp;&nbsp;
        <Switch
          label={legendMultiSelect ? 'legendMultiSelect ON' : 'legendMultiSelect OFF'}
          checked={legendMultiSelect}
          onChange={_onSwitchLegendMultiSelect}
        />
      </div>

      <GaugeChart
        width={width}
        height={height}
        segments={[
          {
            size: 33,
            color: getColorFromToken(DataVizPalette.success),
            legend: 'Low Risk',
          },
          {
            size: 34,
            color: getColorFromToken(DataVizPalette.warning),
            legend: 'Medium Risk',
          },
          {
            size: 33,
            color: getColorFromToken(DataVizPalette.error),
            legend: 'High Risk',
          },
        ]}
        chartValue={chartValue}
        hideMinMax={hideMinMax}
        variant={'multiple-segments'}
        enableGradient={enableGradient}
        roundCorners={roundedCorners}
        legendProps={{
          canSelectMultipleLegends: legendMultiSelect,
        }}
      />
    </>
  );
};
GaugeChartBasic.parameters = {
  docs: {
    description: {},
  },
};
