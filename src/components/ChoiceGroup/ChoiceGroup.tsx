import * as React from 'react';
import { css } from '../../utilities/css';
import Image from '../Image/index';
import { IChoiceGroupOption, IChoiceGroupProps } from './ChoiceGroup.Props';
import './ChoiceGroup.scss';

let _instance = 0;

export default class ChoiceGroup extends React.Component<IChoiceGroupProps, any> {
  public static defaultProps = {
    options: []
  };

  private _id: string;
  private _fieldDescriptionId: string;

  constructor() {
    super();

    this._id = `ChoiceGroup-${ _instance++ }`;
    this._fieldDescriptionId = `ChoiceFieldDescription-${ _instance++ }`;
  }

  public render() {
    let { label, options } = this.props;

    return (
      // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
      <div role='application'>
        <div className='ms-ChoiceFieldGroup' role='radiogroup'  aria-labelledby={ this.props.label ? this._id + '-label' : '' }>
          <div className='ms-ChoiceFieldGroup-title'>
            { this.props.label ? <label className='ms-Label is-required' id={ this._id + '-label' }>{ label }</label> : null }
          </div>

          { options.map(option => (
            <div
              key={ option.key }
              className={ css('ms-ChoiceField', { 'ms-ChoiceField--image': !!option.imageSrc }) }
            >
              <input
                id={ this._id + '-' + option.key }
                className='ms-ChoiceField-input'
                type='radio'
                name={ this._id }
                disabled={ option.isDisabled }
                defaultChecked={ option.isChecked }
                aria-checked={ option.isChecked }
                onChange={ this._onChanged.bind(this, option) }
                aria-describedby={ this._fieldDescriptionId }
              />
              { this._renderField(option) }
            </div>
          )) }
        </div>
      </div>
    );
  }

  private _renderField(option: IChoiceGroupOption) {
    return (
      <label
        htmlFor={ this._id + '-' + option.key }
        className={ option.imageSrc ? 'ms-ChoiceField-field--image' : 'ms-ChoiceField-field' }
      >
        {
          option.imageSrc
            ? <div className='ms-ChoiceField-innerField'>
                <div className='ms-ChoiceField-imageWrapper'>
                  <Image
                    src={ option.isChecked ? option.selectedImageSrc : option.imageSrc }
                    width={ option.imageSize.width }
                    height={ option.imageSize.height }
                  />
                  <span id={ this._fieldDescriptionId } className='ms-Label'>{ option.text }</span>
                </div>
              </div>
            : <span id={ this._fieldDescriptionId } className='ms-Label'>{ option.text }</span>
        }
      </label>
    );
  }

  private _onChanged(option: IChoiceGroupOption, evt?: React.SyntheticEvent) {
    let { onChanged } = this.props;

    if (onChanged) {
      onChanged(option);
    }
  }
}
