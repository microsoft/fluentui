import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ContextualMenuPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/ContextualMenu/ContextualMenu.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

// const componentUrl =
//   'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/ContextualMenuPage';
const related: ISideRailLink[] = [{ text: 'Web ContextualMenu', url: '#/controls/web/contextualmenu' }];

export const ContextualMenuPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
