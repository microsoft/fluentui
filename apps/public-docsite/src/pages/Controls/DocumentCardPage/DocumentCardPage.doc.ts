import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DocumentCardPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DocumentCard/DocumentCard.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/DocumentCardPage/docs/DocumentCardRelated.md') as string;

export const DocumentCardPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
