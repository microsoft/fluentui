import * as React from 'react';

export interface ICheckboxProps {
  text: string;
  isSelected?: boolean;
  isEnabled?: boolean;
  onChanged?: any;
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

  private _instanceId: string;

  constructor() {
    super();

    this.state = {
      id: `Checkbox-${ _instance++ }`
    };
  }
  
  render() {
    let { text, isSelected, isEnabled, onChanged } = this.props;
    let { id } = this.state;
    let rootClass = 'ms-ChoiceField';

    return (
      <div className={ rootClass }>
        <input id={ id } className='ms-ChoiceField-input' type='checkbox' defaultChecked={ isSelected } disabled={ !isEnabled } onChange={ function() { onChanged(); } } />
        <label htmlFor={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }

}
