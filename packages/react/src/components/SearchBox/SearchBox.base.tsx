import * as React from 'react';
import { KeyCodes, classNamesFunction, getNativeProps, inputProperties } from '../../Utilities';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
import type { ISearchBoxProps, ISearchBoxStyleProps, ISearchBoxStyles, ISearchBox } from './SearchBox.types';
import type { IButtonProps, IButtonStyles } from '../../Button';
import type { IIconProps } from '../../Icon';

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
      blur: () => inputElementRef.current?.blur(),
      hasFocus: () => hasFocus,
    }),
    [inputElementRef, hasFocus],
  );
};

export const SearchBoxBase: React.FunctionComponent<ISearchBoxProps> = React.forwardRef<
  HTMLDivElement,
  ISearchBoxProps
>((props, forwardedRef) => {
  const {
    ariaLabel,
    className,
    defaultValue = '',
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
    showIcon = false,
    onClear: customOnClear,
    onBlur: customOnBlur,
    onEscape: customOnEscape,
    onSearch: customOnSearch,
    onKeyDown: customOnKeyDown,
    iconProps,
    role,
    onChange,
    // eslint-disable-next-line deprecation/deprecation
    onChanged,
  } = props;

  const [hasFocus, setHasFocus] = React.useState(false);

  const prevChangeTimestamp = React.useRef<number | undefined>();
  const [uncastValue, setValue] = useControllableValue(
    props.value,
    defaultValue,
    (ev: React.ChangeEvent<HTMLInputElement> | undefined, newValue: string) => {
      if (ev && ev.timeStamp === prevChangeTimestamp.current) {
        // For historical reasons, SearchBox handles both onInput and onChange (we can't modify this
        // outside a major version due to potential to break partners' tests and possibly apps).
        // Only call props.onChange for one of the events.
        return;
      }
      prevChangeTimestamp.current = ev?.timeStamp;
      onChange?.(ev, newValue);
      onChanged?.(newValue);
    },
  );
  const value = String(uncastValue);

  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const inputElementRef = React.useRef<HTMLInputElement>(null);
  const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);
  const id = useId(COMPONENT_NAME, props.id);

  const { onClick: customOnClearClick } = clearButtonProps;

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    underlined,
    hasFocus,
    disabled,
    hasInput: value.length > 0,
    disableAnimation,
    showIcon,
  });

  const nativeProps = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(props, inputProperties, [
    'className',
    'placeholder',
    'onFocus',
    'onBlur',
    'value',
    'role',
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
      customOnClearClick?.(ev);
      if (!ev.defaultPrevented) {
        onClear(ev);
      }
    },
    [customOnClearClick, onClear],
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
    setValue(ev.target.value, ev);
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.escape:
        customOnEscape?.(ev);
        // Only call onClear if the search box has a value to clear. Otherwise, allow the Esc key
        // to propagate from the empty search box to a parent element such as a dialog, etc.
        if (value && !ev.defaultPrevented) {
          onClear(ev);
        }
        break;

      case KeyCodes.enter:
        if (customOnSearch) {
          customOnSearch(value);
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      default:
        // REVIEW: Why aren't we calling customOnKeyDown for Escape or Enter?
        customOnKeyDown?.(ev);
        // REVIEW: Why are we calling stopPropagation if customOnKeyDown called preventDefault?
        // customOnKeyDown should call stopPropagation if it needs it.
        if (ev.defaultPrevented) {
          ev.stopPropagation();
        }
        break;
    }
  };

  useDebugWarning(props);
  useComponentRef(props.componentRef, inputElementRef, hasFocus);

  return (
    <div role={role} ref={mergedRootRef} className={classNames.root} onFocusCapture={onFocusCapture}>
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
