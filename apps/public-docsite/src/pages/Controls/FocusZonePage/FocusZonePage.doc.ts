import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { FocusZonePageProps as ExternalProps } from '@fluentui/react-examples/lib/react-focus/FocusZone/FocusZone.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const FocusZonePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
