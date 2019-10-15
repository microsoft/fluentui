import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PivotPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Pivot/Pivot.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PivotPage/docs/PivotRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/PivotPage';

export const PivotPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  },
  ios: {
    title: 'Pivot',
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PivotPage/docs/ios/PivotOverview.md') as string,
    related,
    componentUrl
  }
};
