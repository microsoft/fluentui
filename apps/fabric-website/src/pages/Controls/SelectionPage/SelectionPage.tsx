import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SelectionPageProps } from './SelectionPage.doc';
export class SelectionPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SelectionPageProps[this.props.platform]} />;
  }
}
