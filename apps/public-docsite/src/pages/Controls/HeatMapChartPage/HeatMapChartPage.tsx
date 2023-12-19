import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { HeatMapChartPageProps } from './HeatMapChartPage.doc';

export const HeatMapChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...HeatMapChartPageProps[platform!]} />;
};
