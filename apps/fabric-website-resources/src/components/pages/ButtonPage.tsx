import * as React from 'react';
import { ButtonPageProps } from 'office-ui-fabric-react/lib/components/Button/Button.doc';
import { DemoPage } from '../DemoPage';
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';

const checkboxStyles: Partial<IStyleSet<ICheckboxStyles>> = {
  root: { margin: '10px 0' }
};

export interface IButtonDemoPageState {
  areButtonsDisabled: boolean;
  areButtonsChecked: boolean;
}

export interface IButtonDemoPageProps {
  isHeaderVisible?: boolean;
}

export class ButtonPage extends React.Component<IButtonDemoPageProps, IButtonDemoPageState> {
  constructor(props: IButtonDemoPageProps) {
    super(props);
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  private _onDisabledChanged = (ev: React.MouseEvent<HTMLElement>, disabled: boolean): void => {
    this.setState({
      areButtonsDisabled: disabled
    });
  };

  private _onToggledChanged = (ev: React.MouseEvent<HTMLElement>, toggled: boolean): void => {
    this.setState({
      areButtonsChecked: toggled
    });
  };

  renderKnobs() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    return (
      <>
        <Checkbox styles={checkboxStyles} label="Disable buttons" checked={areButtonsDisabled} onChange={this._onDisabledChanged} />
        <Checkbox styles={checkboxStyles} label="Mark as checked" checked={areButtonsChecked} onChange={this._onToggledChanged} />
      </>
    );
  }

  render() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;

    return (
      <DemoPage
        jsonDocs={require('@uifabric/api-docs/lib/pages/office-ui-fabric-react/Button.page.json')}
        {...{
          ...ButtonPageProps({ areButtonsDisabled, areButtonsChecked }),
          ...this.props,
          exampleKnobs: this.renderKnobs()
        }}
      />
    );
  }
}
