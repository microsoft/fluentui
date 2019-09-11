import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/PopupMenuRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/PopupMenuPage';

export const PopupMenuPageProps: TFabricPlatformPageProps = {
  ios: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/ios/PopupMenuOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/android/PopupMenuOverview.md') as string,
    related,
    componentUrl
  }
};
