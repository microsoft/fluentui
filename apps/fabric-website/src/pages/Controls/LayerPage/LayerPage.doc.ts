import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LayerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Layer/Layer.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LayerPage/docs/LayerRelated.md') as string;

export const LayerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
