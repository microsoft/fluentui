import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListAdvancedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListAdvancedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Variable Row Heights',
  },
};
