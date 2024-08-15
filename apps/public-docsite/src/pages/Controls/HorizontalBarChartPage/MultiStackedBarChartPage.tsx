import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { MultiStackedBarChartPageProps } from './MultiStackedBarChartPage.doc';

export const MultiStackedBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...MultiStackedBarChartPageProps[platform!]} />;
};
