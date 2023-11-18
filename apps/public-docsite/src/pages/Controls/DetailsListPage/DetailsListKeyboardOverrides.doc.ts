import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListKeyboardOverridesProps as ExternalProps } from '@fluentui/react-examples/lib/react/DetailsList/DetailsList.doc';

export const DetailsListKeyboardOverridesProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Keyboard Overrides',
  },
};
