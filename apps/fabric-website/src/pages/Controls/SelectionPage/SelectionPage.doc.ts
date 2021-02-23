import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Selection/Selection.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const SelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
