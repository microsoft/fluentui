import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TextPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Text/Text.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TextPage/docs/TextRelated.md') as string;

export const TextPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
