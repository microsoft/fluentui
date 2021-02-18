import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListShimmerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListShimmerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Shimmer',
    isFeedbackVisible: false,
  },
};
