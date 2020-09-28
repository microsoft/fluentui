import * as React from 'react';
import { CalendarPageProps } from '@fluentui/react-examples/lib/office-ui-fabric-react/Calendar/Calendar.doc';
import { DemoPage } from '../DemoPage';

export const CalendarPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Calendar.page.json')}
    {...{ ...CalendarPageProps, ...props }}
  />
);
