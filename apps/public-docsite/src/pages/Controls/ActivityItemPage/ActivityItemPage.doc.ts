import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ActivityItemPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ActivityItem/ActivityItem.doc';

const related = require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ActivityItemPage/docs/ActivityItemRelated.md') as string;

export const ActivityItemPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
