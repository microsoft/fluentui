import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PieChartPageProps } from './PieChartPage.doc';

export const PieChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...PieChartPageProps[platform!]} />;
};
