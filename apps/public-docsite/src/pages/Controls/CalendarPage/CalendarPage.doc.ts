import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalendarPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Calendar/Calendar.doc';
import { ISideRailLink } from '@fluentui/react-docsite-components/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Calendar', url: '#/controls/web/calendar' },
  { text: 'Android Calendar', url: '#/controls/android/calendar' },
  { text: 'Android Date & Time Picker', url: '#/controls/android/date-time-picker) ' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/CalendarPage';

export const CalendarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview:
      require('!raw-loader?esModule=false!@fluentui/public-docsite/src/pages/Controls/CalendarPage/docs/android/CalendarOverview.md') as string,
    related,
    componentUrl,
  },
};
