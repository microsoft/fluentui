import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SankeyChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/SankeyChart/SankeyChart.doc';

export const SankeyChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
