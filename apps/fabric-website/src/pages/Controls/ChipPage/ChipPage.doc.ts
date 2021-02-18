import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS Chip', url: '#/controls/ios/chip' },
  { text: 'Android Chip', url: '#/controls/android/chip' },
  { text: 'Android PeoplePicker', url: '#/controls/android/peoplepicker' },
];
const componentUrl = 'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/ChipPage';

export const ChipPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Chip',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/ios/ChipOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Chip',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ChipPage/docs/android/ChipOverview.md') as string,
    related,
    componentUrl,
  },
};
