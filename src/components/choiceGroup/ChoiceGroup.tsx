import * as React from 'react';

export interface IChoiceGroupOption {
  key: string;
  text: string;
  disabled?: boolean;
  checked?: boolean;
}

export interface IChoiceGroupProps {
  options: IChoiceGroupOption[];
}

let _instance = 0;

export default class ChoiceGroup extends React.Component<IChoiceGroupProps, any> {
  static defaultProps = {
    options: []
  };

  constructor() {
    super();

    this.state = {
      id: `ChoiceGroup-${ _instance++ }`
    };
  }
  render() {
    let { id } = this.state;
    let { options } = this.props;
    let rootClass = 'ms-ChoiceFieldGroup';

    return (
      
    <div className={ rootClass }>
      <div className="ms-ChoiceFieldGroup-title">
        <label className="ms-Label is-required">Pick one</label>
      </div>
      
    	{ options.map(option => (
        <div className="ms-ChoiceField">
          <input id={ id + '-' + option.key } className="ms-ChoiceField-input" type="radio" name={ id } disabled={ option.disabled } defaultChecked={ option.checked } />
          <label htmlFor={ id + '-' + option.key } className="ms-ChoiceField-field">
            <span className="ms-Label">{ option.text }</span>
          </label>
        </div>
      )) }
      

    </div>
      
      
    );
  }
}
