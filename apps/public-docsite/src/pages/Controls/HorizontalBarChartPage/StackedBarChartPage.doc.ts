import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { StackedBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/StackedBarChart/StackedBarChart.doc';

export const StackedBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'HorizontalBarChart - Stacked',
    url: 'stacked',
  },
};
