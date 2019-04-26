import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ResizeGroupPageProps } from './ResizeGroupPage.doc';

export class ResizeGroupPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ResizeGroupPageProps[this.props.platform]} />;
  }
}
