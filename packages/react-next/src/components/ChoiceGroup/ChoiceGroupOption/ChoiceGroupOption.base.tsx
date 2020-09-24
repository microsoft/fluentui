import * as React from 'react';
import { Image } from '../../../Image';
import { Icon } from '../../../Icon';
import {
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles,
} from './ChoiceGroupOption.types';
import { classNamesFunction, getNativeProps, inputProperties, css } from '../../../Utilities';
import { IProcessedStyleSet } from '../../../Styling';
import { composeRenderFunction } from '@uifabric/utilities';

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

const LARGE_IMAGE_SIZE = 71;

/**
 * {@docCategory ChoiceGroup}
 */
export const ChoiceGroupOptionBase = (props: IChoiceGroupOptionProps) => {
  const {
    ariaLabel,
    focused,
    required,
    theme,
    iconProps,
    imageSrc,
    imageSize = { width: 32, height: 32 },
    disabled,
    // eslint-disable-next-line deprecation/deprecation
    checked,
    id,
    styles,
    name,
    ...rest
  } = props;

  const classNames: IProcessedStyleSet<IChoiceGroupOptionStyles> = getClassNames(styles!, {
    theme: theme!,
    hasIcon: !!iconProps,
    hasImage: !!imageSrc,
    checked,
    disabled,
    imageIsLarge: !!imageSrc && (imageSize!.width > LARGE_IMAGE_SIZE || imageSize!.height > LARGE_IMAGE_SIZE),
    imageSize,
    focused,
  });

  const { className, ...nativeProps } = getNativeProps<{ className: string }>(rest, inputProperties);

  const onRenderLabel = (): JSX.Element => {
    return (
      <span id={props.labelId} className="ms-ChoiceFieldLabel">
        {props.text}
      </span>
    );
  };

  const renderField = (): JSX.Element => {
    const { imageAlt = '', selectedImageSrc } = props;

    const onRenderComposedLabel = props.onRenderLabel
      ? composeRenderFunction(props.onRenderLabel, onRenderLabel)
      : onRenderLabel;

    const label = onRenderComposedLabel(props);

    return (
      <label htmlFor={id} className={classNames.field}>
        {imageSrc && (
          <div className={classNames.innerField}>
            <div className={classNames.imageWrapper}>
              <Image src={imageSrc} alt={imageAlt} {...imageSize} />
            </div>
            <div className={classNames.selectedImageWrapper}>
              <Image src={selectedImageSrc} alt={imageAlt} {...imageSize} />
            </div>
          </div>
        )}
        {iconProps && (
          <div className={classNames.innerField}>
            <div className={classNames.iconWrapper}>
              <Icon {...iconProps} />
            </div>
          </div>
        )}
        {imageSrc || iconProps ? <div className={classNames.labelWrapper}>{label}</div> : label}
      </label>
    );
  };

  const { onRenderField = renderField } = props;

  const onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    if (props.onChange) {
      props.onChange(evt, props);
    }
  };

  const onBlur = (evt: React.FocusEvent<HTMLElement>) => {
    if (props.onBlur) {
      props.onBlur(evt);
    }
  };

  const onFocus = (evt: React.FocusEvent<HTMLElement>) => {
    if (props.onFocus) {
      props.onFocus(evt, props);
    }
  };

  return (
    <div className={classNames.root}>
      <div className={classNames.choiceFieldWrapper}>
        <input
          aria-label={ariaLabel}
          id={id}
          className={css(classNames.input, className)}
          type="radio"
          name={name}
          disabled={disabled}
          checked={checked}
          required={required}
          {...nativeProps}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {onRenderField(props, renderField)}
      </div>
    </div>
  );
};
