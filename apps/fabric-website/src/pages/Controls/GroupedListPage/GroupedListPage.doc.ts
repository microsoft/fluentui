import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { GroupedListPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/GroupedList/GroupedList.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const GroupedListPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
