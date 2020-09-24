import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalendarPageProps as ExternalProps } from '@fluentui/examples/lib/office-ui-fabric-react/Calendar/Calendar.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CalendarPage/docs/CalendarRelated.md') as string;
const componentUrl =
  'https://github.com/microsoft/fluentui/tree/master/apps/fabric-website/src/pages/Controls/CalendarPage';

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
