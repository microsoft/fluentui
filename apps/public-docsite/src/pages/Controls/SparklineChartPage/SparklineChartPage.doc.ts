import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SparklineChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/SparklineChart/SparklineChart.doc';

export const SparklineChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
