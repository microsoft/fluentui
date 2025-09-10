import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { VerticalBarChart, VerticalBarChartDataPoint } from '@fluentui/react-charts';
import {
  Checkbox,
  Field,
  Radio,
  RadioGroup,
  CheckboxOnChangeData,
  CheckboxProps,
  Input,
  InputProps,
  InputOnChangeData,
} from '@fluentui/react-components';

export const VerticalBarAxisTooltip = (): JSXElement => {
  const [selectedCallout, setSelectedCallout] = React.useState<string>('showTooltip');
  const [barWidthEnabled, setBarWidthEnabled] = React.useState<CheckboxProps['checked']>(true);
  const [xAxisInnerPaddingEnabled, setXAxisInnerPaddingEnabled] = React.useState<CheckboxProps['checked']>(false);
  const [xAxisOuterPaddingEnabled, setXAxisOuterPaddingEnabled] = React.useState<CheckboxProps['checked']>(false);
  const [barWidth, setBarWidth] = React.useState<number>(16);
  const [maxBarWidth, setMaxBarWidth] = React.useState<number>(100);
  const [xAxisInnerPadding, setXAxisInnerPadding] = React.useState<number>(0.67);
  const [xAxisOuterPadding, setXAxisOuterPadding] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);

  const _onBarWidthCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setBarWidthEnabled(checked.checked);
  };
  const _onBarWidthChange: InputProps['onChange'] = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setBarWidth(Number(data.value));
  };
  const _onMaxBarWidthChange: InputProps['onChange'] = (
    ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setMaxBarWidth(Number(data.value));
  };
  const _onInnerPaddingCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisInnerPaddingEnabled(checked.checked);
  };
  const _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisInnerPadding(Number(e.target.value));
  };
  const _onOuterPaddingCheckChange = (e: React.ChangeEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisOuterPaddingEnabled(checked.checked);
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
  const points: VerticalBarChartDataPoint[] = [
    {
      x: 'Simple Text',
      y: 1000,
      color: 'dodgerblue',
    },
    {
      x: 'Showing all text here',
      y: 5000,
      color: 'midnightblue',
    },
    {
      x: 'Large data, showing all text by tooltip',
      y: 3000,
      color: 'darkblue',
    },
    {
      x: 'Data',
      y: 2000,
      color: 'deepskyblue',
    },
  ];
  const rootStyle = { width: `${width}px`, height: `${height}px` };
  return (
    <>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </label>
          <input type="range" value={width} min={200} max={1000} onChange={_onWidthChange} id="input-width" />
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-height" style={{ fontWeight: 400 }}>
            height:&nbsp;
          </label>
          <input type="range" value={height} min={200} max={1000} id="input-height" onChange={_onHeightChange} />
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <Checkbox label="barWidth:&nbsp;" checked={barWidthEnabled} onChange={_onBarWidthCheckChange} />
          {barWidthEnabled ? (
            <Input
              type="number"
              min={1}
              max={300}
              value={barWidth.toString()}
              onChange={_onBarWidthChange}
              disabled={!barWidthEnabled}
            />
          ) : (
            <code>'auto'</code>
          )}
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
          <label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
            maxBarWidth:&nbsp;
          </label>
          <Input
            type="number"
            min={1}
            max={300}
            value={maxBarWidth.toString()}
            id="input-maxbarwidth"
            onChange={_onMaxBarWidthChange}
          />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
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
        </div>
        <div style={{ justifyContent: 'center', verticalAlign: 'center' }}>
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
        </div>
      </div>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <Field label="Pick one">
          <RadioGroup defaultValue="showTooltip" onChange={(_ev, option) => option && setSelectedCallout(option.value)}>
            <Radio value="WrapTickValues" label="Wrap X Axis Ticks" />
            <Radio value="showTooltip" label="Show Tooltip at X Axis Ticks" />
          </RadioGroup>
        </Field>
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
          barWidth={barWidthEnabled ? barWidth : 'auto'}
          maxBarWidth={maxBarWidth}
          xAxisInnerPadding={xAxisInnerPaddingEnabled ? xAxisInnerPadding : undefined}
          xAxisOuterPadding={xAxisOuterPaddingEnabled ? xAxisOuterPadding : undefined}
        />
      </div>
    </>
  );
};
VerticalBarAxisTooltip.parameters = {
  docs: {
    description: {},
  },
};
