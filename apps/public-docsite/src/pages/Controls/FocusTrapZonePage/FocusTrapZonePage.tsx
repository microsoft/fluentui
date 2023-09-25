import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { FocusTrapZonePageProps } from './FocusTrapZonePage.doc';

export const FocusTrapZonePage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...FocusTrapZonePageProps[props.platform!]} />;
};
