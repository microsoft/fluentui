import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListScrollToIndexGroupedV2PageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListScrollToIndexGroupedV2PageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Scroll to index grouped V2',
    isFeedbackVisible: false,
  },
};
