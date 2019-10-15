import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ModalPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Modal/Modal.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ModalPage/docs/ModalRelated.md') as string;

export const ModalPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
