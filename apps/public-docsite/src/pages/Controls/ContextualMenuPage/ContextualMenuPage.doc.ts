import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ContextualMenuPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ContextualMenu/ContextualMenu.doc';

// const componentUrl =
//   'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ContextualMenuPage';
const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ContextualMenuPage/docs/ContextualMenuRelated.md') as string;

export const ContextualMenuPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
