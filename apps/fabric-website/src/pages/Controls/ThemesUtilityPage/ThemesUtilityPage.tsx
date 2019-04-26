import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ThemesUtilityPageProps } from './ThemesUtilityPage.doc';

export class ThemesUtilityPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ThemesUtilityPageProps[this.props.platform]} />;
  }
}
