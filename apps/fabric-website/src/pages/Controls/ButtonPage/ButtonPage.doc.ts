import { ButtonPageProps as ExternalProps } from 'office-ui-fabric-react/lib/components/Button/Button.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { TPlatformPageProps } from '@uifabric/example-app-base/lib/index2';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/ButtonRelated.md') as string;
const componentUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ButtonPage';

export const ButtonPageProps = (disabled: boolean, checked: boolean): TPlatformPageProps<Platforms> => {
  const externalProps = ExternalProps({ areButtonsDisabled: disabled, areButtonsChecked: checked });
  return {
    web: {
      ...(externalProps as any),
      related
    },
    ios: {
      overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/ios/ButtonOverview.md') as string,
      related,
      componentUrl
    },
    android: {
      overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/android/ButtonOverview.md') as string,
      related,
      componentUrl
    }
  };
};
