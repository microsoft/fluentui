import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TimePickerPageProps } from './TimePickerPage.doc';

export const TimePickerPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...TimePickerPageProps[props.platform!]} />;
};
