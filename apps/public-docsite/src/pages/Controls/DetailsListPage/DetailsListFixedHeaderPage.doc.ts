import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListFixedHeaderPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListFixedHeaderPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Fixed Header',
  },
};
