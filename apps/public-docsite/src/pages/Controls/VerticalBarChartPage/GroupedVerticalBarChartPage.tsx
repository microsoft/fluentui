import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { GroupedVerticalBarChartPageProps } from './GroupedVerticalBarChartPage.doc';

export const GroupedVerticalBarChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...GroupedVerticalBarChartPageProps[platform!]} />;
};
