import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ProgressIndicatorPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ProgressIndicator/ProgressIndicator.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ProgressIndicatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
