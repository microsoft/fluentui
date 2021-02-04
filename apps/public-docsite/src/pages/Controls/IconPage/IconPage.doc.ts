import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { IconPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Icon/Icon.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const IconPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
