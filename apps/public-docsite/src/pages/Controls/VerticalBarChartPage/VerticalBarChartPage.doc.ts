import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { VerticalBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/VerticalBarChart/VerticalBarChart.doc';

export const VerticalBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
