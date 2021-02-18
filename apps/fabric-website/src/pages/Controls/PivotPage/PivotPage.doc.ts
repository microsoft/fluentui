import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PivotPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Pivot/Pivot.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Pivot', url: '#/controls/web/pivot' },
  { text: 'iOS Pivot', url: '#/controls/ios/pivot' },
  { text: 'iOS Pill Button Bar', url: '#/controls/ios/pillbuttonbar' },
];
const componentUrl = 'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/PivotPage';

export const PivotPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    title: 'Pivot',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PivotPage/docs/ios/PivotOverview.md') as string,
    related,
    componentUrl,
  },
};
