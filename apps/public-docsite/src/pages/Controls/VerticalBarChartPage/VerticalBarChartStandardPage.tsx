import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { VerticalBarChartStandardPageProps } from './VerticalBarChartStandardPage.doc';

export const VerticalBarChartStandardPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...VerticalBarChartStandardPageProps[platform!]} />;
};
