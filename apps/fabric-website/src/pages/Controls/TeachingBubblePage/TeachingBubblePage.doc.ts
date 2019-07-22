import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TeachingBubblePageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/TeachingBubble/TeachingBubble.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/TeachingBubblePage/docs/TeachingBubbleRelated.md') as string;
// const componentUrl =
//   'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/TeachingBubblePage';

export const TeachingBubblePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
