import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverflowSetPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/OverflowSet/OverflowSet.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/OverflowSetPage/docs/OverflowSetRelated.md') as string;

export const OverflowSetPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
