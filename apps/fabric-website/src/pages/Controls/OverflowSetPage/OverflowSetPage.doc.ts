import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverflowSetPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/OverflowSet/OverflowSet.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const OverflowSetPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
