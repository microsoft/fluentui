import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { StackedBarChartPageProps } from './StackedBarChartPage.doc';

export const StackedBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...StackedBarChartPageProps[platform!]} />;
};
