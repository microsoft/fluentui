import * as React from 'react';
import { Image } from '../../Image';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import { IChoiceGroupOption, IChoiceGroupProps } from './ChoiceGroup.types';
import {
  assign,
  BaseComponent,
  css,
  getId,
  getNativeProps,
  inputProperties,
  createRef
} from '../../Utilities';
import * as stylesImport from './ChoiceGroup.scss';
const styles: any = stylesImport;

export interface IChoiceGroupState {
  keyChecked: string | number;

  /** Is true when the control has focus. */
  keyFocused?: string | number;
}

export class ChoiceGroup extends BaseComponent<IChoiceGroupProps, IChoiceGroupState> {
  public static defaultProps: IChoiceGroupProps = {
    options: []
  };

  private _id: string;
  private _labelId: string;
  private _inputElement = createRef<HTMLInputElement>();

  constructor(props: IChoiceGroupProps,) {
    super(props);

    this._warnDeprecations({ 'onChanged': 'onChange' });
    this._warnMutuallyExclusive({
      selectedKey: 'defaultSelectedKey'
    });

    this.state = {
      keyChecked: (props.defaultSelectedKey === undefined) ?
        this._getKeyChecked(props)! :
        props.defaultSelectedKey,
      keyFocused: undefined
    };

    this._id = getId('ChoiceGroup');
    this._labelId = getId('ChoiceGroupLabel');
  }

  public componentWillReceiveProps(newProps: IChoiceGroupProps): void {
    const newKeyChecked = this._getKeyChecked(newProps);
    const oldKeyCheched = this._getKeyChecked(this.props);

    if (newKeyChecked !== oldKeyCheched) {
      this.setState({
        keyChecked: newKeyChecked!,
      });
    }
  }

  public render(): JSX.Element {
    const { label, options, className, required } = this.props;
    const { keyChecked, keyFocused } = this.state;

    return (
      // Need to assign role application on containing div because JAWS doesn't call OnKeyDown without this role
      <div role='application' className={ className }>
        <div
          className={ css('ms-ChoiceFieldGroup', styles.root) }
          role='radiogroup'
          aria-labelledby={ `${this.props.label ? this._id + '-label' : ''} ${(this.props as any)['aria-labelledby'] || ''}` }
        >
          { this.props.label && (
            <Label className={ className } required={ required } id={ this._id + '-label' }>{ label }</Label>
          ) }
          <div
            className={ css('ms-ChoiceFieldGroup-flexContainer', options!.some(
              option => Boolean(option.iconProps || option.imageSrc)
            ) && styles.optionsContainIconOrImage) }
          >
            { options!.map((option: IChoiceGroupOption) => {
              const {
                onRenderField = this._onRenderField,
                onRenderLabel = this._onRenderLabel
              } = option;

              // Merge internal props into option
              assign(option, {
                checked: option.key === keyChecked,
                disabled: option.disabled || this.props.disabled,
                id: `${this._id}-${option.key}`,
                labelId: `${this._labelId}-${option.key}`,
                onRenderLabel
              });

              return (
                <div
                  key={ option.key }
                  className={ css('ms-ChoiceField', styles.choiceField, {
                    ['ms-ChoiceField--image ' + styles.choiceFieldIsImage]: !!option.imageSrc,
                    ['ms-ChoiceField--icon ' + styles.choiceFieldIsIcon]: !!option.iconProps,
                    ['is-inFocus ' + styles.choiceFieldIsInFocus]: option.key === keyFocused
                  })
                  }
                >
                  <div className={ css('ms-ChoiceField-wrapper', styles.choiceFieldWrapper) }>
                    <input
                      ref={ this._inputElement }
                      id={ option.id }
                      className={ css('ms-ChoiceField-input', styles.input, {
                        ['ms-ChoiceField--image ' + styles.inputHasImage]: !!option.imageSrc,
                        ['ms-ChoiceField--icon ' + styles.inputHasIcon]: !!option.iconProps
                      }) }
                      type='radio'
                      name={ this.props.name || this._id }
                      disabled={ option.disabled || this.props.disabled }
                      checked={ option.key === keyChecked }
                      required={ required }
                      onChange={ this._onChange.bind(this, option) }
                      onFocus={ this._onFocus.bind(this, option) }
                      onBlur={ this._onBlur.bind(this, option) }
                      aria-labelledby={ option.ariaLabel ? undefined : option.labelId }
                      aria-label={ option.ariaLabel }
                      { ...getNativeProps(option, inputProperties) }
                    />
                    { onRenderField(option, this._onRenderField) }
                  </div>
                </div>
              );
            }) }
          </div>
        </div>
      </div>
    );
  }

  public focus() {
    if (this._inputElement.current) {
      this._inputElement.current.focus();
    }
  }

  private _onFocus(option: IChoiceGroupOption, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      keyFocused: option.key,
      keyChecked: this.state.keyChecked
    });
  }

  private _onBlur(option: IChoiceGroupOption, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      keyFocused: undefined,
      keyChecked: this.state.keyChecked
    });
  }

  private _onRenderField(option: IChoiceGroupOption): JSX.Element {

    const { onRenderLabel } = option;
    const imageSize = option.imageSize ? option.imageSize : { width: 32, height: 32 };
    const imageIsLarge: boolean = imageSize.width > 71 || imageSize.height > 71;

    return (
      <label
        htmlFor={ option.id }
        className={ css('ms-ChoiceField-field', styles.field, {
          ['ms-ChoiceField-field--image ' + styles.fieldIsImage]: !!option.imageSrc,
          ['ms-ChoiceField--icon ' + styles.fieldIsIcon]: !!option.iconProps,
          ['is-checked ' + styles.fieldIsChecked]: option.checked,
          ['is-disabled ' + styles.fieldIsDisabled]: option.disabled,
          ['is-largeImage ' + styles.imageIsLarge]: !!option.imageSrc && imageIsLarge
        }) }
      >
        {
          option.imageSrc && (
            <div
              className={ css('ms-ChoiceField-innerField', styles.innerField) }
              style={ { height: imageSize.height, width: imageSize.width } }
            >
              <div
                className={ css(
                  'ms-ChoiceField-imageWrapper',
                  styles.imageWrapper,
                  {
                    ['is-hidden ' + styles.imageWrapperIsHidden]: option.checked
                  }) }
              >
                <Image
                  src={ option.imageSrc }
                  alt={ option.imageAlt ? option.imageAlt : '' }
                  width={ imageSize.width }
                  height={ imageSize.height }
                />
              </div>
              <div
                className={ css(
                  'ms-ChoiceField-imageWrapper',
                  styles.imageWrapper,
                  {
                    ['is-hidden ' + styles.imageWrapperIsHidden]: !option.checked
                  }) }
              >
                <Image
                  src={ option.selectedImageSrc }
                  alt={ option.imageAlt ? option.imageAlt : '' }
                  width={ imageSize.width }
                  height={ imageSize.height }
                />
              </div>
            </div>
          )
        }
        {
          option.iconProps
            ? <div className={ css('ms-ChoiceField-innerField', styles.innerField) }>
              <div className={ css('ms-ChoiceField-iconWrapper', styles.iconWrapper) }>
                <Icon { ...option.iconProps } />
              </div>
            </div>
            : null
        }
        {
          option.imageSrc || option.iconProps
            ? (
              <div
                className={ css('ms-ChoiceField-labelWrapper', styles.labelWrapper) }
                style={ { maxWidth: imageSize.width * 2 } }
              >
                { onRenderLabel!(option) }
              </div>
            ) : onRenderLabel!(option)
        }
      </label>
    );
  }

  private _onRenderLabel(option: IChoiceGroupOption): JSX.Element {
    return (
      <span id={ option.labelId } className='ms-Label'>{ option.text }</span>
    );
  }

  private _onChange(option: IChoiceGroupOption, evt: React.FormEvent<HTMLInputElement>): void {
    const { onChanged, onChange, selectedKey } = this.props;

    // Only manage state in uncontrolled scenarios.
    if (selectedKey === undefined) {
      this.setState({
        keyChecked: option.key
      });
    }

    // TODO: onChanged deprecated, remove else if after 07/17/2017 when onChanged has been removed.
    if (onChange) {
      onChange(evt, option);
    } else if (onChanged) {
      onChanged(option);
    }
  }

  /**
   * If all the isChecked property of options are falsy values, return undefined;
   * Else return the key of the first option with the truthy isChecked property.
   */
  private _getKeyChecked(props: IChoiceGroupProps): string | number | undefined {
    if (props.selectedKey !== undefined) {
      return props.selectedKey;
    }

    const optionsChecked = props.options!.filter((option: IChoiceGroupOption) => {
      return option.checked;
    });

    if (optionsChecked.length === 0) {
      return undefined;
    } else {
      return optionsChecked[0].key;
    }
  }
}
