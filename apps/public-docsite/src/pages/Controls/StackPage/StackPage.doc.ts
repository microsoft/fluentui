import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { StackPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Stack/Stack.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const StackPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
