import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { AnnouncedSearchResultsPageProps as ExternalProps } from 'office-ui-fabric-react/lib/packages/react-fundamentals/components/Announced/Announced.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/AnnouncedPage/docs/AnnouncedRelated.md') as string;

export const AnnouncedSearchResultsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    title: 'Announced - Search Results',
    isFeedbackVisible: false,
    related
  }
};
