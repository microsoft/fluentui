import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { GroupedListPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/GroupedList/GroupedList.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/GroupedListPage/docs/GroupedListRelated.md') as string;

export const GroupedListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
