import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { VerticalBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/VerticalBarChart/VerticalBarChart.doc';

export const VerticalBarChartStandardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'VerticalBarChart - Standard',
    url: 'standard',
  },
};
