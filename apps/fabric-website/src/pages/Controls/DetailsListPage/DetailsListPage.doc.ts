import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
  },
};
