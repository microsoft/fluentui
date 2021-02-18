import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ModalPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Modal/Modal.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ModalPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
