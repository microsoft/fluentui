import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCustomColumnsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListCustomColumnsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Custom Item Columns',
  },
};
