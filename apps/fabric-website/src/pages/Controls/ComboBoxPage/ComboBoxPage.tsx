import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ComboBoxPageProps } from './ComboBoxPage.doc';

export class ComboBoxPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ComboBoxPageProps[this.props.platform]} />;
  }
}
