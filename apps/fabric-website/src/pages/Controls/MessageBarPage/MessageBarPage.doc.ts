import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MessageBarPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/MessageBar/MessageBar.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/MessageBarPage';

export const MessageBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/MessageBarPage/docs/ios/MessageBarOverview.md') as string,
    related,
    componentUrl,
  },
};
