import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ActivityItemPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ActivityItem/ActivityItem.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ActivityItemPage/docs/ActivityItemRelated.md') as string;

export const ActivityItemPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
