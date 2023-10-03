import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { HorizontalBarChartWithAxisPageProps } from './HorizontalBarChartWithAxisPage.doc';

export const HorizontalBarChartWithAxisPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...HorizontalBarChartWithAxisPageProps[platform!]} />;
};
