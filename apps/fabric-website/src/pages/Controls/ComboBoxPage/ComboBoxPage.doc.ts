import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ComboBoxPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ComboBox/ComboBox.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ComboBoxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
