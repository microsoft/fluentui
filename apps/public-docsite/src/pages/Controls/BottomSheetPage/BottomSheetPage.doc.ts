import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/BottomSheetPage/docs/BottomSheetRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/BottomSheetPage';

export const BottomSheetPageProps: TFabricPlatformPageProps = {
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/BottomSheetPage/docs/android/BottomSheetOverview.md') as string,
    related,
    componentUrl,
  },
};
