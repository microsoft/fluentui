import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListPageProps } from './DetailsListPage.doc';

export class DetailsListPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListPageProps[this.props.platform]} />;
  }
}
