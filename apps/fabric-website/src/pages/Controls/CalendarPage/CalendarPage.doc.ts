import { TFabricPlatformPageProps } from '../../../interfaces/Platforms';
import { CalendarPageProps as ExternalProps } from '@uifabric/legacy/lib/components/Calendar/Calendar.doc';

const related = require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/CalendarPage/docs/CalendarRelated.md') as string;

export const CalendarPageProps: TFabricPlatformPageProps = {
  web: {
    ...(ExternalProps as any),
    related
  }
};
