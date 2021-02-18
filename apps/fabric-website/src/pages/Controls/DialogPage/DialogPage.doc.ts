import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DialogPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Dialog/Dialog.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const DialogPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
