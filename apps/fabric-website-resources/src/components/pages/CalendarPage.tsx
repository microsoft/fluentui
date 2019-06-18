import * as React from 'react';
import { CalendarPageProps } from 'office-ui-fabric-react/lib/components/Calendar/Calendar.doc';
import { DemoPage } from '../DemoPage';

export const CalendarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Calendar.page.json')}
    {...{ ...CalendarPageProps, ...props }}
  />
);
