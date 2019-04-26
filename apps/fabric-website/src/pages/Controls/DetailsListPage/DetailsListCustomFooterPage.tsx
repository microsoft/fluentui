import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListCustomFooterPageProps } from './DetailsListCustomFooterPage.doc';

export class DetailsListCustomFooterPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListCustomFooterPageProps[this.props.platform]} />;
  }
}
