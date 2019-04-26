import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { SelectionUtilityPageProps } from './SelectionUtilityPage.doc';
export class SelectionUtilityPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...SelectionUtilityPageProps[this.props.platform]} />;
  }
}
