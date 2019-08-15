import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ContextualMenuPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.doc';

// const componentUrl =
//   'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ContextualMenuPage';
const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ContextualMenuPage/docs/ContextualMenuRelated.md') as string;

export const ContextualMenuPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
