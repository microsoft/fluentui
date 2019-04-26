import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListGroupedPageProps } from './DetailsListGroupedPage.doc';

export class DetailsListGroupedPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListGroupedPageProps[this.props.platform]} />;
  }
}
