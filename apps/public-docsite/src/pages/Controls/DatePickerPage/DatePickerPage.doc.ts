import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { DatePickerPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/DatePicker/DatePicker.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web DatePicker', url: '#/controls/web/datepicker' },
  { text: 'iOS Date & Time Picker', url: '#/controls/ios/date-time-picker' },
  { text: 'Android Date & Time Picker', url: '#/controls/android/date-time-picker' },
  { text: 'Android Calendar', url: '#/controls/android/calendar' },
  { text: 'macOS DatePicker', url: '#/controls/mac/date-picker' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/DatePickerPage';

export const DatePickerPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  ios: {
    title: 'Date & Time Picker',
    fileNamePrefix: 'DateTimePicker',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/ios/DateTimePickerOverview.md') as string,
    related,
    componentUrl,
  },
  android: {
    title: 'Date & Time Picker',
    fileNamePrefix: 'DateTimePicker',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/android/DateTimePickerOverview.md') as string,
    related,
    componentUrl,
  },
  mac: {
    title: 'Date Picker',
    fileNamePrefix: 'DatePicker',
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/mac/DatePickerOverview.md') as string,
    usage:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/DatePickerPage/docs/mac/DatePickerUsage.md') as string,
    related,
    componentUrl,
  },
};
