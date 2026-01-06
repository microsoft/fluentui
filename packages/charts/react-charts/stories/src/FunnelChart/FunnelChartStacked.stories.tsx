import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { FunnelChart, DataVizPalette, getColorFromToken } from '@fluentui/react-charts';
import { Switch, Field, Radio, RadioGroup } from '@fluentui/react-components';

export const FunnelChartStacked = (): JSXElement => {
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

  const stackedData = [
    {
      stage: 'Visit',
      subValues: [
        { category: 'A', value: 100, color: getColorFromToken(DataVizPalette.color5) },
        { category: 'B', value: 80, color: getColorFromToken(DataVizPalette.color6) },
        { category: 'C', value: 50, color: getColorFromToken(DataVizPalette.color14) },
        { category: 'D', value: 30, color: getColorFromToken(DataVizPalette.color2) },
      ],
    },
    {
      stage: 'Sign-Up',
      subValues: [
        { category: 'A', value: 60, color: getColorFromToken(DataVizPalette.color5) },
        { category: 'B', value: 40, color: getColorFromToken(DataVizPalette.color6) },
        { category: 'C', value: 20, color: getColorFromToken(DataVizPalette.color14) },
        { category: 'D', value: 10, color: getColorFromToken(DataVizPalette.color2) },
      ],
    },
    {
      stage: 'Purchase',
      subValues: [
        { category: 'A', value: 30, color: getColorFromToken(DataVizPalette.color5) },
        { category: 'B', value: 20, color: getColorFromToken(DataVizPalette.color6) },
        { category: 'C', value: 10, color: getColorFromToken(DataVizPalette.color14) },
        { category: 'D', value: 5, color: getColorFromToken(DataVizPalette.color2) },
      ],
    },
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
          data={stackedData}
          chartTitle="Stacked Funnel Chart"
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
FunnelChartStacked.parameters = {
  docs: {
    description: {},
  },
};
