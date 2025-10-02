import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  HorizontalBarChartWithAxis,
  HorizontalBarChartWithAxisDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts';
import { Field, Radio, RadioGroup, RadioGroupOnChangeData, Switch } from '@fluentui/react-components';

export const HorizontalBarWithAxisNegative = (): JSXElement => {
  const [selectedCallout, setSelectedCallout] = React.useState<string>('showTooltip');
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);

  const _onToggleGradient = React.useCallback((ev: any) => {
    setEnableGradient(ev.currentTarget.checked);
  }, []);

  const _onToggleRoundedCorners = React.useCallback((ev: any) => {
    setRoundCorners(ev.currentTarget.checked);
  }, []);

  const _onChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    setSelectedCallout(data.value);
  };

  const _generateData = (): HorizontalBarChartWithAxisDataPoint[] => {
    const data: HorizontalBarChartWithAxisDataPoint[] = [];
    const categories = ['A', 'B', 'C', 'D', 'E'];
    const series = ['Series 1', 'Series 2', 'Series 3', 'Series 4'];
    const colors = [
      getColorFromToken(DataVizPalette.color1),
      getColorFromToken(DataVizPalette.color2),
      getColorFromToken(DataVizPalette.color3),
      getColorFromToken(DataVizPalette.color4),
    ];
    const negativeData1 = [-10, -20, -30, -40, -50];
    const positiveData1 = [10, 20, 30, 40, 50];
    const positiveData2 = [20, 30, 40, 50, 60];
    const negativeData2 = [-20, -30, -40, -50, -60];

    const positiveData3 = [30, 40, 50, 60, 70];
    const negativeData3 = [-30, -40, -50, -60, -70];

    const positiveData4 = [40, 50, 60, 70, 80];
    const negativeData4 = [-40, -50, -60, -70, -80];

    return data.concat(
      categories.map((category, index) => ({
        x: positiveData1[index],
        y: category,
        legend: series[0],
        color: colors[0],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData1[index],
        y: category,
        legend: series[0],
        color: colors[0],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData2[index],
        y: category,
        legend: series[1],
        color: colors[1],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData2[index],
        y: category,
        legend: series[1],
        color: colors[1],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData3[index],
        y: category,
        legend: series[2],
        color: colors[2],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData3[index],
        y: category,
        legend: series[2],
        color: colors[2],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: positiveData4[index],
        y: category,
        legend: series[3],
        color: colors[3],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
      categories.map((category, index) => ({
        x: negativeData4[index],
        y: category,
        legend: series[3],
        color: colors[3],
        yAxisCalloutData: '2020/04/30',
        xAxisCalloutData: '10%',
      })),
    );
  };

  const points: HorizontalBarChartWithAxisDataPoint[] = _generateData();

  const rootStyle = { width: '650px', height: '350px' };

  return (
    <div className="containerDiv">
      <div>
        <Field label="Pick one">
          <RadioGroup defaultValue="showTooltip" onChange={_onChange}>
            <Radio value="expandYAxisLabels" label="Expand Y Axis Ticks" />
            <Radio value="showTooltip" label="Show Tooltip at Y Axis Ticks" />
          </RadioGroup>
        </Field>
        <div style={{ display: 'flex' }}>
          <Switch label={enableGradient ? 'Enable Gradient ON' : 'Enable Gradient OFF'} onChange={_onToggleGradient} />
          &nbsp;&nbsp;
          <Switch
            label={roundCorners ? 'Rounded Corners ON' : 'Rounded Corners OFF'}
            onChange={_onToggleRoundedCorners}
          />
        </div>
      </div>

      <div style={rootStyle}>
        <HorizontalBarChartWithAxis
          chartTitle="Horizontal bar chart axis tooltip example "
          data={points}
          height={350}
          width={650}
          hideLegend={true}
          hideTooltip={false}
          showYAxisLablesTooltip={selectedCallout === 'showTooltip' ? true : false}
          showYAxisLables={selectedCallout === 'expandYAxisLabels' ? true : false}
          enableGradient={enableGradient}
          roundCorners={roundCorners}
        />
      </div>
    </div>
  );
};

HorizontalBarWithAxisNegative.parameters = {
  docs: {
    description: {},
  },
};
