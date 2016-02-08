import * as React from 'react';

export interface IChoiceFieldProps {
  name: string;
  isSelected: boolean;
  isEnabled?: boolean;
}

export interface IChoiceFieldState {
  id: string;
}

let _instance = 0;

export default class ChoiceField extends React.Component<IChoiceFieldProps, IChoiceFieldState> {
  public static defaultProps = {
    isSelected: false,
    isEnabled: true
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

    return (
      <div className={ rootClass }>
        <input id={ id } className='ms-ChoiceField-input' type='radio' checked={ isSelected } disabled={ !isEnabled } />
        <label for={ id } className='ms-ChoiceField-field'>
          <span className='ms-Label'>{ text }</span>
        </label>
      </div>
    );
  }
}
