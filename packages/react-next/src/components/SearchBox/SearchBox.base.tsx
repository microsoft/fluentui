import * as React from 'react';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles } from './SearchBox.types';
import { warnDeprecations, KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { useBoolean, useControllableValue, useId } from '@uifabric/react-hooks';
import { IconButton } from '../../compat/Button';
import { Icon } from '../../Icon';

export interface ISearchBoxState {
  value?: string;
  hasFocus?: boolean;
}

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>();
const COMPONENT_NAME = 'SearchBox';

const useComponentRef = (
  props: ISearchBoxProps,
  inputElementRef: React.RefObject<HTMLInputElement>,
  hasFocus: boolean,
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus: () => {
        inputElementRef.current?.focus();
      },
      hasFocus: () => {
        return hasFocus;
      },
    }),
    [inputElementRef, hasFocus],
  );
};
const iconButtonStyles = { root: { height: 'auto' }, icon: { fontSize: '12px' } };
const iconButtonProps = { iconName: 'Clear' };

export const SearchBoxBase: React.FunctionComponent = (props: ISearchBoxProps) => {
  const [hasFocus, { toggle: toggleHasFocus }] = useBoolean(false);
  // tslint:disable-next-line:prefer-const deprecation
  let [value, setValue] = useControllableValue(props.value, props.defaultValue, props.onChange);
  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const fallbackId = useId(COMPONENT_NAME);

  // Ensure value is always a string-friendly type.
  if (value === null || value === undefined) {
    value = '';
  }

  const {
    ariaLabel,
    placeholder,
    className,
    disabled,
    underlined,
    styles,
    /* tslint:disable-next-line:deprecation */
    labelText,
    theme,
    clearButtonProps = { ariaLabel: 'Clear text' },
    disableAnimation = false,
    iconProps,
    id = fallbackId,
  } = props;
  const placeholderValue = placeholder !== undefined ? placeholder : labelText;
  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    underlined,
    hasFocus,
    disabled,
    hasInput: value!.length > 0,
    disableAnimation,
  });
  const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(props, inputProperties, [
    'className',
    'placeholder',
    'onFocus',
    'onBlur',
    'value',
  ]);

  const onClear = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => {
    props.onClear && props.onClear(ev);
    if (!ev.defaultPrevented) {
      setValue('');
      inputElementRef.current?.focus();
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  const onClickFocus = () => {
    if (inputElementRef.current) {
      focus();
      inputElementRef.current.selectionStart = inputElementRef.current.selectionEnd = 0;
    }
  };

  const onFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    toggleHasFocus();
    if (props.onFocus) {
      props.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  };

  const onClearClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (clearButtonProps && clearButtonProps.onClick) {
      clearButtonProps.onClick(ev);
    }
    if (!ev.defaultPrevented) {
      onClear(ev);
    }
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    toggleHasFocus();
    if (props.onBlur) {
      props.onBlur(ev);
    }
  };

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.which) {
      case KeyCodes.escape:
        props.onEscape && props.onEscape(ev);
        if (!ev.defaultPrevented) {
          onClear(ev);
        }
        break;
      case KeyCodes.enter:
        if (props.onSearch) {
          props.onSearch(value);
          break;
        }
        // if we don't handle the enter press then we shouldn't prevent default
        return;
      default:
        onKeyDown && onKeyDown(ev);
        if (!ev.defaultPrevented) {
          return;
        }
    }
    // We only get here if the keypress has been handled,
    // or preventDefault was called in case of default keyDown handler
    ev.preventDefault();
    ev.stopPropagation();
  };

  warnDeprecations(COMPONENT_NAME, props, {
    labelText: 'placeholder',
    defaultValue: 'value',
  });

  useComponentRef(props, inputElementRef, hasFocus);

  return (
    <div role="search" ref={rootElementRef} className={classNames.root} onFocusCapture={onFocusCapture}>
      <div className={classNames.iconContainer} onClick={onClickFocus} aria-hidden>
        <Icon iconName="Search" {...iconProps} className={classNames.icon} />
      </div>
      <input
        {...nativeProps}
        id={id}
        className={classNames.field}
        placeholder={placeholderValue}
        onChange={onInputChange}
        onInput={onInputChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        value={value}
        disabled={disabled}
        role="searchbox"
        aria-label={ariaLabel}
        ref={inputElementRef}
      />
      {value!.length > 0 && (
        <div className={classNames.clearButton}>
          <IconButton
            onBlur={onBlur}
            styles={iconButtonStyles}
            iconProps={iconButtonProps}
            {...clearButtonProps}
            onClick={onClearClick}
          />
        </div>
      )}
    </div>
  );
};
SearchBoxBase.displayName = COMPONENT_NAME;
