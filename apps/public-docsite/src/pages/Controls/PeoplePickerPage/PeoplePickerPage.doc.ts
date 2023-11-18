import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PeoplePickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/PeoplePicker/PeoplePicker.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web PeoplePicker', url: '#/controls/web/peoplepicker' },
  { text: 'Android PeoplePicker', url: '#/controls/android/peoplepicker' },
  { text: 'Android PersonaChip', url: '#/controls/android/chip' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/blob/master/packages/react/src/components/pickers/PeoplePicker';

export const PeoplePickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
    componentUrl,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/PeoplePickerPage/docs/android/PeoplePickerOverview.md') as string,
    related,
    componentUrl,
  },
};
