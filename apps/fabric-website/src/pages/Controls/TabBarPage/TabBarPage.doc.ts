import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TabBarPage/docs/TabBarRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/TabBarPage';

export const TabBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Tab Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TabBarPage/docs/ios/TabBarOverview.md') as string,
    related,
    componentUrl
  }
};
