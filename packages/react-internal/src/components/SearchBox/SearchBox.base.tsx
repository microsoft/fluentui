import * as React from 'react';
import { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles, ISearchBox } from './SearchBox.types';
import { KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
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
  const { defaultValue = '' } = props;
  const [hasFocus, setHasFocus] = React.useState(false);
  const [uncastValue, setValue] = useControllableValue(props.value, defaultValue, props.onChange);
  const value = String(uncastValue);
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
    onClear,
    onBlur,
    onEscape,
    onSearch,
    onKeyDown,
    iconProps,
    role,
  } = props;

  const { onClick: onClearClick } = clearButtonProps;

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
    'role',
  ]);

  const _onClear = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement> | React.KeyboardEvent<HTMLElement>) => {
      onClear?.(ev);
      if (!ev.defaultPrevented) {
        setValue('');
        inputElementRef.current?.focus();
        ev.stopPropagation();
        ev.preventDefault();
      }
    },
    [onClear, setValue],
  );

  const _onClearClick = React.useCallback(
    (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      onClearClick?.(ev);
      if (!ev.defaultPrevented) {
        _onClear(ev);
      }
    },
    [onClearClick, _onClear],
  );

  const _onFocusCapture = (ev: React.FocusEvent<HTMLElement>) => {
    setHasFocus(true);
    props.onFocus?.(ev as React.FocusEvent<HTMLInputElement>);
  };

  const _onClickFocus = () => {
    if (inputElementRef.current) {
      inputElementRef.current.focus();
      inputElementRef.current.selectionStart = inputElementRef.current.selectionEnd = 0;
    }
  };

  const _onBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLInputElement>): void => {
      setHasFocus(false);
      onBlur?.(ev);
    },
    [onBlur],
  );

  const _onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };

  const _onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      switch (ev.which) {
        case KeyCodes.escape:
          onEscape?.(ev);
          if (value && !ev.defaultPrevented) {
            _onClear(ev);
          }
          break;

        case KeyCodes.enter:
          if (onSearch) {
            onSearch(value);
            ev.preventDefault();
            ev.stopPropagation();
          }
          break;

        default:
          onKeyDown?.(ev);
          break;
      }
    },
    [_onClear, onEscape, onKeyDown, onSearch, value],
  );

  useDebugWarning(props);
  useComponentRef(props.componentRef, inputElementRef, hasFocus);

  return (
    <div role={role} ref={mergedRootRef} className={classNames.root} onFocusCapture={_onFocusCapture}>
      <div className={classNames.iconContainer} onClick={_onClickFocus} aria-hidden>
        <Icon iconName="Search" {...iconProps} className={classNames.icon} />
      </div>
      <input
        {...nativeProps}
        id={id}
        className={classNames.field}
        placeholder={placeholder}
        onChange={_onInputChange}
        onInput={_onInputChange}
        onBlur={_onBlur}
        onKeyDown={_onKeyDown}
        value={value}
        disabled={disabled}
        role="searchbox"
        aria-label={ariaLabel}
        ref={inputElementRef}
      />
      {value!.length > 0 && (
        <div className={classNames.clearButton}>
          <IconButton
            onBlur={_onBlur}
            styles={iconButtonStyles}
            iconProps={iconButtonProps}
            {...clearButtonProps}
            onClick={_onClearClick}
          />
        </div>
      )}
    </div>
  );
});
SearchBoxBase.displayName = COMPONENT_NAME;

function useDebugWarning(props: ISearchBoxProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: { labelText: 'placeholder' },
    });
  }
}
