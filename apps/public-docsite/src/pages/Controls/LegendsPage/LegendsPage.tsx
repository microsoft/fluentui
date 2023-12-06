import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LegendsPageProps } from './LegendsPage.doc';

export const LegendsPage: React.FunctionComponent<IControlsPageProps> = props => {
  const { platform } = props;
  return <ControlsAreaPage {...props} {...LegendsPageProps[platform!]} />;
};
