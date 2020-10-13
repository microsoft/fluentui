import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CheckboxPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-checkbox/Checkbox/Checkbox.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/CheckboxPage/docs/CheckboxRelated.md') as string;

export const CheckboxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
