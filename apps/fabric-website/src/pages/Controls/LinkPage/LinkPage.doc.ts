import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LinkPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Link/Link.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/LinkPage/docs/LinkRelated.md') as string;

export const LinkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
