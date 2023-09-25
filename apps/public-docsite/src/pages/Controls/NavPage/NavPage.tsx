import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { NavPageProps } from './NavPage.doc';

export const NavPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...NavPageProps[props.platform!]} />;
};
