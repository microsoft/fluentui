import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PickersPageProps } from './PickersPage.doc';

export class PickersPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...PickersPageProps[this.props.platform]} />;
  }
}
