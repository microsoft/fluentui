import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ColorPickerPageProps } from './ColorPickerPage.doc';

export const ColorPickerPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ColorPickerPageProps[props.platform!]} />;
};
