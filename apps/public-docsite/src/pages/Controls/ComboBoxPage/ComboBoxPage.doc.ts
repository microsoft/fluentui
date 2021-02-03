import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ComboBoxPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ComboBox/ComboBox.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ComboBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
