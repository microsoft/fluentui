import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CoachmarkPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Coachmark/Coachmark.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [];

export const CoachmarkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
