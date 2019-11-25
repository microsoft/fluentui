import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BottomSheetPage/docs/BottomSheetRelated.md') as string;
const componentUrl =
  'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/BottomSheetPage';

export const BottomSheetPageProps: TFabricPlatformPageProps = {
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/BottomSheetPage/docs/android/BottomSheetOverview.md') as string,
    related,
    componentUrl
  }
};
