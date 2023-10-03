import * as React from 'react';
import { DemoPage } from '../../DemoPage';

import { HorizontalBarChartWithAxisPageProps } from '@fluentui/react-examples/lib/react-charting/HorizontalBarChartWithAxis/HorizontalBarChartWithAxis.doc';

export const HorizontalBarChartWithAxisPage = (props: { isHeaderVisible: boolean }) => (
  <DemoPage
    jsonDocs={require('../../../../dist/api/react-charting/HorizontalBarChartWithAxis.page.json')}
    {...{ ...HorizontalBarChartWithAxisPageProps, ...props }}
  />
);
