import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PieChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/PieChart/PieChart.doc';

export const PieChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
