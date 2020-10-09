import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DialogPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Dialog/Dialog.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DialogPage/docs/DialogRelated.md') as string;

export const DialogPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
