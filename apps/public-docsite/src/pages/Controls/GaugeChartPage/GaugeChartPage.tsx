import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { GaugeChartPageProps } from './GaugeChartPage.doc';

export const GaugeChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...GaugeChartPageProps[platform!]} />;
};
