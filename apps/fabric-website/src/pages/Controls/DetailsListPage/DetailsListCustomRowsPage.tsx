import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomRowsPageProps } from './DetailsListCustomRowsPage.doc';

export class DetailsListCustomRowsPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListCustomRowsPageProps[this.props.platform]} />;
  }
}
