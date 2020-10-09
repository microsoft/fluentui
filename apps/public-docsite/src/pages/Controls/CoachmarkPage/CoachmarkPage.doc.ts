import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CoachmarkPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Coachmark/Coachmark.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/CoachmarkPage/docs/CoachmarkRelated.md') as string;

export const CoachmarkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
