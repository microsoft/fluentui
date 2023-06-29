import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { LegendsPageProps } from './LegendsPage.doc';

export const TimePickerPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...LegendsPageProps[props.platform]} />;
};
