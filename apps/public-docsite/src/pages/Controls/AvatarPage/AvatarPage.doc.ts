import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS Avatar', url: '#/controls/ios/avatar' },
  { text: 'iOS Persona', url: '#/controls/ios/persona' },
  { text: 'Android Avatar', url: '#/controls/android/avatar' },
  { text: 'Android Persona', url: '#/controls/android/persona' },
  { text: 'macOS Avatar', url: '#/controls/mac/avatar' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/AvatarPage';

export const AvatarPageProps: TFabricPlatformPageProps = {
  ios: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/AvatarPage/docs/ios/AvatarOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/AvatarPage/docs/android/AvatarOverview.md') as string,
    related,
    componentUrl,
  },
  mac: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/AvatarPage/docs/mac/AvatarOverview.md') as string,
    usage:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/AvatarPage/docs/mac/AvatarUsage.md') as string,
    related,
    componentUrl,
  },
};
