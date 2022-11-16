import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListSimpleGroupedV2PageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListGroupedV2PageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Grouped V2',
    isFeedbackVisible: false,
  },
};
