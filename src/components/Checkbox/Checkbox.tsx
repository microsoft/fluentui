import * as React from 'react';
import './Checkbox.scss';

export interface ICheckboxProps {
  text: string;
  isChecked?: boolean;
  isEnabled?: boolean;
  onChanged?: (isChecked: boolean) => void;
}

export interface ICheckboxState {
  id: string;
}

let _instance = 0;

export default class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public static defaultProps = {
    isSelected: false,
    isEnabled: true
  };

  public refs: {
    [key: string]: React.ReactInstance;
    input: HTMLInputElement;
  };

  private _instanceId: string;

  constructor() {
    super();

    this._onInputChanged = this._onInputChanged.bind(this);

    this.state = {
      id: `Checkbox-${ _instance++ }`
    };
  }

  render() {
    let { text, isChecked, isEnabled, onChanged } = this.props;
    let { id } = this.state;
    let rootClass = 'ms-ChoiceField';

    return (
      <div className={ rootClass }>
        <input ref='input' id={ id } className='ms-ChoiceField-input' type='checkbox' defaultChecked={ isChecked } disabled={ !isEnabled } onChange={ this._onInputChanged } />
        <label htmlFor={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }

  private _onInputChanged(ev: React.FormEvent) {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(this.refs.input.checked);
    }
  }

}
