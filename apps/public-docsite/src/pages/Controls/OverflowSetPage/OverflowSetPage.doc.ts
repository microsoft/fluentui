import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { OverflowSetPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/OverflowSet/OverflowSet.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/OverflowSetPage/docs/OverflowSetRelated.md') as string;

export const OverflowSetPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
