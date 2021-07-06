import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCustomGroupHeadersPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCustomGroupHeadersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Custom Group Headers',
  },
};
