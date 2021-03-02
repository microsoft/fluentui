import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ImagePageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Image/Image.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ImagePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
