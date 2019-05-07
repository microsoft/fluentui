import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SeparatorPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Separator/Separator.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SeparatorPage/docs/SeparatorRelated.md') as string;

export const SeparatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
