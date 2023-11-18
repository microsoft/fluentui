import { ButtonPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Button/Button.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { TPlatformPageProps, ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Button', url: '#/controls/web/button' },
  { text: 'iOS Button', url: '#/controls/ios/button' },
  { text: 'Android Button', url: '#/controls/android/button' },
  { text: 'macOS Button', url: '#/controls/mac/button' },
  { text: 'Cross-platform Button', url: '#/controls/cross/button' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/ButtonPage';

export const ButtonPageProps = (disabled: boolean, checked: boolean): TPlatformPageProps<Platforms> => {
  const externalProps = ExternalProps({ areButtonsDisabled: disabled, areButtonsChecked: checked });
  return {
    web: {
      ...(externalProps as any),
      related,
    },
    ios: {
      overview:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/ios/ButtonOverview.md') as string,
      related,
      componentUrl,
    },
    android: {
      overview:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/android/ButtonOverview.md') as string,
      related,
      componentUrl,
    },
    windows: {
      overview:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/windows/ButtonOverview.md') as string,
      usage:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/windows/ButtonUsage.md') as string,
      related,
      componentUrl,
    },
    mac: {
      overview:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/mac/ButtonOverview.md') as string,
      usage:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/mac/ButtonUsage.md') as string,
      related,
      componentUrl,
    },
    cross: {
      overview:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/cross/ButtonOverview.md') as string,
      usage:
        require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/ButtonPage/docs/cross/ButtonUsage.md') as string,
      related,
      componentUrl,
    },
  };
};
