import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { IconPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Icon/Icon.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/IconPage/docs/IconRelated.md') as string;

export const IconPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
