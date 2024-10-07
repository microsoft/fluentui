import * as React from 'react';
import {
  DonutChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  IPopoverComponentProps,
} from '@fluentui/react-charts-preview';
import { Switch } from '@fluentui/react-switch';

export const DonutCustomCallout = () => {
  const [useCustomPopover, setUseCustomPopover] = React.useState(false);

  const points: IChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getColorFromToken(DataVizPalette.color9),
      xAxisCalloutData: '2020/04/30',
      callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 20000h' },
    },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color10),
      xAxisCalloutData: '2020/04/20',
      callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 39000h' },
    },
  ];

  const _onTogglePopoverCheckChange = React.useCallback(ev => {
    setUseCustomPopover(ev.currentTarget.checked);
  }, []);

  const data: IChartProps = {
    chartTitle: 'Donut chart custom callout example',
    chartData: points,
  };

  const customPopoverProps = (props: IChartDataPoint): IPopoverComponentProps => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : '';
    return {
      XValue: 'Custom XVal',
      legend: 'Custom Legend',
      YValue: yValue,
      color: getColorFromToken(DataVizPalette.warning),
    };
  };

  const customPopover = (props: IChartDataPoint): JSX.Element | undefined => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : 'Y Value';
    const xValue = props ? props.xAxisCalloutData! : 'X Value';
    const legend = props ? props.legend : 'Legend';
    return useCustomPopover ? (
      <div>
        <div>{xValue}</div>
        <div>{legend}</div>
        <div>{yValue}</div>
      </div>
    ) : undefined;
  };

  return (
    <>
      <Switch label={'Custom Popover Override'} checked={useCustomPopover} onChange={_onTogglePopoverCheckChange} />
      <DonutChart
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        valueInsideDonut={39000}
        customProps={(props: IChartDataPoint) => customPopoverProps(props)}
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) => customPopover(props)}
      />
    </>
  );
};

DonutCustomCallout.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};
