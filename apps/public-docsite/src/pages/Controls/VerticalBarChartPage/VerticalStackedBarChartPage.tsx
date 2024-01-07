import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { VerticalStackedBarChartPageProps } from './VerticalStackedBarChartPage.doc';

export const VerticalStackedBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...VerticalStackedBarChartPageProps[platform!]} />;
};
