import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HorizontalBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/HorizontalBarChart/HorizontalBarChart.doc';

export const HorizontalBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
