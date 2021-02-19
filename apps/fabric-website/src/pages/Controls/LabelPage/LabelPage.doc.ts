import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { LabelPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Label/Label.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const LabelPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
