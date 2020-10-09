import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedBulkOperationsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedBulkOperationsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Bulk Operations',
    isFeedbackVisible: false,
    related,
  },
};
