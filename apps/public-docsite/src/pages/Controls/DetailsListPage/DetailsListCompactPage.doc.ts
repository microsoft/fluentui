import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCompactPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCompactPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Compact',
  },
};
