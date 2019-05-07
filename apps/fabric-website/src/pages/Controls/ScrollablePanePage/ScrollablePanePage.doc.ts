import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ScrollablePanePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ScrollablePane/ScrollablePane.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ScrollablePanePage/docs/ScrollablePaneRelated.md') as string;

export const ScrollablePanePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
