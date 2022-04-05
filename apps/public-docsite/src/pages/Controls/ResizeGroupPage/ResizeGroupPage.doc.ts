import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ResizeGroupPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ResizeGroup/ResizeGroup.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ResizeGroupPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
