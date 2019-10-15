import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PanelPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Panel/Panel.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PanelPage/docs/PanelRelated.md') as string;

export const PanelPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
