import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListCompactPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListCompactPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Compact',
  },
};
