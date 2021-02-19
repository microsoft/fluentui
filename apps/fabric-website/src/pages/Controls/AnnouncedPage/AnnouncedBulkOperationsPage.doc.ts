import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedBulkOperationsPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Announced/Announced.doc';

export const AnnouncedBulkOperationsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Bulk Operations',
    isFeedbackVisible: false,
  },
};
