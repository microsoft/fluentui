import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/AvatarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/AvatarPage';

export const AvatarPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/ios/AvatarOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/android/AvatarOverview.md') as string,
    related,
    componentUrl,
  },
  mac: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/mac/AvatarOverview.md') as string,
    usage: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AvatarPage/docs/mac/AvatarUsage.md') as string,
    related,
    componentUrl,
  },
};
