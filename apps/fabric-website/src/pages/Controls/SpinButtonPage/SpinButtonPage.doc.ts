import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinButtonPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/SpinButton/SpinButton.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const SpinButtonPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
