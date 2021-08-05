import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinButtonPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/SpinButton/SpinButton.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const SpinButtonPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
