import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ImagePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Image/Image.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ImagePage/docs/ImageRelated.md') as string;

export const ImagePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
