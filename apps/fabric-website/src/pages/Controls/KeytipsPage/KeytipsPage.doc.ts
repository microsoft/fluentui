import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { KeytipsPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Keytip/Keytips.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/KeytipsPage/docs/KeytipsRelated.md') as string;

export const KeytipsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
