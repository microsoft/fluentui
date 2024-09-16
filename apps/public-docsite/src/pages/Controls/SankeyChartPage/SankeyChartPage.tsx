import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SankeyChartPageProps } from './SankeyChartPage.doc';

export const SankeyChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...SankeyChartPageProps[platform!]} />;
};
