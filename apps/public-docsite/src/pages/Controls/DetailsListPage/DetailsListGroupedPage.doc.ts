import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListSimpleGroupedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListGroupedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Grouped',
    isFeedbackVisible: false,
  },
};
