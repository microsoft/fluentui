import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PivotPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Pivot/Pivot.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PivotPage/docs/PivotRelated.md') as string;

export const PivotPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
