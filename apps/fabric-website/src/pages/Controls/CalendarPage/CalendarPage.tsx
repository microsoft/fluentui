import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CalendarPageProps } from './CalendarPage.doc';

export const CalendarPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CalendarPageProps[props.platform]} />;
};
