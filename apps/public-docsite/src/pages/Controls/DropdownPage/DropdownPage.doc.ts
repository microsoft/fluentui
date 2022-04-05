import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DropdownPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Dropdown/Dropdown.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const DropdownPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
