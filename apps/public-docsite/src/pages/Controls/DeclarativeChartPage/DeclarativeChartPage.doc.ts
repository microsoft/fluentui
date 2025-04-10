import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DeclarativeChartPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-charting/DeclarativeChart/DeclarativeChart.doc';

export const DeclarativeChartPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
