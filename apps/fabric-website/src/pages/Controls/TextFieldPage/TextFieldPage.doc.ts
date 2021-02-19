import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TextFieldPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/TextField/TextField.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const TextFieldPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
