import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListBasicPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListBasicPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Basic',
  },
};
