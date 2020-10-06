import * as React from 'react';
import { Label } from '../../Label';
import { classNamesFunction, find, getNativeProps, divProperties, IRefObject } from '../../Utilities';
import {
  IChoiceGroupOption,
  IChoiceGroupProps,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles,
  IChoiceGroup,
} from './ChoiceGroup.types';
import { IChoiceGroupOptionProps } from './ChoiceGroupOption/ChoiceGroupOption.types';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
import { useId, useControllableValue, useWarnings } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

const getOptionId = (option: IChoiceGroupOption, id: string): string => {
  return `${id}-${option.key}`;
};

const getCheckedOption = (options: IChoiceGroupOption[], keyChecked: string | number) =>
  find(options, (value: IChoiceGroupOption) => value.key === keyChecked);

const useComponentRef = (
  options: IChoiceGroupOption[],
  keyChecked: string | number | undefined,
  id: string,
  componentRef?: IRefObject<IChoiceGroup>,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      get checkedOption() {
        return getCheckedOption(options, keyChecked!);
      },
      focus() {
        const optionToFocus = getCheckedOption(options, keyChecked!) || options.filter(option => !option.disabled)[0];
        const elementToFocus = optionToFocus && document.getElementById(getOptionId(optionToFocus, id));

        if (elementToFocus) {
          elementToFocus.focus();
        }
      },
    }),
    [options, keyChecked, id],
  );
};

const COMPONENT_NAME = 'ChoiceGroup';

export const ChoiceGroupBase: React.FunctionComponent<IChoiceGroupProps> = React.forwardRef<
  HTMLDivElement,
  IChoiceGroupProps
>((props, forwardedRef) => {
  const {
    className,
    theme,
    styles,
    options = [],
    label,
    required,
    disabled,
    name,
    defaultSelectedKey,
    componentRef,
    onChange,
  } = props;
  const id = useId('ChoiceGroup');
  const labelId = useId('ChoiceGroupLabel');

  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties, [
    'onChange',
    'className',
    'required',
  ]);

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    optionsContainIconOrImage: options.some(option => !!(option.iconProps || option.imageSrc)),
  });

  const ariaLabelledBy = props.ariaLabelledBy || (label ? labelId : props['aria-labelledby']);

  const [keyChecked, setKeyChecked] = useControllableValue(props.selectedKey, defaultSelectedKey);
  const [keyFocused, setKeyFocused] = React.useState<string | number>();

  useDebugWarnings(props);
  useComponentRef(options, keyChecked, id, componentRef);

  const onFocus = React.useCallback((ev?: React.FocusEvent<HTMLElement>, option?: IChoiceGroupOptionProps) => {
    if (option) {
      setKeyFocused(option.itemKey);
      option.onFocus?.(ev);
    }
  }, []);

  const onBlur = React.useCallback((ev: React.FocusEvent<HTMLElement>, option?: IChoiceGroupOptionProps) => {
    setKeyFocused(undefined);
    option?.onBlur?.(ev);
  }, []);

  const onOptionChange = React.useCallback(
    (evt?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOptionProps) => {
      if (!option) {
        return;
      }
      setKeyChecked(option.itemKey);

      option.onChange?.(evt);
      onChange?.(
        evt,
        find(options || [], (value: IChoiceGroupOption) => value.key === option.itemKey),
      );
    },
    [onChange, options, setKeyChecked],
  );

  return (
    <div className={classNames.root} {...divProps} ref={forwardedRef}>
      <div role="radiogroup" {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })}>
        {label && (
          <Label className={classNames.label} required={required} id={labelId} disabled={disabled}>
            {label}
          </Label>
        )}
        <div className={classNames.flexContainer}>
          {options.map((option: IChoiceGroupOption) => {
            return (
              <ChoiceGroupOption
                key={option.key}
                itemKey={option.key}
                {...option}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onOptionChange}
                focused={option.key === keyFocused}
                checked={option.key === keyChecked}
                disabled={option.disabled || disabled}
                id={getOptionId(option, id)}
                labelId={option.labelId || `${labelId}-${option.key}`}
                name={name || id}
                required={required}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});
ChoiceGroupBase.displayName = COMPONENT_NAME;

function useDebugWarnings(props: IChoiceGroupProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      mutuallyExclusive: {
        selectedKey: 'defaultSelectedKey',
      },
    });
  }
}
