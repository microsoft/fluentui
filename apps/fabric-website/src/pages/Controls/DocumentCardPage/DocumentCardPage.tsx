import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DocumentCardPageProps } from './DocumentCardPage.doc';

export class DocumentCardPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DocumentCardPageProps[this.props.platform]} />;
  }
}
