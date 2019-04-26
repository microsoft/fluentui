import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ModalPageProps } from './ModalPage.doc';

export class ModalPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ModalPageProps[this.props.platform]} />;
  }
}
