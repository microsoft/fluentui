import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { DetailsListNavigatingFocusPageProps } from './DetailsListNavigatingFocusPage.doc';

export class DetailsListNavigatingFocusPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...DetailsListNavigatingFocusPageProps[this.props.platform]} />;
  }
}
