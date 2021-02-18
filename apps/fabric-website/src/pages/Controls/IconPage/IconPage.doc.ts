import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { IconPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Icon/Icon.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const IconPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
