import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CoachmarkPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Coachmark/Coachmark.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CoachmarkPage/docs/CoachmarkRelated.md') as string;

export const CoachmarkPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
