import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PanelPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Panel/Panel.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const PanelPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
