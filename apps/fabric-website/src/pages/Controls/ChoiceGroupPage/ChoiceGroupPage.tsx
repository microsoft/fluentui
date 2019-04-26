import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ChoiceGroupPageProps } from './ChoiceGroupPage.doc';

export class ChoiceGroupPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ChoiceGroupPageProps[this.props.platform]} />;
  }
}
