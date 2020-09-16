import * as React from 'react';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles, ISearchBox } from './SearchBox.types';
import { KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { IconButton, IButtonProps, IButtonStyles } from '../../compat/Button';
import { Icon, IIconProps } from '../../Icon';

const COMPONENT_NAME = 'SearchBox';
const iconButtonStyles: Partial<IButtonStyles> = { root: { height: 'auto' }, icon: { fontSize: '12px' } };
const iconButtonProps: IIconProps = { iconName: 'Clear' };
const defaultClearButtonProps: IButtonProps = { ariaLabel: 'Clear text' };

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

export const SearchBoxBase: React.FunctionComponent<ISearchBoxProps> = React.forwardRef<
  HTMLDivElement,
  ISearchBoxProps
>((props, forwardedRef) => {
  const [hasFocus, setHasFocus] = React.useState(false);
  const [value = '', setValue] = useControllableValue(props.value, props.defaultValue, props.onChange);
  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);
  const id = useId(COMPONENT_NAME, props.id);

  const {
    ariaLabel,
    className,
    disabled,
    underlined,
    styles,
    // eslint-disable-next-line deprecation/deprecation
    labelText,
    // eslint-disable-next-line deprecation/deprecation
    placeholder = labelText,
    theme,
    clearButtonProps = defaultClearButtonProps,
    disableAnimation = false,
    onClear: customOnClear,
    onBlur: customOnBlur,
    iconProps,
  } = props;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    underlined,
    hasFocus,
    disabled,
    hasInput: value.length > 0,
    disableAnimation,
  });

  const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(props, inputProperties, [
    'className',
    'placeholder',
    'onFocus',
    'onBlur',
    'value',
  ]);

  const onClear = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => {
      customOnClear?.(ev);
      if (!ev.defaultPrevented) {
        setValue('');
        inputElementRef.current?.focus();
        ev.stopPropagation();
        ev.preventDefault();
      }
    },
    [customOnClear, setValue],
  );

  const onClearClick = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      clearButtonProps?.onClick?.(ev);
      if (!ev.defaultPrevented) {
        onClear(ev);
      }
    },
    [clearButtonProps, onClear],
  );

  const onFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    setHasFocus(true);
    props.onFocus?.(ev as React.FocusEvent<HTMLInputElement>);
  };

  const onClickFocus = () => {
    if (inputElementRef.current) {
      inputElementRef.current.focus();
      inputElementRef.current.selectionStart = inputElementRef.current.selectionEnd = 0;
    }
  };

  const onBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement>): void => {
      setHasFocus(false);
      customOnBlur?.(ev);
    },
    [customOnBlur],
  );

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    switch (ev.which) {
      case KeyCodes.escape:
        props.onEscape?.(ev);
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
        onKeyDown?.(ev);
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
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: { labelText: 'placeholder' },
    });
  }

  useComponentRef(props.componentRef, inputElementRef, hasFocus);

  return (
    <div role="search" ref={mergedRootRef} className={classNames.root} onFocusCapture={onFocusCapture}>
      <div className={classNames.iconContainer} onClick={onClickFocus} aria-hidden>
        <Icon iconName="Search" {...iconProps} className={classNames.icon} />
      </div>
      <input
        {...nativeProps}
        id={id}
        className={classNames.field}
        placeholder={placeholder}
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
});
SearchBoxBase.displayName = COMPONENT_NAME;
