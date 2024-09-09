import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MultiStackedBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/MultiStackedBarChart/MultiStackedBarChart.doc';

export const MultiStackedBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'HorizontalBarChart - Multi Stacked',
    url: 'multistacked',
  },
};
