import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { HorizontalBarChartPageProps } from './HorizontalBarChartPage.doc';

export const HorizontalBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...HorizontalBarChartPageProps[platform!]} />;
};
