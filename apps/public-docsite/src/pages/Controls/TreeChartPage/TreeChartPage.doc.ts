import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TreeChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/TreeChart/TreeChart.doc';

export const TreeChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
