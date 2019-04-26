import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DropdownPageProps } from './DropdownPage.doc';

export class DropdownPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DropdownPageProps[this.props.platform]} />;
  }
}
