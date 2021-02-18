import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalloutPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Callout/Callout.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const CalloutPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
