import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListLargeGroupedPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListLargeGroupedV2PageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Large Grouped V2',
    isFeedbackVisible: false,
  },
};
