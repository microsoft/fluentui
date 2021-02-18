import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CommandBarPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/CommandBar/CommandBar.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const CommandBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
