import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/ChipRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ChipPage';

export const ChipPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Chip',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/ios/ChipOverview.md') as string,
    related,
    componentUrl
  },
  android: {
    title: 'Chip',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/android/ChipOverview.md') as string,
    related,
    componentUrl
  }
};
