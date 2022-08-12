import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListProportionalColumnsProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListProportionalColumnsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Proportional Columns',
    isFeedbackVisible: false,
  },
};
