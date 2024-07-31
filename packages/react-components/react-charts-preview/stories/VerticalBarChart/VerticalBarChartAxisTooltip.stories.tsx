import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartProps, IVerticalBarChartDataPoint } from '../../src/VerticalBarChart';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox, ChoiceGroup, IChoiceGroupOption, Label, Stack, TextField } from '@fluentui/react';

const options: IChoiceGroupOption[] = [
  { key: 'WrapTickValues', text: 'Wrap X Axis Ticks' },
  { key: 'showTooltip', text: 'Show Tooltip at X axis ticks' },
];

export const VCAxisTooltip = () => {
  const [selectedCallout, setSelectedCallout] = React.useState<string>('showTooltip');
  const [barWidthEnabled, setBarWidthEnabled] = React.useState<boolean>(true);
  const [xAxisInnerPaddingEnabled, setXAxisInnerPaddingEnabled] = React.useState<boolean>(false);
  const [xAxisOuterPaddingEnabled, setXAxisOuterPaddingEnabled] = React.useState<boolean>(false);
  const [barWidth, setBarWidth] = React.useState<number>(16);
  const [maxBarWidth, setMaxBarWidth] = React.useState<number>(100);
  const [xAxisInnerPadding, setXAxisInnerPadding] = React.useState<number>(0.67);
  const [xAxisOuterPadding, setXAxisOuterPadding] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);

  const _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setBarWidthEnabled(checked);
  };
  const _onBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    setBarWidth(Number(newValue));
  };
  const _onMaxBarWidthChange = (e: React.FormEvent<HTMLInputElement>, newValue: string) => {
    setMaxBarWidth(Number(newValue));
  };
  const _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setXAxisInnerPaddingEnabled(checked);
  };
  const _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisInnerPadding(Number(e.target.value));
  };
  const _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: boolean) => {
    setXAxisOuterPaddingEnabled(checked);
  };
  const _onOuterPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisOuterPadding(Number(e.target.value));
  };
  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(Number(e.target.value));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  };
  const points: IVerticalBarChartDataPoint[] = [
    {
      x: 'Simple Text',
      y: 1000,
      color: DefaultPalette.accent,
    },
    {
      x: 'Showing all text here',
      y: 5000,
      color: DefaultPalette.blueDark,
    },
    {
      x: 'Large data, showing all text by tooltip',
      y: 3000,
      color: DefaultPalette.blueMid,
    },
    {
      x: 'Data',
      y: 2000,
      color: DefaultPalette.blue,
    },
  ];
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <Stack horizontal wrap tokens={{ childrenGap: 30 }}>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </Label>
          <input type="range" value={width} min={200} max={1000} onChange={_onWidthChange} id="input-width" />
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-height" style={{ fontWeight: 400 }}>
            height:&nbsp;
          </Label>
          <input type="range" value={height} min={200} max={1000} id="input-height" onChange={_onHeightChange} />
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox label="barWidth:&nbsp;" checked={barWidthEnabled} onChange={_onBarWidthCheckChange} />
          {barWidthEnabled ? (
            <TextField
              type="number"
              value={barWidth.toString()}
              min={1}
              max={300}
              onChange={_onBarWidthChange}
              disabled={!barWidthEnabled}
            />
          ) : (
            <code>'auto'</code>
          )}
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
            maxBarWidth:&nbsp;
          </Label>
          <TextField
            type="number"
            value={maxBarWidth.toString()}
            min={1}
            max={300}
            id="input-maxbarwidth"
            onChange={_onMaxBarWidthChange}
          />
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox
            label="xAxisInnerPadding:&nbsp;"
            checked={xAxisInnerPaddingEnabled}
            onChange={_onInnerPaddingCheckChange}
          />
          <input
            type="range"
            value={xAxisInnerPadding}
            min={0}
            max={1}
            step={0.01}
            onChange={_onInnerPaddingChange}
            disabled={!xAxisInnerPaddingEnabled}
          />
          <span>&nbsp;{xAxisInnerPadding}</span>
        </Stack>
        <Stack horizontal verticalAlign="center">
          <Checkbox
            label="xAxisOuterPadding:&nbsp;"
            checked={xAxisOuterPaddingEnabled}
            onChange={_onOuterPaddingCheckChange}
          />
          <input
            type="range"
            value={xAxisOuterPadding}
            min={0}
            max={1}
            step={0.01}
            onChange={_onOuterPaddingChange}
            disabled={!xAxisOuterPaddingEnabled}
          />
          <span>&nbsp;{xAxisOuterPadding}</span>
        </Stack>
      </Stack>
      <div>
        <ChoiceGroup
          options={options}
          defaultSelectedKey="showTooltip"
          // eslint-disable-next-line react/jsx-no-bind
          onChange={(_ev, option) => option && setSelectedCallout(option.key)}
          label="Pick one"
        />
      </div>
      <div style={rootStyle}>
        <VerticalBarChart
          chartTitle="Vertical bar chart axis tooltip example "
          data={points}
          height={height}
          width={width}
          hideLegend={true}
          hideTooltip={false}
          showXAxisLablesTooltip={selectedCallout === 'showTooltip' ? true : false}
          wrapXAxisLables={selectedCallout === 'WrapTickValues' ? true : false}
          enableReflow={true}
          barWidth={barWidthEnabled ? barWidth : 'auto'}
          maxBarWidth={maxBarWidth}
          xAxisInnerPadding={xAxisInnerPaddingEnabled ? xAxisInnerPadding : undefined}
          xAxisOuterPadding={xAxisOuterPaddingEnabled ? xAxisOuterPadding : undefined}
        />
      </div>
    </>
  );
};
VCAxisTooltip.parameters = {
  docs: {
    description: {
      story: 'A Calendar Compat can be modified to allow selecting a contiguous (5 day) work week.',
    },
  },
};
