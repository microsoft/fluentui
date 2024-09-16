import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { AreaChartPageProps } from './AreaChartPage.doc';

export const AreaChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...AreaChartPageProps[platform!]} />;
};
