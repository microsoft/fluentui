import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { CardPageProps } from './CardPage.doc';

export const CardPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...CardPageProps[props.platform]} />;
};
