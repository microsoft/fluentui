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
  private _checkBox: HTMLInputElement;

  constructor(props: ICheckboxProps) {
    super(props);

    this.state = {
      isChecked: props.isChecked
    };

    this._id = `checkbox-${ _instance++ }`;

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  public componentWillReceiveProps(newProps: ICheckboxProps) {
    if (newProps.isChecked !== this.props.isChecked) {
      this.setState({
        isChecked: newProps.isChecked
      });
    }
  }

  public render() {
    let { text, isEnabled, className } = this.props;
    let { isChecked } = this.state;

    return (
      <div className={ css('ms-ChoiceField', className) }>
        <input
          ref={ (c): HTMLInputElement => this._checkBox = c }
          id={ this._id }
          name={ this._id }
          className='ms-ChoiceField-input'
          type='checkbox'
          role='checkbox'
          checked={ isChecked }
          disabled={ !isEnabled }
          onChange={ this._handleInputChange }
          aria-checked={ isChecked }
        />
        <label htmlFor={ this._id } className='ms-ChoiceField-field'>
          { text && <span className='ms-Label'>{ text }</span> }
        </label>
      </div>
    );
  }

  public focus() {
      if (this._checkBox) {
          this._checkBox.focus();
      }
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
