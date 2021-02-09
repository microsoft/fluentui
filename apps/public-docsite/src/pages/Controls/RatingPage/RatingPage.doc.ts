import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { RatingPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Rating/Rating.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const RatingPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
