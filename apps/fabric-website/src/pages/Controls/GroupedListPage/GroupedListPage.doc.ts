import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { GroupedListPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/GroupedList/GroupedList.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/GroupedListPage/docs/GroupedListRelated.md') as string;

export const GroupedListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
