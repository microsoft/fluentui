import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PickersPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Pickers/Pickers.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const PickersPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    componentUrl:
      'https://github.com/microsoft/fluentui/tree/7.0/packages/office-ui-fabric-react/src/components/pickers',
    related,
  },
};
