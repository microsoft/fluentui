import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ThemeProviderProps } from './ThemeProviderPage.doc';

export const ThemeProviderPage: React.FunctionComponent<IControlsPageProps> = props => {
  return <ControlsAreaPage {...props} {...ThemeProviderProps[props.platform!]} />;
};
