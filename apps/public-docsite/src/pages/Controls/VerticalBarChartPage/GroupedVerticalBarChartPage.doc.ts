import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { GroupedVerticalBarChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.doc';

export const GroupedVerticalBarChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'VerticalBarChart - Grouped',
    url: 'grouped',
  },
};
