import * as React from 'react';

export interface IChoiceFieldProps {
  text: string;
  isSelected?: boolean;
  isEnabled?: boolean;
  isMultipleSelect?: boolean;
}

export interface IChoiceFieldState {
  id: string;
}

let _instance = 0;

export default class ChoiceField extends React.Component<IChoiceFieldProps, IChoiceFieldState> {
  public static defaultProps = {
    isSelected: false,
    isEnabled: true,
    isMultipleSelect: false
  };

  private _instanceId: string;

  constructor() {
    super();

    this.state = {
      id: `ChoiceField-${ _instance++ }`
    };
  }
  render() {
    let { text, isSelected, isEnabled } = this.props;
    let { id } = this.state;
    let rootClass = 'ms-ChoiceField';
    let inputType = this.props.isMultipleSelect ? 'checkbox' : 'radio';

    return (
      <div className={ rootClass }>
        <input id={ id } className='ms-ChoiceField-input' type={ inputType } checked={ isSelected } disabled={ !isEnabled } />
        <label htmlFor={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }
}
