import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverflowSetPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/OverflowSet/OverflowSet.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const OverflowSetPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
