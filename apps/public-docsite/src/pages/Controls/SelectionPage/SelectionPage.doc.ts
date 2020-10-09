import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { SelectionPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Selection/Selection.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/SelectionPage/docs/SelectionRelated.md') as string;

export const SelectionPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
