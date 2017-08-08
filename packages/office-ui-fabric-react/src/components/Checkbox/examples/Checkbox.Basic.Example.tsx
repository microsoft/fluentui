import * as React from 'react';
import {
  Checkbox,
  ICheckboxStyles,
  ICheckboxProps
} from 'office-ui-fabric-react/lib/Checkbox';
import {
  Persona,
  PersonaSize
} from 'office-ui-fabric-react/lib/Persona';
export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
  constructor() {
    super();

    this.state = {
      isChecked: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render() {
    let { isChecked } = this.state;

    let styles: ICheckboxStyles = {
      root: {
        marginTop: '10'
      }
    };

    return (
      <div>
        <Checkbox
          label='Uncontrolled checkbox'
          onChange={ this._onCheckboxChange }
          inputProps={ {
            onFocus: () => { console.log('Uncontrolled checkbox is focused'); },
            onBlur: () => { console.log('Uncontrolled checkbox is blured'); }
          } }
          styles={ styles }
        />

        <Checkbox
          label='Uncontrolled checkbox with defaultChecked true'
          defaultChecked={ true }
          onChange={ this._onCheckboxChange }
          styles={ styles }
        />

        <Checkbox
          label='Disabled uncontrolled checkbox'
          disabled={ true }
          styles={ styles }
        />

        <Checkbox
          label='Disabled uncontrolled checkbox with defaultChecked true'
          disabled={ true }
          defaultChecked={ true }
          onChange={ this._onCheckboxChange }
          styles={ styles }
        />

        <Checkbox
          label='Controlled checkbox'
          checked={ isChecked }
          onChange={ (ev, checked) => {
            this.setState({ isChecked: checked! });
          } }
          styles={ styles }
        />

        <Checkbox
          label='Checkbox rendered with boxSide "end"'
          boxSide='end'
          styles={ styles }
        />

        <Checkbox
          label='Persona Checkbox'
          styles={ styles }
          onRenderLabel={ this._renderPersonaLabel }
        />
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    console.log(`The option has been changed to ${isChecked}.`);
  }

  private _renderPersonaLabel(props: ICheckboxProps) {
    const DEFAULT_IMAGE_URL = '/_layouts/15/userphoto.aspx?size=S&accountname=';
    return <Persona primaryText={ props.label } imageUrl={ DEFAULT_IMAGE_URL } size={ PersonaSize.extraSmall } />;
  }
}
