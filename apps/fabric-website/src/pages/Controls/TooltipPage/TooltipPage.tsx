import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TooltipPageProps } from './TooltipPage.doc';

export const TooltipPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...TooltipPageProps[props.platform]} />;
};
