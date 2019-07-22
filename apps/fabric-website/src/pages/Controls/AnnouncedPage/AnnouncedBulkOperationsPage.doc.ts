import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedBulkOperationsPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedBulkOperationsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Bulk Operations',
    isFeedbackVisible: false,
    related
  }
};
