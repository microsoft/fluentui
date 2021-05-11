import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { KeytipsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Keytip/Keytips.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const KeytipsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
