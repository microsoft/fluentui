import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalloutPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Callout/Callout.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CalloutPage/docs/CalloutRelated.md') as string;

export const CalloutPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
