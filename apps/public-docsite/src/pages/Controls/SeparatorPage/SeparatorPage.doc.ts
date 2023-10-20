import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SeparatorPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Separator/Separator.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Separator', url: '#/controls/web/separator' },
  { text: 'iOS Separator', url: '#/controls/ios/separator' },
  { text: 'Android Separator', url: '#/controls/android/separator' },
  { text: 'Android ListItemDivider', url: '#/controls/android/listcells' },
  { text: 'macOS Separator', url: '#/controls/mac/separator' },
  { text: 'Cross-platform Separator', url: '#/controls/cross/separator' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/SeparatorPage';

export const SeparatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/ios/SeparatorOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/android/SeparatorOverview.md') as string,
    related,
    componentUrl,
  },
  mac: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/mac/SeparatorOverview.md') as string,
    usage:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/mac/SeparatorUsage.md') as string,

    related,
    componentUrl,
  },
  cross: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/cross/SeparatorOverview.md') as string,
    usage:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/SeparatorPage/docs/cross/SeparatorUsage.md') as string,
    related,
    componentUrl,
  },
};
