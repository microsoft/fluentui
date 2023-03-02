import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'iOS Chip', url: '#/controls/ios/chip' },
  { text: 'Android Chip', url: '#/controls/android/chip' },
  { text: 'Android PeoplePicker', url: '#/controls/android/peoplepicker' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ChipPage';

export const ChipPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Chip',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ChipPage/docs/ios/ChipOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Chip',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ChipPage/docs/android/ChipOverview.md') as string,
    related,
    componentUrl,
  },
};
