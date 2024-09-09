import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LineChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/LineChart/LineChart.doc';

export const LineChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
