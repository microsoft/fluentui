import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedLazyLoadingPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Announced/Announced.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedLazyLoadingPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Lazy Loading',
    isFeedbackVisible: false,
    related
  }
};
