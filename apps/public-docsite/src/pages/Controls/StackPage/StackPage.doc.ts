import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { StackPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Stack/Stack.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/StackPage/docs/StackRelated.md') as string;

export const StackPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
