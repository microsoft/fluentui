import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PivotPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Pivot/Pivot.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Pivot', url: '#/controls/web/pivot' },
  { text: 'iOS Pivot', url: '#/controls/ios/pivot' },
  { text: 'iOS Pill Button Bar', url: '#/controls/ios/pillbuttonbar' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PivotPage';

export const PivotPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    title: 'Pivot',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PivotPage/docs/ios/PivotOverview.md') as string,
    related,
    componentUrl,
  },
};
