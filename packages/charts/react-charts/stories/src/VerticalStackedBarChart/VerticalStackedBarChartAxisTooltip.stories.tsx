import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  VSChartDataPoint,
  VerticalStackedChartProps,
  VerticalStackedBarChart,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import {
  Checkbox,
  Switch,
  Field,
  Radio,
  RadioGroup,
  CheckboxOnChangeData,
  CheckboxProps,
  Input,
  InputProps,
  InputOnChangeData,
} from '@fluentui/react-components';

export const VerticalStackedBarAxisTooltip = (): JSXElement => {
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
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);

  const _onBarWidthCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setBarWidthEnabled(checked.checked as boolean);
  };
  const _onBarWidthChange: InputProps['onChange'] = (
    ev: React.FormEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setBarWidth(Number(data.value));
  };
  const _onMaxBarWidthChange: InputProps['onChange'] = (
    ev: React.FormEvent<HTMLInputElement>,
    data: InputOnChangeData,
  ) => {
    setMaxBarWidth(Number(data.value));
  };
  const _onInnerPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisInnerPaddingEnabled(checked.checked as boolean);
  };
  const _onInnerPaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXAxisInnerPadding(Number(e.target.value));
  };
  const _onOuterPaddingCheckChange = (e: React.FormEvent<HTMLInputElement>, checked: CheckboxOnChangeData) => {
    setXAxisOuterPaddingEnabled(checked.checked as boolean);
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

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundedCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const firstChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 2, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata2', data: 0.5, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata3', data: 0, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const secondChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 30, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata2', data: 3, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata3', data: 40, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const thirdChartPoints: VSChartDataPoint[] = [
    { legend: 'Metadata1', data: 10, color: getColorFromToken(DataVizPalette.color1) },
    { legend: 'Metadata2', data: 60, color: getColorFromToken(DataVizPalette.color2) },
    { legend: 'Metadata3', data: 30, color: getColorFromToken(DataVizPalette.color6) },
  ];

  const data: VerticalStackedChartProps[] = [
    { chartData: firstChartPoints, xAxisPoint: 'Simple Data' },
    { chartData: secondChartPoints, xAxisPoint: 'Long text will disaply all text' },
    { chartData: thirdChartPoints, xAxisPoint: 'Data' },
    { chartData: firstChartPoints, xAxisPoint: 'Meta data' },
  ];

  const rootStyle = { width: `${width}px`, height: `${height}px` };
  const barGapMax = 2;
  return (
    <div className="containerDiv">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-width" style={{ fontWeight: 400 }}>
            width:&nbsp;
          </label>
          <input type="range" value={width} min={200} max={1000} onChange={_onWidthChange} id="input-width" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-height" style={{ fontWeight: 400 }}>
            height:&nbsp;
          </label>
          <input type="range" value={height} min={200} max={1000} id="input-height" onChange={_onHeightChange} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox label="barWidth:&nbsp;" checked={barWidthEnabled} onChange={_onBarWidthCheckChange} />
          {barWidthEnabled ? (
            <Input
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
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor="input-maxbarwidth" style={{ fontWeight: 400 }}>
            maxBarWidth:&nbsp;
          </label>
          <Input
            type="number"
            value={maxBarWidth.toString()}
            min={1}
            max={300}
            id="input-maxbarwidth"
            onChange={_onMaxBarWidthChange}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
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

        <div style={{ display: 'flex', alignItems: 'center' }}>
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
        <Field label="Pick one">
          <RadioGroup defaultValue="showTooltip" onChange={(_ev, option) => option && setSelectedCallout(option.value)}>
            <Radio value="WrapTickValues" label="Wrap X Axis Ticks" />
            <Radio value="showTooltip" label="Show Tooltip at X Axis Ticks" />
          </RadioGroup>
        </Field>

        <Switch
          label={enableGradient ? 'Enable Gradient' : 'Disable Gradient'}
          checked={enableGradient}
          onChange={_onSwitchGradient}
        />

        <Switch
          label={roundCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
          checked={roundCorners}
          onChange={_onSwitchRoundedCorners}
        />
      </div>

      <div style={rootStyle}>
        <VerticalStackedBarChart
          chartTitle="Vertical stacked bar chart axis tooltip example"
          data={data}
          height={height}
          width={width}
          showXAxisLablesTooltip={selectedCallout === 'showTooltip' ? true : false}
          wrapXAxisLables={selectedCallout === 'WrapTickValues' ? true : false}
          barWidth={barWidthEnabled ? barWidth : 'auto'}
          maxBarWidth={maxBarWidth}
          xAxisInnerPadding={xAxisInnerPaddingEnabled ? xAxisInnerPadding : undefined}
          xAxisOuterPadding={xAxisOuterPaddingEnabled ? xAxisOuterPadding : undefined}
          enableGradient={enableGradient}
          roundCorners={roundCorners}
          barGapMax={barGapMax}
        />
      </div>
    </div>
  );
};
VerticalStackedBarAxisTooltip.parameters = {
  docs: {
    description: {},
  },
};
