import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ActivityItemPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ActivityItem/ActivityItem.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ActivityItemPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
