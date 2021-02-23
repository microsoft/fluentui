import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { StackPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Stack/Stack.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const StackPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
