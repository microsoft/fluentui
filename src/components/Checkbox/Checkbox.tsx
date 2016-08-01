import * as React from 'react';
import { ICheckboxProps } from './Checkbox.Props';
import { css } from '../../utilities/css';
import './Checkbox.scss';

export interface ICheckboxState {
  isChecked: boolean;
}

let _instance: number = 0;

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public static defaultProps = {
    isSelected: false,
    isEnabled: true
  };

  private _id: string;
  private _checkbox: HTMLElement;
  private _checkboxInput: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this.state = {
      isChecked: props.isChecked
    };

    this._id = `checkbox-${ _instance++ }`;

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  public componentDidMount() {
    this._checkboxInput.addEventListener('focus', this._onFocus.bind(this), false);
    this._checkboxInput.addEventListener('blur', this._onBlur.bind(this), false);
  }

  public componentWillReceiveProps(newProps: ICheckboxProps) {
    if (newProps.isChecked !== this.props.isChecked) {
      this.setState({
        isChecked: newProps.isChecked
      });
    }
  }

  public componentWillUnmount() {
    this._checkboxInput.removeEventListener('focus', this._onFocus.bind(this));
    this._checkboxInput.removeEventListener('blur', this._onBlur.bind(this));
  }

  public render() {
    let { text, isEnabled, className } = this.props;
    let { isChecked } = this.state;

    return (
      <div
        className={ css('ms-Checkbox', className) }
        ref={ (c): HTMLElement => this._checkbox = c }
      >
        <input
          ref={ (c): HTMLInputElement => this._checkboxInput = c }
          id={ this._id }
          name={ this._id }
          className='ms-Checkbox-input'
          type='checkbox'
          role='checkbox'
          checked={ isChecked }
          disabled={ !isEnabled }
          onChange={ this._handleInputChange }
          aria-checked={ isChecked }
        />
        <label
          htmlFor={ this._id }
          className={ css('ms-Checkbox-field', isChecked && 'is-checked', !isEnabled && 'is-disabled') }

        >
          { text && <span className='ms-Label'>{ text }</span> }
        </label>
      </div>
    );
  }

  public focus() {
      if (this._checkboxInput) {
          this._checkboxInput.focus();
      }
  }

  private _onFocus(): void {
    this._checkbox.classList.add('is-inFocus');
  }

  private _onBlur(): void {
    this._checkbox.classList.remove('is-inFocus');
  }

  private _handleInputChange(evt: React.FormEvent) {
    let { onChanged } = this.props;
    const isChecked = (evt.target as HTMLInputElement).checked;

    this.setState({
      isChecked: isChecked
    });

    if (onChanged) {
      onChanged(isChecked);
    }
  }
}
