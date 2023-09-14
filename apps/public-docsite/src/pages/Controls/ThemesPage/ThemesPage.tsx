import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ThemesPageProps } from './ThemesPage.doc';

export const ThemesPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ThemesPageProps[props.platform!]} />;
};
