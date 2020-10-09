import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedLazyLoadingPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedLazyLoadingPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Lazy Loading',
    isFeedbackVisible: false,
    related,
  },
};
