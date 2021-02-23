import { ChoiceGroupPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ChoiceGroup/ChoiceGroup.doc';
import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const ChoiceGroupPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
