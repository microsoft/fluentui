import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinButtonPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/SpinButton/SpinButton.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/SpinButtonPage/docs/SpinButtonRelated.md') as string;

export const SpinButtonPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
