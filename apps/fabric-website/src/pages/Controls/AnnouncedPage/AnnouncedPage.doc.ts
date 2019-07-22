import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced',
    related
  }
};
