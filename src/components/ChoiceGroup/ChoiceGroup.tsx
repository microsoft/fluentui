import * as React from 'react';
import { Image } from '../../Image';
import { IChoiceGroupOption, IChoiceGroupProps } from './ChoiceGroup.Props';
import { css } from '../../utilities/css';
import './ChoiceGroup.scss';

export interface IChoiceGroupState {
  keyChecked: string;
}

let _instance = 0;

export class ChoiceGroup extends React.Component<IChoiceGroupProps, IChoiceGroupState> {
  public static defaultProps = {
    options: []
  };

  private _id: string;
  private _descriptionId: string;
  private _choiceFieldGroup: HTMLElement;
  private _choiceFieldElements: HTMLElement[];
  private _inputElements: HTMLInputElement[];

  constructor(props: IChoiceGroupProps) {
    super();

    this.state = {
      keyChecked: this._getKeyChecked(props.options)
    };

    this._id = `ChoiceGroup-${ _instance++ }`;
    this._descriptionId = `ChoiceGroupDescription-${ _instance++ }`;
    this._choiceFieldElements = [];
    this._inputElements = [];
  }

  public componentDidMount() {
    this._inputElements.forEach( inputElement => {
      inputElement.addEventListener('focus', this._onFocus.bind(this), false);
      inputElement.addEventListener('blur', this._onBlur.bind(this), false);
    });
  }

  public componentWillReceiveProps(newProps: IChoiceGroupProps) {
    const newKeyChecked: string = this._getKeyChecked(newProps.options);
    const oldKeyCheched: string = this._getKeyChecked(this.props.options);

    if (newKeyChecked !== oldKeyCheched) {
      this.setState({
        keyChecked: newKeyChecked
      });
    }
  }

  public componentWillUnmount() {
    this._inputElements.forEach( inputElement => {
      if (inputElement) {
        inputElement.removeEventListener('focus', this._onFocus.bind(this));
        inputElement.removeEventListener('blur', this._onBlur.bind(this));
      }
    });
  }

  public render() {
    let { label, options, className, required } = this.props;
    let { keyChecked } = this.state;

    const titleClassName = css('ms-Label', className, {
      'is-required': required
    });

    return (
      // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
      <div role='application' className={ className }>
        <div
          className='ms-ChoiceFieldGroup'
          role='radiogroup'
          aria-labelledby={ this.props.label ? this._id + '-label' : '' }
          ref={ (c): HTMLElement => this._choiceFieldGroup = c }
        >
          <div className='ms-ChoiceFieldGroup-title'>
            { this.props.label ? <label className={ titleClassName } id={ this._id + '-label' }>{ label }</label> : null }
          </div>

          { options.map((option, index) => (
            <div
              key={ option.key }
              className={ css('ms-ChoiceField', { 'ms-ChoiceField--image': !!option.imageSrc}) }
              ref={ (c): HTMLElement => { this._choiceFieldElements.push(c); return c; } }
            >
              <input
                ref={ (c): HTMLInputElement => { this._inputElements.push(c); return c; } }
                id={ `${this._id}-${option.key}` }
                className='ms-ChoiceField-input'
                type='radio'
                name={ this._id }
                disabled={ option.isDisabled }
                checked={ option.key === keyChecked }
                onChange={ this._handleInputChange.bind(this, option) }
                aria-describedby={ `${this._descriptionId}-${option.key}` }
              />
              { this._renderField(option) }
            </div>
          )) }
        </div>
      </div>
    );
  }

  public focus() {
    if (this._choiceFieldGroup) {
      this._choiceFieldGroup.focus();
    }
  }

  private _onFocus(event): void {
    if (event.target && event.target.parentNode) {
      event.target.parentNode.classList.add('is-inFocus');
    }
  }

  private _onBlur(event): void {
    if (event.target && event.target.parentNode) {
      event.target.parentNode.classList.remove('is-inFocus');
    }
  }

  private _renderField(option: IChoiceGroupOption) {
    const { keyChecked } = this.state;

    return (
      <label
        htmlFor={ this._id + '-' + option.key }
        className={ css(
                      option.imageSrc ? 'ms-ChoiceField-field--image' : 'ms-ChoiceField-field',
                      {'is-checked': option.key === keyChecked },
                      {'is-disabled': option.isDisabled }
                    ) }
      >
        {
          option.imageSrc
            ? <div className='ms-ChoiceField-innerField'>
                <div className={ css('ms-ChoiceField-imageWrapper', { 'is-hidden': option.key === keyChecked }) }>
                  <Image
                    src={ option.imageSrc }
                    width={ option.imageSize.width }
                    height={ option.imageSize.height }
                  />
                </div>
                <div className={ css('ms-ChoiceField-imageWrapper', { 'is-hidden': option.key !== keyChecked }) }>
                  <Image
                    src={ option.selectedImageSrc }
                    width={ option.imageSize.width }
                    height={ option.imageSize.height }
                  />
                </div>
              </div>
            : null
        }
        {
          option.imageSrc
            ? <div className='ms-ChoiceField-labelWrapper'>
                <i className='ms-ChoiceField-icon ms-Icon ms-Icon--CheckMark' />
                <span id={ `${this._descriptionId}-${option.key}` } className='ms-Label'>{ option.text }</span>
              </div>
            : <span id={ `${this._descriptionId}-${option.key}` } className='ms-Label'>{ option.text }</span>
        }
      </label>
    );
  }

  private _handleInputChange(option: IChoiceGroupOption, evt: React.FormEvent) {
    let { onChanged } = this.props;

    this.setState({
      keyChecked: option.key
    });

    if (onChanged) {
      onChanged(option);
    }
  }

  /**
   * If all the isChecked property of options are falsy values, return undefined;
   * Else return the key of the first option with the truthy isChecked property.
   */
  private _getKeyChecked(options: IChoiceGroupOption[]): string {
    const optionsChecked = options.filter((option: IChoiceGroupOption) => {
      return option.isChecked;
    });

    if (optionsChecked.length === 0) {
      return undefined;
    } else {
      return optionsChecked[0].key;
    }
  }
}
