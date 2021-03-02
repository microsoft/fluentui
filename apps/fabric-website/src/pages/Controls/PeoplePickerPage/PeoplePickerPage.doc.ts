import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { PeoplePickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/PeoplePicker/PeoplePicker.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web PeoplePicker', url: '#/controls/web/peoplepicker' },
  { text: 'Android PeoplePicker', url: '#/controls/android/peoplepicker' },
  { text: 'Android PersonaChip', url: '#/controls/android/chip' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/blob/7.0/packages/office-ui-fabric-react/src/components/pickers/PeoplePicker';

export const PeoplePickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
    componentUrl,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/PeoplePickerPage/docs/android/PeoplePickerOverview.md') as string,
    related,
    componentUrl,
  },
};
