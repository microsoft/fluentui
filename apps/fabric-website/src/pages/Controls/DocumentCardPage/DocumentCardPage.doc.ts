import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DocumentCardPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/DocumentCard/DocumentCard.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/DocumentCardPage/docs/DocumentCardRelated.md') as string;

export const DocumentCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
