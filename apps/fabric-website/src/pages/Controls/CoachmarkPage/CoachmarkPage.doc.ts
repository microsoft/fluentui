import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CoachmarkPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Coachmark/Coachmark.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CoachmarkPage/docs/CoachmarkRelated.md') as string;

export const CoachmarkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
