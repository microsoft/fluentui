import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalendarPageProps as ExternalProps } from '@fluentui/react-examples/lib/react/Calendar/Calendar.doc';

const related = require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/CalendarPage/docs/CalendarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/public-docsite/src/pages/Controls/CalendarPage';

export const CalendarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related,
  },
  android: {
    overview: require('!raw-loader!@fluentui/public-docsite/src/pages/Controls/CalendarPage/docs/android/CalendarOverview.md') as string,
    related,
    componentUrl,
  },
};
