import * as React from 'react';
import { IToggleProps } from './Toggle.Props';
import './Toggle.scss';

export interface IToggleState {
  isToggled: boolean;
}

let _instance: number = 0;

export class Toggle extends React.Component<IToggleProps, IToggleState> {

  public static initialProps = {
    label: '',
    isToggled: false,
    onText: 'On',
    offText: 'Off'
  };

  private _id: string;

  constructor(props: IToggleProps) {
    super();

    this.state = {
      isToggled: props.isToggled
    };

    this._id = `Toggle-${ _instance++ }`;

    this._handleInputChange = this._handleInputChange.bind(this);
  }

  public componentWillReceiveProps(newProps: IToggleProps) {
    if (newProps.isToggled !== this.props.isToggled) {
      this.setState({
        isToggled: newProps.isToggled
      });
    }
  }

  public render() {
    let { label, onText, offText } = this.props;
    let { isToggled } = this.state;

    return (
      <div className='ms-Toggle'>
        <label className='ms-Toggle-description'>{ label }</label>
        <input
          id={ this._id }
          name={ this._id }
          type='checkbox'
          className='ms-Toggle-input'
          checked={ isToggled }
          aria-pressed={ isToggled }
          onChange={ this._handleInputChange }
          aria-label={ label }
        />
        <label className='ms-Toggle-field' title={ label } htmlFor={ this._id }>
          <span className='ms-Label ms-Label--off'>{ offText }</span>
          <span className='ms-Label ms-Label--on'>{ onText }</span>
        </label>
      </div>
    );
  }

  private _handleInputChange(evt: React.FormEvent) {
    let { onChanged } = this.props;
    const isToggled = (evt.target as HTMLInputElement).checked;

    this.setState({
      isToggled: isToggled
    });

    if (onChanged) {
      onChanged(isToggled);
    }
  }
}
