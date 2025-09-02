import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FunnelChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import { Switch, Field, Radio, RadioGroup } from '@fluentui/react-components';

export const FunnelChartBasic = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(600);
  const [height, setHeight] = React.useState<number>(500);
  const [hideLegend, setHideLegend] = React.useState<boolean>(false);
  const [orientation, setOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');
  const [legendMultiSelect, setLegendMultiSelect] = React.useState<boolean>(false);

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };

  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onToggleHideLegend = (ev: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }): void => {
    setHideLegend(data.checked);
  };

  const _onToggleLegendMultiSelect = (ev: React.ChangeEvent<HTMLInputElement>, data: { checked: boolean }): void => {
    setLegendMultiSelect(data.checked);
  };

  const _onOrientationChange = (ev: React.FormEvent<HTMLDivElement>, data: { value: string }): void => {
    setOrientation(data.value as 'horizontal' | 'vertical');
  };

  const basicData = [
    { stage: 'Visitors', value: 1000, color: getColorFromToken(DataVizPalette.color5) },
    { stage: 'Signups', value: 600, color: getColorFromToken(DataVizPalette.color6) },
    { stage: 'Trials', value: 300, color: getColorFromToken(DataVizPalette.color7) },
    { stage: 'Customers', value: 250, color: getColorFromToken(DataVizPalette.color10) },
  ];

  const rootStyle = {
    width: `${width}px`,
    height: `${height}px`,
    textAlign: 'center' as const,
  };

  return (
    <>
      <label htmlFor="changeWidth_Basic">Change Width:</label>
      <input
        type="range"
        value={width}
        min={200}
        max={1000}
        id="changeWidth_Basic"
        onChange={_onWidthChange}
        aria-valuetext={`ChangeWidthSlider${width}`}
      />
      <label htmlFor="changeHeight_Basic">Change Height:</label>
      <input
        type="range"
        value={height}
        min={200}
        max={1000}
        id="changeHeight_Basic"
        onChange={_onHeightChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
      <Switch label="Hide Legend" checked={hideLegend} onChange={_onToggleHideLegend} />
      <Switch label="Multiple Legend Selection" checked={legendMultiSelect} onChange={_onToggleLegendMultiSelect} />

      <Field label="Orientation">
        <RadioGroup value={orientation} onChange={_onOrientationChange}>
          <Radio value="horizontal" label="Horizontal" />
          <Radio value="vertical" label="Vertical" />
        </RadioGroup>
      </Field>
      <div style={rootStyle}>
        <FunnelChart
          data={basicData}
          chartTitle="Basic Funnel Chart"
          width={width}
          height={height}
          hideLegend={hideLegend}
          orientation={orientation}
          legendProps={{
            canSelectMultipleLegends: legendMultiSelect,
          }}
        />
      </div>
    </>
  );
};
FunnelChartBasic.parameters = {
  docs: {
    description: {},
  },
};
