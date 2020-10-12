import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedQuickActionsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedQuickActionsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Quick Actions',
    isFeedbackVisible: false,
    related,
  },
};
