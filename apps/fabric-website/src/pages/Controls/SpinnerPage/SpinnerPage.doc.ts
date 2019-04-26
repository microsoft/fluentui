import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinnerPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Spinner/Spinner.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SpinnerPage/docs/SpinnerRelated.md') as string;

export const SpinnerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
