import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomGroupHeadersPageProps } from './DetailsListCustomGroupHeadersPage.doc';

export class DetailsListCustomGroupHeadersPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListCustomGroupHeadersPageProps[this.props.platform]} />;
  }
}
