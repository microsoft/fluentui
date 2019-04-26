import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListDragDropPageProps } from './DetailsListDragDropPage.doc';

export class DetailsListDragDropPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListDragDropPageProps[this.props.platform]} />;
  }
}
