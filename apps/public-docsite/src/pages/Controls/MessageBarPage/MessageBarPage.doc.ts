import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { MessageBarPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/MessageBar/MessageBar.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/MessageBarPage';

export const MessageBarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/MessageBarPage/docs/ios/MessageBarOverview.md') as string,
    related,
    componentUrl,
  },
};
