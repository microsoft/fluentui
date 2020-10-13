import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MessageBarPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/MessageBar/MessageBar.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/MessageBarPage/docs/MessageBarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/MessageBarPage';

export const MessageBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/MessageBarPage/docs/ios/MessageBarOverview.md') as string,
    related,
    componentUrl,
  },
};
