import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListNavigatingFocusPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListNavigatingFocusPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Inner Navigation',
    isFeedbackVisible: false,
  },
};
