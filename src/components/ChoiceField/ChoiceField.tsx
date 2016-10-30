import * as React from 'react';
import { IChoiceFieldProps } from './ChoiceField.Props';
import { css } from '../../utilities/css';
import '../Checkbox/Checkbox.scss';

let _instance: number = 0;

export class ChoiceField extends React.Component<IChoiceFieldProps, {}> {
  public static defaultProps = {
    disabled: false
  };

  private _id: string;
  private _inputId: string;
  private _ChoiceField: HTMLInputElement;

  constructor(props: IChoiceFieldProps) {
    super(props);

    this._id = props.id || `ChoiceField-${ props.name || _instance++ }`;
    this._inputId = `${ this._id }_input`;

    this._handleInputChanged = this._handleInputChanged.bind(this);
    this._getAriaChecked = this._getAriaChecked.bind(this);
  }

  public render() {
    // TODO spreading the remaining props would be nice but no TS support yet
    const { className, label, name /*, ...props */ } = this.props;

    return (
      <div className={ css('ms-ChoiceField', className) } id={ this._id }>
        <input {...this.props} /* { ...props} */
          className='ms-ChoiceField-input'
          type='checkbox'
          role='checkbox'
          ref={ (c): HTMLInputElement => this._ChoiceField = c }
          id={ this._inputId }
          name={ name || this._inputId }
          onChange={ this._handleInputChanged }
          aria-checked={ this._getAriaChecked() }
        />
        <label htmlFor={ this._inputId } className='ms-ChoiceField-field'>
          { label && <span className='ms-Label'>{ label }</span> }
        </label>
      </div>
    );
  }

  public focus() {
    if (this._ChoiceField) {
      this._ChoiceField.focus();
    }
  }

  public get checked() {
    if (this._ChoiceField) {
      return this._ChoiceField.checked;
    }

    return this.props.defaultChecked;
  }

  private _handleInputChanged(evt: React.SyntheticEvent) {
    const isChecked = (evt.target as HTMLInputElement).checked;

    if (this.props.onChange) {
      this.props.onChange(evt, isChecked);
    }
  }

  private _getAriaChecked() {
    const isControlled = typeof this.props.checked === 'boolean';

    return isControlled ? this.props.checked : this.checked;
  }
}
