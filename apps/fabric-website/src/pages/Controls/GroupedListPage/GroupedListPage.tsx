import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { GroupedListPageProps } from './GroupedListPage.doc';

export class GroupedListPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...GroupedListPageProps[this.props.platform]} />;
  }
}
