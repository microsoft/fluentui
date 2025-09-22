import * as React from 'react';

import {
  DonutChart,
  ChartProps,
  ChartDataPoint,
  DataVizPalette,
  getColorFromToken,
  ChartPopoverProps,
} from '@fluentui/react-charts';
import { Switch, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';

export const DonutChartCustomCallout = (): JSXElement => {
  const [useCustomPopover, setUseCustomPopover] = React.useState(false);

  const points: ChartDataPoint[] = [
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _onTogglePopoverCheckChange = React.useCallback((ev: any) => {
    setUseCustomPopover(ev.currentTarget.checked);
  }, []);

  const data: ChartProps = {
    chartTitle: 'Donut chart custom callout example',
    chartData: points,
  };

  const customPopoverProps = (props: ChartDataPoint): ChartPopoverProps => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : '';
    return {
      XValue: 'Custom XVal',
      legend: 'Custom Legend',
      YValue: yValue,
      color: getColorFromToken(DataVizPalette.warning),
    };
  };

  const customPopover = (
    props: ChartDataPoint,
  ): // eslint-disable-next-line @typescript-eslint/no-deprecated
  JSXElement | undefined => {
    const yValue = props ? `${props.yAxisCalloutData! || props.data} h` : 'Y Value';
    const xValue = props ? props.xAxisCalloutData! : 'X Value';
    const legend = props ? props.legend : 'Legend';
    return useCustomPopover ? (
      <div style={{ border: `1.5px dotted ${getColorFromToken(DataVizPalette.color10)}`, padding: '10px' }}>
        <div
          style={{
            color: getColorFromToken(DataVizPalette.warning),
            fontSize: tokens.fontSizeBase400,
            fontWeight: tokens.fontWeightBold,
          }}
        >
          {xValue}
        </div>
        <div
          style={{
            color: getColorFromToken(DataVizPalette.color3),
            fontSize: tokens.fontSizeBase400,
            fontWeight: tokens.fontWeightBold,
          }}
        >
          {legend}
        </div>
        <div
          style={{
            color: getColorFromToken(DataVizPalette.color2),
            fontSize: tokens.fontSizeBase400,
            fontWeight: tokens.fontWeightBold,
          }}
        >
          {yValue}
        </div>
      </div>
    ) : undefined;
  };

  return (
    <>
      <Switch label={'User Popover Override'} checked={useCustomPopover} onChange={_onTogglePopoverCheckChange} />
      <DonutChart
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        valueInsideDonut={39000}
        calloutPropsPerDataPoint={(props: ChartDataPoint) => customPopoverProps(props)}
        onRenderCalloutPerDataPoint={(props: ChartDataPoint) => customPopover(props)}
      />
    </>
  );
};

DonutChartCustomCallout.parameters = {
  docs: {
    description: {
      story: 'Donut Chart Story.',
    },
  },
};
