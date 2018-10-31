import * as React from 'react';
import { CalendarPageProps } from 'office-ui-fabric-react/lib/components/Calendar/Calendar.doc';
// import { CalendarPageProps as CalendarNewPageProps } from 'office-ui-fabric-react/lib/components/Calendar_new/Calendar.doc';
import { DemoPage } from '../DemoPage';

export const CalendarPage = (props: { isHeaderVisible: boolean }) => (
  <>
    {/* <DemoPage {...{ ...CalendarNewPageProps, ...props }} /> */}
    <DemoPage {...{ ...CalendarPageProps, ...props }} />
  </>
);
