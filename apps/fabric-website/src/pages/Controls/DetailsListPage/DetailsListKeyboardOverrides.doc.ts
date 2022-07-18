import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DetailsListKeyboardOverridesProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/DetailsList/DetailsList.doc';

export const DetailsListKeyboardOverridesProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'DetailsList - Keyboard Overrides',
  },
};
