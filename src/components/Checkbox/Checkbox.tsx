import * as React from 'react';
import './Checkbox.scss';
import { css } from '../../utilities/css';

export interface ICheckboxProps {
  text: string;
  isChecked?: boolean;
  isEnabled?: boolean;
  onChanged?: (isChecked: boolean) => void;

  key?: string;
  ref?: string;
  className?: string;
}

export interface ICheckboxState {
  id?: string;
  isChecked?: boolean;
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

  constructor(props: ICheckboxProps) {
    super(props);

    this._onInputChanged = this._onInputChanged.bind(this);

    this.state = {
      id: `Checkbox-${ _instance++ }`,
      isChecked: props.isChecked
    };
  }

  public onComponentDidReceiveProps(newProps: ICheckboxProps) {
    if (newProps.isChecked !== this.state.isChecked) {
      this.setState({
        isChecked: newProps.isChecked
      });
    }
  }

  public render() {
    let { text, isEnabled, className } = this.props;
    let { isChecked } = this.state;
    let { id } = this.state;

    return (
      <div className={ css('ms-ChoiceField', className) }>
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
