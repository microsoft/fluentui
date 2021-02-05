import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

export const AnnouncedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced',
  },
};
