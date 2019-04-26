import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { BreadcrumbPageProps } from './BreadcrumbPage.doc';

export class BreadcrumbPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...BreadcrumbPageProps[this.props.platform]} />;
  }
}
