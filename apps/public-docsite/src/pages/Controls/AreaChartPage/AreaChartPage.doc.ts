import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AreaChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/AreaChart/AreaChart.doc';

export const AreaChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
