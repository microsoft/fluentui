import * as React from 'react';
import './ChoiceGroup.scss';

export interface IChoiceGroupOption {
  key: string;
  text: string;
  isDisabled?: boolean;
  isChecked?: boolean;
}

export interface IChoiceGroupProps {
  options: IChoiceGroupOption[];
  onChanged: any;
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
    let { options, onChanged } = this.props;
    let rootClass = 'ms-ChoiceFieldGroup';

    return (
      
    <div className={ rootClass }>
      <div className="ms-ChoiceFieldGroup-title">
        <label className="ms-Label is-required">Pick one</label>
      </div>
      
    	{ options.map(option => (
        <div className="ms-ChoiceField">
          <input id={ id + '-' + option.key } className="ms-ChoiceField-input" type="radio" name={ id } disabled={ option.isDisabled } defaultChecked={ option.isChecked } onChange={ function() { onChanged(); } } />
          <label htmlFor={ id + '-' + option.key } className="ms-ChoiceField-field">
            <span className="ms-Label">{ option.text }</span>
          </label>
        </div>
      )) }
      
    </div>

    );
  }
}
