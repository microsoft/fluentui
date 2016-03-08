import * as React from 'react';
import './Toggle.scss';

export interface IToggleProps {
  label: string;
  isToggled?: boolean;
  onText?: string;
  offText?: string;
  onChanged?: (isToggled: boolean) => void;
}

export default class Toggle extends React.Component<IToggleProps, any> {

  public static initialProps = {
    label: '',
    isToggled: false,
    onText: 'On',
    offText: 'Off'
  };

  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  public render() {
    let { label, isToggled, onText, offText } = this.props;

    return (
      <div className='ms-Toggle' onClick={ this._handleClick }>
        <span className='ms-Toggle-description'>{ label }</span>
        <input ref='input' type='checkbox' className='ms-Toggle-input' checked={ isToggled } onChange={ this._handleClick } />
        <label className='ms-Toggle-field'>
          <span className='ms-Label ms-Label--off'>{ offText }</span>
          <span className='ms-Label ms-Label--on'>{ onText }</span>
        </label>
      </div>
    );
  }

  private _handleClick(ev: React.MouseEvent) {
    let { onChanged, isToggled } = this.props;

    if (onChanged) {
      onChanged(!isToggled);
    }
  }
}
