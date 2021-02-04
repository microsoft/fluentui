import { ChoiceGroupPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ChoiceGroup/ChoiceGroup.doc';
import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const ChoiceGroupPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
