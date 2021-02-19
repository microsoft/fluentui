import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ResizeGroupPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ResizeGroup/ResizeGroup.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ResizeGroupPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
