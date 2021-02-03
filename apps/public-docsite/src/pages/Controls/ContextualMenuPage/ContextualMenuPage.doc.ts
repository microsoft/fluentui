import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ContextualMenuPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ContextualMenu/ContextualMenu.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

// const componentUrl =
//   'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ContextualMenuPage';
const related: ISideRailLink[] = [];

export const ContextualMenuPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
