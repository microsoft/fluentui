import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCustomRowsPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCustomRowsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Custom Item Rows',
  },
};
