import * as React from 'react';
import { Image } from '../../../Image';
import { Icon } from '../../../Icon';
import { IChoiceGroupOptionProps, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types';
import { classNamesFunction, getNativeProps, inputProperties, css, initializeComponentRef } from '../../../Utilities';
import { IProcessedStyleSet } from '../../../Styling';

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

/**
 * {@docCategory ChoiceGroup}
 */
export class ChoiceGroupOptionBase extends React.Component<IChoiceGroupOptionProps, any> {
  private _classNames: IProcessedStyleSet<IChoiceGroupOptionStyles>;

  constructor(props: IChoiceGroupOptionProps) {
    super(props);
    initializeComponentRef(this);
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
      imageSize,
      focused
    });

    const { className, ...nativeProps } = getNativeProps<{ className: string }>(rest, inputProperties);

    return (
      <div className={this._classNames.root}>
        <div className={this._classNames.choiceFieldWrapper}>
          <input
            aria-label={ariaLabel}
            id={id}
            className={css(this._classNames.input, className)}
            type="radio"
            name={name}
            disabled={disabled}
            checked={checked}
            required={required}
            {...nativeProps}
            onChange={this._onChange}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
          />
          {onRenderField(this.props, this._onRenderField)}
        </div>
      </div>
    );
  }

  private _onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(evt, this.props);
    }
  };

  private _onBlur = (evt: React.FocusEvent<HTMLElement>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(evt, this.props);
    }
  };

  private _onFocus = (evt: React.FocusEvent<HTMLElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(evt, this.props);
    }
  };

  private _onRenderField = (props: IChoiceGroupOptionProps): JSX.Element => {
    const { onRenderLabel = this._onRenderLabel, id, imageSrc, imageAlt = '', selectedImageSrc, iconProps } = props;

    const imageSize = props.imageSize ? props.imageSize : { width: 32, height: 32 };

    return (
      <label htmlFor={id} className={this._classNames.field}>
        {imageSrc && (
          <div className={this._classNames.innerField}>
            <div className={this._classNames.imageWrapper}>
              <Image src={imageSrc} alt={imageAlt} width={imageSize.width} height={imageSize.height} />
            </div>
            <div className={this._classNames.selectedImageWrapper}>
              <Image src={selectedImageSrc} alt={imageAlt} width={imageSize.width} height={imageSize.height} />
            </div>
          </div>
        )}
        {iconProps && (
          <div className={this._classNames.innerField}>
            <div className={this._classNames.iconWrapper}>
              <Icon {...iconProps} />
            </div>
          </div>
        )}
        {imageSrc || iconProps ? <div className={this._classNames.labelWrapper}>{onRenderLabel!(props)}</div> : onRenderLabel!(props)}
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
