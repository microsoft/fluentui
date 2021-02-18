import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedQuickActionsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

export const AnnouncedQuickActionsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Quick Actions',
    isFeedbackVisible: false,
  },
};
