import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MessageBarPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/MessageBar/MessageBar.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/MessageBarPage/docs/MessageBarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/MessageBarPage';

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
