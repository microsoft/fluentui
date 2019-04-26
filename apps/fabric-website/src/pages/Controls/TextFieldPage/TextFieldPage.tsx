import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { TextFieldPageProps } from './TextFieldPage.doc';

export class TextFieldPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...TextFieldPageProps[this.props.platform]} />;
  }
}
