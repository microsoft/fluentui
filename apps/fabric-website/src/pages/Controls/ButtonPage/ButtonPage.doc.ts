import { ButtonPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Button/Button.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { TPlatformPageProps } from '@uifabric/example-app-base/lib/index2';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/ButtonRelated.md') as string;

export const ButtonPageProps = (disabled: boolean, checked: boolean): TPlatformPageProps<Platforms> => {
  const externalProps = ExternalProps({ areButtonsDisabled: disabled, areButtonsChecked: checked });
  return {
    web: {
      ...(externalProps as any),
      related
    }
  };
};
