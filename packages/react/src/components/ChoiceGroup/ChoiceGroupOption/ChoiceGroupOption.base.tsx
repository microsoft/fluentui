import * as React from 'react';
import { Image } from '../../../Image';
import { Icon } from '../../../Icon';
import {
  classNamesFunction,
  getNativeProps,
  inputProperties,
  css,
  composeRenderFunction,
  getPropsWithDefaults,
} from '../../../Utilities';
import type {
  IChoiceGroupOptionProps,
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles,
} from './ChoiceGroupOption.types';

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>();

const LARGE_IMAGE_SIZE = 71;

const DEFAULT_PROPS: Partial<IChoiceGroupOptionProps> = {
  // This ensures default imageSize value doesn't mutate. Mutation can cause style re-calcuation.
  imageSize: { width: 32, height: 32 },
};

export const ChoiceGroupOptionBase: React.FunctionComponent<IChoiceGroupOptionProps> = propsWithoutDefaults => {
  // Mix the `key` prop back in since custom render functions may be expecting it
  // (React uses `key` internally rather than passing it through to the component)
  const props = getPropsWithDefaults({ ...DEFAULT_PROPS, key: propsWithoutDefaults.itemKey }, propsWithoutDefaults);

  const {
    ariaLabel,
    focused,
    required,
    theme,
    iconProps,
    imageSrc,
    imageSize,
    disabled,
    checked,
    id,
    styles,
    name,
    ...rest
  } = props;

  const classNames = getClassNames(styles!, {
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

  const defaultOnRenderLabel = (): JSX.Element => {
    return (
      <span id={props.labelId} className="ms-ChoiceFieldLabel">
        {props.text}
      </span>
    );
  };

  const defaultOnRenderField = (): JSX.Element => {
    const { imageAlt = '', selectedImageSrc } = props;

    const onRenderLabel = props.onRenderLabel
      ? composeRenderFunction(props.onRenderLabel, defaultOnRenderLabel)
      : defaultOnRenderLabel;

    const label = onRenderLabel({ ...props, key: props.itemKey });

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

  const { onRenderField = defaultOnRenderField } = props;

  const onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    props.onChange?.(evt, { ...props, key: props.itemKey });
  };

  const onBlur = (evt: React.FocusEvent<HTMLElement>) => {
    props.onBlur?.(evt);
  };

  const onFocus = (evt: React.FocusEvent<HTMLElement>) => {
    props.onFocus?.(evt, { ...props, key: props.itemKey });
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
        {onRenderField({ ...props, key: props.itemKey }, defaultOnRenderField)}
      </div>
    </div>
  );
};
ChoiceGroupOptionBase.displayName = 'ChoiceGroupOption';
