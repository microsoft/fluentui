import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { IconPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Icon/Icon.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/IconPage/docs/IconRelated.md') as string;

export const IconPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
