import * as React from 'react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ContextualMenuPageProps } from './ContextualMenuPage.doc';

export class ContextualMenuPage extends React.Component<IControlsPageProps, {}> {
  public render() {
    return <ControlsAreaPage {...this.props} {...ContextualMenuPageProps[this.props.platform]} />;
  }
}
