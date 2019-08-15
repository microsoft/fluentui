import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ResizeGroupPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ResizeGroup/ResizeGroup.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ResizeGroupPage/docs/ResizeGroupRelated.md') as string;

export const ResizeGroupPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
