import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SelectionPageProps as ExternalProps } from 'office-ui-fabric-react/lib/utilities/selection/Selection.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SelectionPage/docs/SelectionRelated.md') as string;

export const SelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
