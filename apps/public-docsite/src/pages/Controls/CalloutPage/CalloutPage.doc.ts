import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalloutPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Callout/Callout.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const CalloutPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
