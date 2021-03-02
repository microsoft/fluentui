import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ActivityItemPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ActivityItem/ActivityItem.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ActivityItemPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
