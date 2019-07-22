import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ShimmerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Shimmer/Shimmer.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ShimmerPage/docs/ShimmerRelated.md') as string;

export const ShimmerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
