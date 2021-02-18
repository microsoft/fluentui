import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalendarPageProps as ExternalProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Calendar/Calendar.doc';
import { ISideRailLink } from '@uifabric/example-app-base/lib/index2';

const related: ISideRailLink[] = [
  { text: 'Web Calendar', url: '#/controls/web/calendar' },
  { text: 'Android Calendar', url: '#/controls/android/calendar' },
  { text: 'Android Date & Time Picker', url: '#/controls/android/date-time-picker) ' },
];
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/7.0/apps/fabric-website/src/pages/Controls/CalendarPage';

export const CalendarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CalendarPage/docs/android/CalendarOverview.md') as string,
    related,
    componentUrl,
  },
};
