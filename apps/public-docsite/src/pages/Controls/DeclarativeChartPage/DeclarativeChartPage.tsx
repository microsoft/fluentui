import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DeclarativeChartPageProps } from './DeclarativeChartPage.doc';

export const DeclarativeChartPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...DeclarativeChartPageProps[platform!]} />;
};
