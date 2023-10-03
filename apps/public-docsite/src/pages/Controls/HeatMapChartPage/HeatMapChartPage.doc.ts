import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HeatMapChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/HeatMapChart/HeatMapChart.doc';

export const HeatMapChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
