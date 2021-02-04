import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Selection/Selection.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const SelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
