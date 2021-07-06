import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
