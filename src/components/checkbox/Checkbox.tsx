import * as React from 'react';

export interface ICheckboxProps {
  text: string;
  isSelected?: boolean;
  isEnabled?: boolean;
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
    let { text, isSelected, isEnabled } = this.props;
    let { id } = this.state;
    let rootClass = 'ms-ChoiceField';

    return (
      <div className={ rootClass }>
        <input id={ id } className='ms-ChoiceField-input' type='checkbox' checked={ isSelected } disabled={ !isEnabled } />
        <label htmlFor={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }

}
