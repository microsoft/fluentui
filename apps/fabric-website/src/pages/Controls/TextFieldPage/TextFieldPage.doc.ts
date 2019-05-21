import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TextFieldPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/TextField/TextField.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextFieldPage/docs/TextFieldRelated.md') as string;

export const TextFieldPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
