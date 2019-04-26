import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { PeoplePickerPageProps } from './PeoplePickerPage.doc';

export class PeoplePickerPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...PeoplePickerPageProps[this.props.platform]} />;
  }
}
