import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CommandBarPageProps } from './CommandBarPage.doc';

export const CommandBarPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CommandBarPageProps[props.platform]} />;
};
