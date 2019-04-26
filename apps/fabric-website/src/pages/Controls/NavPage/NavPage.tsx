import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { NavPageProps } from './NavPage.doc';

export class NavPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...NavPageProps[this.props.platform]} />;
  }
}
