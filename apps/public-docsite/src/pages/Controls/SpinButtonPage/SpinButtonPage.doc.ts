import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SpinButtonPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/SpinButton/SpinButton.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SpinButtonPage/docs/SpinButtonRelated.md') as string;

export const SpinButtonPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
