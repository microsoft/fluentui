import * as React from 'react';
import { Image } from '../../Image';
import { Label } from '../../Label';
import { Icon } from '../../Icon';
import { IClassNames } from '@uifabric/utilities/lib/IClassNames';
import {
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
} from './ChoiceGroupOption.types';
import {
  BaseComponent,
  customizable,
  classNamesFunction,
  getNativeProps,
  inputProperties,
  createRef,
  getId
} from '../../Utilities';

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

@customizable('ChoiceGroupOption', ['theme'])
export class ChoiceGroupOptionBase extends BaseComponent<IChoiceGroupOptionProps, any> {
  private _inputElement = createRef<HTMLInputElement>();
  private _id: string;
  private _labelId: string;
  private _classNames: IClassNames<IChoiceGroupOptionStyles>;

  constructor(props: IChoiceGroupOptionProps) {
    super(props);
  }

  public render() {
    const {
      focused,
      required,
      theme,
      iconProps,
      imageSrc,
      imageAlt,
      selectedImageSrc,
      imageSize,
      disabled,
      checked,
      id,
      labelId,
      getStyles,
      onRenderField = this._onRenderField,
    } = this.props;

    this._classNames = getClassNames(getStyles!, {
      theme: theme!,
      hasIcon: !!iconProps,
      hasImage: !!imageSrc,
      checked,
      disabled,
      imageIsLarge: !!imageSrc && (imageSize!.width > 71 || imageSize!.height > 71),
      focused
    });

    return (
      <div className={ this._classNames.root }>
        <div className={ this._classNames.choiceFieldWrapper }>
          <input
            { ...getNativeProps(this.props, inputProperties) }
            ref={ this._inputElement }
            id={ id }
            className={ this._classNames.input }
            type='radio'
            name={ name || this._id }
            disabled={ disabled }
            checked={ checked }
            required={ required }
            onChange={ this._onChange.bind(this, this.props) }
            onFocus={ this._onFocus.bind(this, this.props) }
            onBlur={ this._onBlur.bind(this, this.props) }
            aria-labelledby={ labelId }
          />
          { onRenderField(this.props, this._onRenderField) }
        </div>
      </div>
    );
  }

  private _onChange(props: IChoiceGroupOptionProps, evt: React.FormEvent<HTMLInputElement>) {
    const { onChange } = props;
    if (onChange) {
      onChange(evt, props);
    }
  }

  private _onBlur(props: IChoiceGroupOptionProps, evt: React.FocusEvent<HTMLElement>) {
    const { onBlur } = props;
    if (onBlur) {
      onBlur(evt, props);
    }
  }

  private _onFocus(props: IChoiceGroupOptionProps, evt: React.FocusEvent<HTMLElement>) {
    const { onFocus } = props;
    if (onFocus) {
      onFocus(evt, props);
    }
  }

  private _onRenderField = (props: IChoiceGroupOptionProps) => {
    const {
      onRenderLabel = this._onRenderLabel,
      id,
      imageSrc,
      checked,
      imageAlt,
      selectedImageSrc,
      iconProps,
      theme,
      getStyles
    } = props;

    const imageSize = props.imageSize
      ? props.imageSize
      : { width: 32, height: 32 };
    const imageIsLarge: boolean = imageSize.width > 71 || imageSize.height > 71;

    return (
      <label htmlFor={ id } className={ this._classNames.field }>
        { imageSrc && (
          <div
            className={ this._classNames.innerField }
            style={ { height: imageSize.height, width: imageSize.width } }
          >
            <div className={ this._classNames.imageWrapper }>
              <Image
                src={ imageSrc }
                alt={ imageAlt ? imageAlt : '' }
                width={ imageSize.width }
                height={ imageSize.height }
              />
            </div>
            <div className={ this._classNames.selectedImageWrapper }>
              <Image
                src={ selectedImageSrc }
                alt={ imageAlt ? imageAlt : '' }
                width={ imageSize.width }
                height={ imageSize.height }
              />
            </div>
          </div>
        ) }
        { iconProps ? (
          <div className={ this._classNames.innerField }>
            <div className={ this._classNames.iconWrapper }>
              <Icon { ...iconProps } />
            </div>
          </div>
        ) : null }
        { imageSrc || iconProps ? (
          <div
            className={ this._classNames.labelWrapper }
            style={ { maxWidth: imageSize.width * 2 } }
          >
            { onRenderLabel!(props) }
          </div>
        ) : (
            onRenderLabel!(props)
          ) }
      </label>
    );
  }

  private _onRenderLabel = (props: IChoiceGroupOptionProps): JSX.Element => {
    return (
      <span id={ props.labelId } className='ms-Label'>
        { props.text }
      </span>
    );
  }
}
