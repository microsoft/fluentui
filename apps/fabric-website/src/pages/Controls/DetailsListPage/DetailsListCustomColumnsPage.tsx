import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomColumnsPageProps } from './DetailsListCustomColumnsPage.doc';

export class DetailsListCustomColumnsPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListCustomColumnsPageProps[this.props.platform]} />;
  }
}
