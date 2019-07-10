import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ImagePageProps as ExternalProps } from 'office-ui-fabric-react/lib/packages/react-primitives/components/Image/Image.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ImagePage/docs/ImageRelated.md') as string;

export const ImagePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
