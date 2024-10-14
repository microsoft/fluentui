import * as React from 'react';
import {
  HorizontalBarChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  IPopoverComponentProps,
} from '@fluentui/react-charts-preview';
// import * as d3 from 'd3-format';
import { Switch } from '@fluentui/react-components';

export const HorizontalBarCustomCallout = () => {
  const hideRatio: boolean[] = [true, false];
  const [useCustomPopover, setUseCustomPopover] = React.useState(false);

  const data: IChartProps[] = [
    {
      chartTitle: 'one',
      chartData: [
        {
          legend: 'one',
          horizontalBarChartdata: { x: 1543, y: 15000 },
          color: getColorFromToken(DataVizPalette.color28),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '1.5K',
        },
      ],
    },
    {
      chartTitle: 'two',
      chartData: [
        {
          legend: 'two',
          horizontalBarChartdata: { x: 800, y: 15000 },
          color: getColorFromToken(DataVizPalette.color29),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '800',
        },
      ],
    },
    {
      chartTitle: 'three',
      chartData: [
        {
          legend: 'three',
          horizontalBarChartdata: { x: 8888, y: 15000 },
          color: getColorFromToken(DataVizPalette.color30),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '8.8K',
        },
      ],
    },
    {
      chartTitle: 'four',
      chartData: [
        {
          legend: 'four',
          horizontalBarChartdata: { x: 15888, y: 15000 },
          color: getColorFromToken(DataVizPalette.color31),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '16K',
        },
      ],
    },
    {
      chartTitle: 'five',
      chartData: [
        {
          legend: 'five',
          horizontalBarChartdata: { x: 11444, y: 15000 },
          color: getColorFromToken(DataVizPalette.color32),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '11K',
        },
      ],
    },
    {
      chartTitle: 'six',
      chartData: [
        {
          legend: 'six',
          horizontalBarChartdata: { x: 14000, y: 15000 },
          color: getColorFromToken(DataVizPalette.color33),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '14K',
        },
      ],
    },
    {
      chartTitle: 'seven',
      chartData: [
        {
          legend: 'seven',
          horizontalBarChartdata: { x: 9855, y: 15000 },
          color: getColorFromToken(DataVizPalette.color34),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '9.9K',
        },
      ],
    },
    {
      chartTitle: 'eight',
      chartData: [
        {
          legend: 'eight',
          horizontalBarChartdata: { x: 4250, y: 15000 },
          color: getColorFromToken(DataVizPalette.color35),
          xAxisCalloutData: '2020/04/30',
          yAxisCalloutData: '4.3K',
        },
      ],
    },
  ];
  const customPopoverProps = (props: IChartDataPoint): IPopoverComponentProps => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : '';
    const color = props ? props.color : getColorFromToken(DataVizPalette.color28);
    return {
      XValue: 'Custom XVal',
      legend: 'Custom Legend',
      YValue: yValue,
      color,
      isCalloutForStack: false,
    };
  };

  const _onTogglePopoverCheckChange = React.useCallback(ev => {
    setUseCustomPopover(ev.currentTarget.checked);
  }, []);

  const customPopover = (props: IChartDataPoint): JSX.Element | undefined => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : 'Y Value';
    const xValue = props ? props.xAxisCalloutData! : 'X Value';
    const legend = props ? props.legend : 'Legend';
    return useCustomPopover ? (
      <div style={{ border: '1.5px dotted black' }}>
        <div style={{ color: getColorFromToken(DataVizPalette.color5), border: '1px black' }}>{xValue}</div>
        <div style={{ color: getColorFromToken(DataVizPalette.color6), border: '1px black' }}>{legend}</div>
        <div style={{ color: getColorFromToken(DataVizPalette.color7) }}>{yValue}</div>
      </div>
    ) : undefined;
  };
  return (
    <div style={{ maxWidth: 600 }}>
      <Switch label={'User Popover Override'} checked={useCustomPopover} onChange={_onTogglePopoverCheckChange} />
      <HorizontalBarChart
        data={data}
        hideRatio={hideRatio}
        /* barChartCustomData={(props: IChartProps) => {
          const chartData: IChartDataPoint = props!.chartData![0];
          const x = chartData.horizontalBarChartdata!.x;
          const y = chartData.horizontalBarChartdata!.y;
          return (
            <div>
              <span style={{ fontWeight: 'bold' }}>{d3.format('.2s')(x)}</span>
              <span>{`/${d3.format('.2s')(y)} hours`}</span>
            </div>
          );
        }} */
        customProps={(props: IChartDataPoint) => customPopoverProps(props)}
        onRenderCalloutPerHorizontalBar={(props: IChartDataPoint) => customPopover(props)}
      />
    </div>
  );
};
HorizontalBarCustomCallout.parameters = {
  docs: {
    description: {},
  },
};
