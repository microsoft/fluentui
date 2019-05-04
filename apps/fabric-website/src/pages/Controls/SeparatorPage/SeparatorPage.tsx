import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SeparatorPageProps } from './SeparatorPage.doc';

export const SeparatorPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...SeparatorPageProps[props.platform]} />;
};
