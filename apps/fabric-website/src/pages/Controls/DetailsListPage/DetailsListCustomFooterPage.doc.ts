import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCustomFooterPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCustomFooterPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Custom Footer',
  },
};
