import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DialogPageProps } from './DialogPage.doc';

export class DialogPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DialogPageProps[this.props.platform]} />;
  }
}
