import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListLargeGroupedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListLargeGroupedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Large Grouped',
    isFeedbackVisible: false,
  },
};
