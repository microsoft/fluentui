import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TextFieldPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/TextField/TextField.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const TextFieldPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
