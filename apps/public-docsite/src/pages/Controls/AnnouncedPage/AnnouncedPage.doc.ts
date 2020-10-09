import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Announced/Announced.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced',
    related,
  },
};
