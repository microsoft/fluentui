import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TogglePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Toggle/Toggle.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const TogglePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
