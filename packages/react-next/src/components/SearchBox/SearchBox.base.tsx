import * as React from 'react';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles, ISearchBox } from './SearchBox.types';
import { KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { useBoolean, useControllableValue, useId, useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { IconButton } from '../../compat/Button';
import { Icon } from '../../Icon';

const COMPONENT_NAME = 'SearchBox';
const iconButtonStyles = { root: { height: 'auto' }, icon: { fontSize: '12px' } };
const iconButtonProps = { iconName: 'Clear' };

const getClassNames = classNamesFunction<ISearchBoxStyleProps, ISearchBoxStyles>();
const useComponentRef = (
  componentRef: React.Ref<ISearchBox> | undefined,
  inputElementRef: React.RefObject<HTMLInputElement>,
  hasFocus: boolean,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      focus: () => inputElementRef.current?.focus(),
      hasFocus: () => hasFocus,
    }),
    [inputElementRef, hasFocus],
  );
};

export const SearchBoxBase = React.forwardRef((props: ISearchBoxProps, forwardedRef: React.Ref<HTMLDivElement>) => {
  const [hasFocus, { setTrue: setHasFocusTrue, setFalse: setHasFocusFalse }] = useBoolean(false);
  const [value = '', setValue] = useControllableValue(props.value, props.defaultValue, props.onChange);
  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);
  const fallbackId = useId(COMPONENT_NAME);

  const {
    ariaLabel,
    placeholder,
    className,
    disabled,
    underlined,
    styles,
    // eslint-disable-next-line deprecation/deprecation
    labelText,
    theme,
    clearButtonProps = { ariaLabel: 'Clear text' },
    disableAnimation = false,
    iconProps,
    id = fallbackId,
  } = props;

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

  const placeholderValue = placeholder !== undefined ? placeholder : labelText;

  const onClear = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => {
    props.onClear && props.onClear(ev);
    if (!ev.defaultPrevented) {
      setValue('');
      inputElementRef.current?.focus();
      ev.stopPropagation();
      ev.preventDefault();
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

  const onFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    setHasFocusTrue();
    if (props.onFocus) {
      props.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  };

  const onClickFocus = () => {
    if (inputElementRef.current) {
      focus();
      inputElementRef.current.selectionStart = inputElementRef.current.selectionEnd = 0;
    }
  };

  const onBlur = (ev: React.FocusEvent<HTMLInputElement>): void => {
    setHasFocusFalse();
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

  if (process.env.NODE_ENV !== 'production') {
    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: { labelText: 'placeholder' },
    });
  }

  useComponentRef(props.componentRef, inputElementRef, hasFocus);

  return (
    <div
      role="search"
      ref={mergedRootRef}
      className={classNames.root}
      // eslint-disable-next-line react/jsx-no-bind
      onFocusCapture={onFocusCapture}
    >
      <div
        className={classNames.iconContainer}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={onClickFocus}
        aria-hidden
      >
        <Icon iconName="Search" {...iconProps} className={classNames.icon} />
      </div>
      <input
        {...nativeProps}
        id={id}
        className={classNames.field}
        placeholder={placeholderValue}
        // eslint-disable-next-line react/jsx-no-bind
        onChange={onInputChange}
        // eslint-disable-next-line react/jsx-no-bind
        onInput={onInputChange}
        // eslint-disable-next-line react/jsx-no-bind
        onBlur={onBlur}
        // eslint-disable-next-line react/jsx-no-bind
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
            // eslint-disable-next-line react/jsx-no-bind
            onBlur={onBlur}
            styles={iconButtonStyles}
            iconProps={iconButtonProps}
            {...clearButtonProps}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={onClearClick}
          />
        </div>
      )}
    </div>
  );
});
SearchBoxBase.displayName = COMPONENT_NAME;
