import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LayerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Layer/Layer.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LayerPage/docs/LayerRelated.md') as string;

export const LayerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
