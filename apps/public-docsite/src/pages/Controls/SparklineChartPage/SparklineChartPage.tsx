import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SparklineChartPageProps } from './SparklineChartPage.doc';

export const SparklineChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...SparklineChartPageProps[platform!]} />;
};
