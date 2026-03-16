import * as React from 'react';
import {
  DataVizPalette,
  GaugeChart,
  GaugeChartVariant,
  getGradientFromToken,
  DataVizGradientPalette,
  ResponsiveContainer,
} from '@fluentui/react-charting';

export class GaugeChartResponsiveExample extends React.Component {
  public render(): React.ReactNode {
    return (
      <ResponsiveContainer height={128}>
        <GaugeChart
          segments={[
            {
              size: 33,
              color: DataVizPalette.success,
              gradient: getGradientFromToken(DataVizGradientPalette.success),
              legend: 'Low Risk',
            },
            {
              size: 34,
              color: DataVizPalette.warning,
              gradient: getGradientFromToken(DataVizGradientPalette.warning),
              legend: 'Medium Risk',
            },
            {
              size: 33,
              color: DataVizPalette.error,
              gradient: getGradientFromToken(DataVizGradientPalette.error),
              legend: 'High Risk',
            },
          ]}
          chartValue={75}
          variant={GaugeChartVariant.MultipleSegments}
        />
      </ResponsiveContainer>
    );
  }
}
