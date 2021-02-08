import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedLazyLoadingPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

export const AnnouncedLazyLoadingPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Lazy Loading',
    isFeedbackVisible: false,
  },
};
