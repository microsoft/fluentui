import * as React from 'react';
import { CalendarPageProps } from '@fluentui/react-examples/lib/react/Calendar/Calendar.doc';
import { DemoPage } from '../DemoPage';

export const CalendarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage jsonDocs={require('../../../dist/api/react/Calendar.page.json')} {...{ ...CalendarPageProps, ...props }} />
);
