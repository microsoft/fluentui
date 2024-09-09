import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { HorizontalBarChartWithAxisPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.doc';

export const HorizontalBarChartWithAxisPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'HorizontalBarChart - WithAxis',
    url: 'withaxis',
  },
};
