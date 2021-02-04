import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ModalPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Modal/Modal.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ModalPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
