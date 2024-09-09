import * as React from 'react';
import {
  DonutChart,
  IChartProps,
  IChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from '@fluentui/react-charts-preview';
import { getGradientFromToken, DataVizGradientPalette } from '@fluentui/react-charting';
import { Switch } from '@fluentui/react-components';
import PopoverComponent from '../../../library/src/components/CommonComponents/Popover';

export const DonutCustomCallout = () => {
  const points: IChartDataPoint[] = [
    {
      legend: 'first',
      data: 20000,
      color: getColorFromToken(DataVizPalette.color9),
      gradient: getGradientFromToken(DataVizGradientPalette.gradient4),
      xAxisCalloutData: '2020/04/30',
      callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 20000h' },
    },
    {
      legend: 'second',
      data: 39000,
      color: getColorFromToken(DataVizPalette.color10),
      gradient: getGradientFromToken(DataVizGradientPalette.gradient5),
      xAxisCalloutData: '2020/04/20',
      callOutAccessibilityData: { ariaLabel: 'Custom XVal Custom Legend 39000h' },
    },
  ];
  const [enableGradient, setEnableGradient] = React.useState<boolean>(false);
  const [roundCorners, setRoundCorners] = React.useState<boolean>(false);

  const _onToggleGradient = React.useCallback(
    ev => {
      setEnableGradient(ev.currentTarget.checked);
    },
    [enableGradient],
  );

  const _onToggleRoundCorners = React.useCallback(
    ev => {
      setRoundCorners(ev.currentTarget.checked);
    },
    [roundCorners],
  );

  const data: IChartProps = {
    chartTitle: 'Donut chart custom callout example',
    chartData: points,
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <Switch
          label={enableGradient ? 'Enable Gradient' : 'Disable Gradient'}
          onChange={_onToggleGradient}
          checked={enableGradient}
        />
        &nbsp;&nbsp;
        <Switch
          label={roundCorners ? 'Enable Rounded Corners' : 'Disable Rounded Corners'}
          onChange={_onToggleRoundCorners}
          checked={roundCorners}
        />
      </div>
      <DonutChart
        data={data}
        innerRadius={55}
        href={'https://developer.microsoft.com/en-us/'}
        legendsOverflowText={'overflow Items'}
        hideLegend={false}
        height={220}
        width={176}
        valueInsideDonut={39000}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderCalloutPerDataPoint={(props: IChartDataPoint) =>
          props ? (
            <PopoverComponent
              XValue={'Custom XVal'}
              Legend={'Custom Legend'}
              YValue={`${props.yAxisCalloutData || props.data} h`}
              color={getColorFromToken(DataVizPalette.warning)}
            />
          ) : null
        }
        enableGradient={enableGradient}
        roundCorners={roundCorners}
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
