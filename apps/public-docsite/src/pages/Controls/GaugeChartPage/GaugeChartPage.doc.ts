import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { GaugeChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/GaugeChart/GaugeChart.doc';

export const GaugeChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
