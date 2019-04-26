import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ButtonPageProps } from './ButtonPage.doc';
import * as exampleStylesImport from 'office-ui-fabric-react/lib/common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export class ButtonPage extends React.Component<
  IControlsPageProps,
  {
    areButtonsDisabled: boolean;
    areButtonsChecked: boolean;
  }
> {
  public constructor(props: IControlsPageProps) {
    super(props);
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  public renderKnobs() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    return (
      <>
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
      </>
    );
  }

  public render() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    const buttonPageProps = ButtonPageProps(areButtonsDisabled, areButtonsChecked);
    return <ControlsAreaPage {...this.props} {...buttonPageProps[this.props.platform]} exampleKnobs={this.renderKnobs()} />;
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
}
