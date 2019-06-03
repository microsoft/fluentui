import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/PopupMenuRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/PopupMenuPage';

export const PopupMenuPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Popup Menu',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PopupMenuPage/docs/ios/PopupMenuOverview.md') as string,
    related,
    componentUrl
  }
};
