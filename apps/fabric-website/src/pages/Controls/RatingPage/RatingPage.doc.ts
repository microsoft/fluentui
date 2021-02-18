import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { RatingPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Rating/Rating.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const RatingPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
