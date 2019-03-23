import * as React from 'react';
import { Image } from '../../../Image';
import { Icon } from '../../../Icon';
import { IChoiceGroupOptionProps, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types';
import { BaseComponent, classNamesFunction, getNativeProps, inputProperties, css } from '../../../Utilities';
import { IProcessedStyleSet } from '../../../Styling';

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

export class ChoiceGroupOptionBase extends BaseComponent<IChoiceGroupOptionProps, any> {
  private _inputElement = React.createRef<HTMLInputElement>();
  private _classNames: IProcessedStyleSet<IChoiceGroupOptionStyles>;

  constructor(props: IChoiceGroupOptionProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      ariaLabel,
      focused,
      required,
      theme,
      iconProps,
      imageSrc,
      imageSize = { width: 32, height: 32 },
      disabled,
      checked,
      id,
      styles,
      name,
      onRenderField = this._onRenderField,
      ...rest
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      hasIcon: !!iconProps,
      hasImage: !!imageSrc,
      checked,
      disabled,
      imageIsLarge: !!imageSrc && (imageSize.width > 71 || imageSize.height > 71),
      focused
    });

    const { className, ...nativeProps } = getNativeProps<{ className: string }>(rest, inputProperties);

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.choiceFieldWrapper}>
          <input
            aria-label={ariaLabel ? ariaLabel : undefined}
            ref={this._inputElement}
            id={id}
            className={css(this._classNames.input, className)}
            type="radio"
            name={name}
            disabled={disabled}
            checked={checked}
            required={required}
            onChange={this._onChange.bind(this, this.props)}
            onFocus={this._onFocus.bind(this, this.props)}
            onBlur={this._onBlur.bind(this, this.props)}
            {...nativeProps}
          />
          {onRenderField(this.props, this._onRenderField)}
        </div>
      </div>
    );
  }

  private _onChange(props: IChoiceGroupOptionProps, evt: React.FormEvent<HTMLInputElement>): void {
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

  private _onRenderField = (props: IChoiceGroupOptionProps): JSX.Element => {
    const { onRenderLabel = this._onRenderLabel, id, imageSrc, imageAlt, selectedImageSrc, iconProps } = props;

    const imageSize = props.imageSize ? props.imageSize : { width: 32, height: 32 };

    return (
      <label htmlFor={id} className={this._classNames.field}>
        {imageSrc && (
          <div className={this._classNames.innerField} style={{ height: imageSize.height, width: imageSize.width }}>
            <div className={this._classNames.imageWrapper}>
              <Image src={imageSrc} alt={imageAlt ? imageAlt : ''} width={imageSize.width} height={imageSize.height} />
            </div>
            <div className={this._classNames.selectedImageWrapper}>
              <Image src={selectedImageSrc} alt={imageAlt ? imageAlt : ''} width={imageSize.width} height={imageSize.height} />
            </div>
          </div>
        )}
        {iconProps ? (
          <div className={this._classNames.innerField}>
            <div className={this._classNames.iconWrapper}>
              <Icon {...iconProps} />
            </div>
          </div>
        ) : null}
        {imageSrc || iconProps ? (
          <div className={this._classNames.labelWrapper} style={{ maxWidth: imageSize.width * 2 }}>
            {onRenderLabel!(props)}
          </div>
        ) : (
          onRenderLabel!(props)
        )}
      </label>
    );
  };

  private _onRenderLabel = (props: IChoiceGroupOptionProps): JSX.Element => {
    return (
      <span id={props.labelId} className="ms-ChoiceFieldLabel">
        {props.text}
      </span>
    );
  };
}
