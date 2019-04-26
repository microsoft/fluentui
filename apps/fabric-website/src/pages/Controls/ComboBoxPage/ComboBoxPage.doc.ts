import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ComboBoxPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ComboBox/ComboBox.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ComboBoxPage/docs/ComboBoxRelated.md') as string;

export const ComboBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
