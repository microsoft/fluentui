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
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxImplementationExamples extends React.Component<{}, ICheckboxBasicExampleState> {
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
        marginTop: '10px'
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
          ariaDescribedBy={ 'descriptionID' }
        />
        <label id='descriptionID' className='screenReaderOnly'>Uncontroller checkbox description</label>

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
          onChange={ this._onControlledCheckboxChange }
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

  @autobind
  private _onControlledCheckboxChange(ev: React.FormEvent<HTMLElement>, checked: boolean): void {
    this.setState({ isChecked: checked! });
  }

  private _renderPersonaLabel(props: ICheckboxProps) {
    const DEFAULT_IMAGE_URL = '/_layouts/15/userphoto.aspx?size=S&accountname=';
    return <Persona primaryText={ props.label } imageUrl={ DEFAULT_IMAGE_URL } size={ PersonaSize.extraSmall } />;
  }
}
