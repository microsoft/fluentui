import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ProgressIndicatorPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/ProgressIndicator/ProgressIndicator.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ProgressIndicatorPage/docs/ProgressIndicatorRelated.md') as string;

export const ProgressIndicatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
