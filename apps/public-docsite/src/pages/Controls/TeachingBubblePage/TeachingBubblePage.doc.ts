import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { TeachingBubblePageProps as ExternalProps } from '@fluentui/react-examples/lib/react/TeachingBubble/TeachingBubble.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];
// const componentUrl =
//   'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/TeachingBubblePage';

export const TeachingBubblePageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
