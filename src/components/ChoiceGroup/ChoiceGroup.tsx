import * as React from 'react';
import { IChoiceGroupOption, IChoiceGroupProps } from './ChoiceGroup.Props';
import './ChoiceGroup.scss';

let _instance = 0;

export default class ChoiceGroup extends React.Component<IChoiceGroupProps, any> {
  public static defaultProps = {
    options: []
  };

  constructor() {
    super();

    this.state = {
      id: `ChoiceGroup-${_instance++}`
    };
  }

  public render() {
    let { id } = this.state;
    let { label, options } = this.props;

    return (
      // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
      <div role='application'>
        <div className='ms-ChoiceFieldGroup' role='radiogroup'  aria-labelledby={ this.props.label ? id + '-label' : '' }>
          <div className='ms-ChoiceFieldGroup-title'>
            { this.props.label ? <label className='ms-Label is-required' id={ id + '-label' }>{ label }</label> : null }
          </div>

          { options.map(option => (
            <div key={ option.key } className='ms-ChoiceField'>
              <input
                id={ id + '-' + option.key }
                className='ms-ChoiceField-input'
                type='radio'
                name={ id }
                disabled={ option.isDisabled }
                defaultChecked={ option.isChecked }
                aria-checked={ option.isChecked }
                onChange={ this._onChanged.bind(this, option) }
                />
              <label htmlFor={ id + '-' + option.key } className='ms-ChoiceField-field'>
                <span className='ms-Label'>{ option.text }</span>
              </label>
            </div>
          )) }
        </div>
      </div>
    );
  }

  private _onChanged(option: IChoiceGroupOption, evt?: React.SyntheticEvent) {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(option);
    }
  }
}
