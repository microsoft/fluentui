import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PivotPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-tabs/Pivot/Pivot.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PivotPage/docs/PivotRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/PivotPage';

export const PivotPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    title: 'Pivot',
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/PivotPage/docs/ios/PivotOverview.md') as string,
    related,
    componentUrl,
  },
};
