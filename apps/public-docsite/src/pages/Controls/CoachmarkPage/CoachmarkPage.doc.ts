import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CoachmarkPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Coachmark/Coachmark.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [];

export const CoachmarkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
