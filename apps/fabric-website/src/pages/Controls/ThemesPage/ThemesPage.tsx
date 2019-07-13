import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ThemesPageProps } from './ThemesPage.doc';

export const ThemesPage: React.StatelessComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ThemesPageProps[props.platform]} />;
};
