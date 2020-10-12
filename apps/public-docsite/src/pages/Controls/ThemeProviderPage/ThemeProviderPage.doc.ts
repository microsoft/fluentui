import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CheckboxPageProps as ExternalProps } from '@fluentui/react-examples/lib/react-checkbox/Checkbox/Checkbox.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ThemeProviderPage/docs/ThemeProviderRelated.md') as string;

export const ThemeProviderProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
};
