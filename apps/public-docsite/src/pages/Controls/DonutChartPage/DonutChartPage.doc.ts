import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DonutChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/DonutChart/DonutChart.doc';

export const DonutChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
