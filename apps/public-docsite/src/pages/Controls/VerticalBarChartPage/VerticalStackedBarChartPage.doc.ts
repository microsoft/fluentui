import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { VerticalStackedBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/VerticalStackedBarChart/VerticalStackedBarChart.doc';

export const VerticalStackedBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'VerticalBarChart - Stacked',
    url: 'stacked',
  },
};
