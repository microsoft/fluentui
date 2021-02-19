import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DropdownPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Dropdown/Dropdown.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const DropdownPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
