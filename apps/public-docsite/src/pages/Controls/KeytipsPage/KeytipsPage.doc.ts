import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { KeytipsPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Keytip/Keytips.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/KeytipsPage/docs/KeytipsRelated.md') as string;

export const KeytipsPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
