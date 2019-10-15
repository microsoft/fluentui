import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PanelPageProps } from './PanelPage.doc';

export const PanelPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...PanelPageProps[props.platform]} />;
};
