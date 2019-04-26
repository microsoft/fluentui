import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ThemesPageProps } from './ThemesPage.doc';

export class ThemesPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ThemesPageProps[this.props.platform]} />;
  }
}
