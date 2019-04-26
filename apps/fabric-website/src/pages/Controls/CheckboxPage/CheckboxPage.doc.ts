import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CheckboxPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Checkbox/Checkbox.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CheckboxPage/docs/CheckboxRelated.md') as string;

export const CheckboxPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
