import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TabsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-tabs/Tabs/Tabs.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TabsPage/docs/TabsRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TabsPage';

export const TabsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    title: 'Tabs',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/TabsPage/docs/ios/TabsOverview.md') as string,
    related,
    componentUrl,
  },
};
