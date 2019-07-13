import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SwatchColorPickerPageProps } from './SwatchColorPickerPage.doc';

export const SwatchColorPickerPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SwatchColorPickerPageProps[props.platform]} />;
};
