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

  constructor(props: {}) {
    super(props);

    this.state = {
      isChecked: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render() {
    let { isChecked } = this.state;

    return (
      <div>
        <Checkbox
          label='Uncontrolled checkbox'
          onChange={ this._onCheckboxChange }
          inputProps={ {
            onFocus: () => { console.log('Uncontrolled checkbox is focused'); },
            onBlur: () => { console.log('Uncontrolled checkbox is blured'); }
          } }
          ariaDescribedBy={ 'descriptionID' }
        />
        <label id='descriptionID' className='screenReaderOnly'>Uncontroller checkbox description</label>
        <br />
        <Checkbox
          label='Uncontrolled checkbox with defaultChecked true'
          defaultChecked={ true }
          onChange={ this._onCheckboxChange }
        />
        <br />
        <Checkbox
          label='Disabled uncontrolled checkbox'
          disabled={ true }
        />
        <br />
        <Checkbox
          label='Disabled uncontrolled checkbox with defaultChecked true'
          disabled={ true }
          defaultChecked={ true }
          onChange={ this._onCheckboxChange }
        />
        <br />
        <Checkbox
          label='Controlled checkbox'
          checked={ isChecked }
          onChange={ this._onControlledCheckboxChange }
        />
        <br />
        <Checkbox
          label='Checkbox rendered with boxSide "end"'
          boxSide='end'
        />
        <br />
        <Checkbox
          label='Persona Checkbox'
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
    return <Persona primaryText={ props.label } imageUrl={ DEFAULT_IMAGE_URL } size={ PersonaSize.size32 } />;
  }
}
