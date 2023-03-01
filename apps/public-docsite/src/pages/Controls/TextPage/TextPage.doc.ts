import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TextPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Text/Text.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Text', url: '#/controls/web/text' },
  { text: 'iOS Text', url: '#/controls/ios/text' },
  { text: 'Android Text', url: '#/controls/android/text' },
  { text: 'Cross-platform Text', url: '#/controls/cross/text' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TextPage';

export const TextPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/ios/TextOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/android/TextOverview.md') as string,
    related,
    componentUrl,
  },
  cross: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/cross/TextOverview.md') as string,
    usage:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/TextPage/docs/cross/TextUsage.md') as string,
    related,
    componentUrl,
  },
};
