import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FacepilePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Facepile/Facepile.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const FacepilePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
