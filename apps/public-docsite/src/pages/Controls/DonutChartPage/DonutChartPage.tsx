import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DonutChartPageProps } from './DonutChartPage.doc';

export const DonutChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...DonutChartPageProps[platform!]} />;
};
