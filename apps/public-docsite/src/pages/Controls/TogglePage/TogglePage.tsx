import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TogglePageProps } from './TogglePage.doc';

export const TogglePage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...TogglePageProps[props.platform!]} />;
};
