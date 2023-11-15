import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TreeChartPageProps } from './TreeChartPage.doc';

export const TreeChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...TreeChartPageProps[platform!]} />;
};
