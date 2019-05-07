import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedQuickActionsPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedQuickActionsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Quick Actions',
    isFeedbackVisible: false,
    related
  }
};
