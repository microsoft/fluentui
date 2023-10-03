import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { VerticalBarChartPageProps } from './VerticalBarChartPage.doc';

export const VerticalBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...VerticalBarChartPageProps[platform!]} />;
};
