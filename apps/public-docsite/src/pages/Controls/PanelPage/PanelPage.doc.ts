import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PanelPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Panel/Panel.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const PanelPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
