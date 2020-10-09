import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { ProgressIndicatorPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/ProgressIndicator/ProgressIndicator.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/ProgressIndicatorPage/docs/ProgressIndicatorRelated.md') as string;

export const ProgressIndicatorPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
