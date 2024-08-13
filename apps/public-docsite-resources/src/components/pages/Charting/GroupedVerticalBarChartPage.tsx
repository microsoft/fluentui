import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { GroupedVerticalBarChartPageProps } from '@fluentui/react-examples/lib/react-charting/GroupedVerticalBarChart/GroupedVerticalBarChart.doc';

export const GroupedVerticalBarChartPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/GroupedVerticalBarChart.page.json')}
    {...{ ...GroupedVerticalBarChartPageProps, ...props }}
  />
);
