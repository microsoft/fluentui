import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Pivot', url: '#/controls/web/pivot' },
  { text: 'iOS Pivot', url: '#/controls/ios/pivot' },
  { text: 'iOS Pill Button Bar', url: '#/controls/ios/pillbuttonbar' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/PillButtonBarPage';

export const PillButtonBarPageProps: TFabricPlatformPageProps = {
  ios: {
    title: 'Pill Button Bar',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PillButtonBarPage/docs/ios/PillButtonBarOverview.md') as string,
    related,
    componentUrl,
  },
};
