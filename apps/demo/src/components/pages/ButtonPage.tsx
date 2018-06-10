import * as React from 'react';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { ButtonPageProps } from 'office-ui-fabric-react/lib/components/Button/Button.doc';
import { DemoPage } from '../DemoPage';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import * as exampleStylesImport from 'office-ui-fabric-react/lib/common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export interface IButtonDemoPageState {
  areButtonsDisabled?: boolean;
  areButtonsChecked?: boolean;
}

export class ButtonPage extends React.Component<IDocPageProps, IButtonDemoPageState> {
  constructor(props: IDocPageProps) {
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

  render() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;

    return (
      <div>
        <Checkbox
          className={exampleStyles.exampleCheckbox}
          label="Disable buttons"
          checked={areButtonsDisabled}
          onChange={this._onDisabledChanged}
        />
        <Checkbox
          className={exampleStyles.exampleCheckbox}
          label="Mark as checked"
          checked={areButtonsChecked}
          onChange={this._onToggledChanged}
        />
        <DemoPage {...{ ...ButtonPageProps({ areButtonsDisabled, areButtonsChecked }), ...this.props }} />
      </div>
    );
  }
}
