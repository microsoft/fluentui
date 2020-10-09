import * as React from 'react';
import { CalendarPageProps } from '@fluentui/react-examples/lib/react/Calendar/Calendar.doc';
import { DemoPage } from '../DemoPage';

export const CalendarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/react/Calendar.page.json')}
    {...{ ...CalendarPageProps, ...props }}
  />
);
