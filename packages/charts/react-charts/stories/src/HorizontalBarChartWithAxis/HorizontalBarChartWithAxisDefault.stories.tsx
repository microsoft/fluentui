import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HorizontalBarChartWithAxisDataPoint,
  HorizontalBarChartWithAxis,
  getColorFromToken,
  DataVizPalette,
} from '@fluentui/react-charts';
import {
  Checkbox,
  CheckboxOnChangeData,
  Switch,
  Field,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
} from '@fluentui/react-components';

export const HorizontalBarWithAxisBasic = (): JSXElement => {
  const [width, setWidth] = React.useState<number>(650);
  const [height, setHeight] = React.useState<number>(350);
  const [isCalloutselected, setIsCalloutselected] = React.useState<boolean>(false);
  const [useSingleColor, setUseSingleColor] = React.useState<boolean>(false);
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);
  const [selectMultipleLegends, setSelectMultipleLegends] = React.useState<boolean>(false);

  const points: HorizontalBarChartWithAxisDataPoint[] = [
    {
      x: 10000,
      y: 5000,
      legend: 'Oranges',
      color: getColorFromToken(DataVizPalette.color1),
      // gradient: getGradientFromToken(DataVizGradientPalette.gradient1),
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '10%',
    },
    {
      x: 20000,
      y: 50000,
      legend: 'Dogs',
      color: getColorFromToken(DataVizPalette.color2),
      // gradient: getGradientFromToken(DataVizGradientPalette.gradient2),
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '20%',
    },
    {
      x: 25000,
      y: 30000,
      legend: 'Apples',
      color: getColorFromToken(DataVizPalette.color3),
      // gradient: getGradientFromToken(DataVizGradientPalette.gradient3),
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '37%',
    },
    {
      x: 40000,
      y: 13000,
      legend: 'Bananas',
      color: getColorFromToken(DataVizPalette.color4),
      // gradient: getGradientFromToken(DataVizGradientPalette.gradient4),
      yAxisCalloutData: '2020/04/30',
      xAxisCalloutData: '88%',
    },
  ];

  const _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(e.target.value, 10));
  };
  const _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(e.target.value, 10));
  };

  const _onChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    if (isCalloutselected) {
      setIsCalloutselected(false);
    } else {
      setIsCalloutselected(true);
    }
  };
  const _onCheckChange = (ev: React.ChangeEvent<HTMLElement>, checked: CheckboxOnChangeData) => {
    setUseSingleColor(checked.checked as boolean);
  };

  const _onSwitchGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const _onSwitchRoundMultipleLegendSelection = React.useCallback((ev: any) => {
    setSelectMultipleLegends(ev.currentTarget.checked);
  }, []);

  //const lineOptions: ILineChartLineOptions = { lineBorderWidth: '2' };

  const rootStyle = { width: `${width}px`, height: `${height}px` };

  return (
    <>
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
      <Field label="Pick one">
        <RadioGroup defaultValue="basicExample" onChange={_onChange}>
          <Radio value="Basic Example" label="Basic Example" />
          <Radio value="Custom Callout Example" label="Custom Callout Example" />
        </RadioGroup>
      </Field>
      <div style={{ marginTop: '20px' }}>
        <Checkbox
          label="use single color(This will have only one color)"
          checked={useSingleColor}
          onChange={_onCheckChange}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Switch label={enableGradient ? 'Enable Gradient ON' : 'Enable Gradient OFF'} onChange={_onSwitchGradient} />
        &nbsp;&nbsp;
        <Switch label={roundCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'} onChange={_onSwitchRoundCorners} />
        &nbsp;&nbsp;
        <Switch
          label={selectMultipleLegends ? 'Select multiple legends ON' : 'Select multiple legends OFF'}
          onChange={_onSwitchRoundMultipleLegendSelection}
        />
      </div>
      <br />

      <div style={rootStyle}>
        <HorizontalBarChartWithAxis
          culture={window.navigator.language}
          chartTitle="Horizontal bar chart basic example "
          data={points}
          width={width}
          useSingleColor={useSingleColor}
          height={height}
          enableGradient={enableGradient}
          roundCorners={roundCorners}
          legendProps={{
            canSelectMultipleLegends: selectMultipleLegends,
          }}
        />
      </div>
    </>
  );
};
HorizontalBarWithAxisBasic.parameters = {
  docs: {
    description: {},
  },
};
