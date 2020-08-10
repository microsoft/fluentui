import * as React from 'react';
import { Label } from '../../Label';
import { classNamesFunction, find, getNativeProps, divProperties } from '../../Utilities';
import { IChoiceGroupOption, IChoiceGroupProps, IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { IChoiceGroupOptionProps } from './ChoiceGroupOption/ChoiceGroupOption.types';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
import { useId, useControllableValue, useWarnings, useConstCallback } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

const getOptionId = (option: IChoiceGroupOption, id: string): string => {
  return `${id}-${option.key}`;
};

const getCheckedOption = (options: IChoiceGroupOption[], keyChecked: string | number) =>
  find(options, (value: IChoiceGroupOption) => value.key === keyChecked);

const useComponentRef = (props: IChoiceGroupProps, keyChecked: string | number | undefined, id: string) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get checkedOption() {
        const { options = [] } = props;
        return getCheckedOption(options, keyChecked!);
      },
      focus() {
        const { options = [] } = props;
        const optionToFocus = getCheckedOption(options, keyChecked!) || options.filter(option => !option.disabled)[0];
        const elementToFocus = optionToFocus && document.getElementById(getOptionId(optionToFocus, id));
        if (elementToFocus) {
          elementToFocus.focus();
        }
      },
    }),
    [props, keyChecked],
  );
};

function useDebugWarnings(props: IChoiceGroupProps) {
  if (process.env.NODE_ENV !== 'production') {
    useWarnings({
      name: 'Checkbox',
      props,
      mutuallyExclusive: {
        selectedKey: 'defaultSelectedKey',
      },
    });
  }
}

/**
 * {@docCategory ChoiceGroup}
 */
export const ChoiceGroupBase: React.FunctionComponent = React.forwardRef(
  (props: IChoiceGroupProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { className, theme, styles, options = [], label, required, disabled, name, defaultSelectedKey } = props;
    const id = useId('ChoiceGroup');
    const choiceGroupLabelId = useId('ChoiceGroupLabel');
    const labelId = id + '-label';

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
    useComponentRef(props, keyChecked, id);

    const onFocus = useConstCallback((ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOptionProps) => {
      setKeyFocused(option.itemKey);
    });

    const onBlur = useConstCallback((ev: React.FocusEvent<HTMLElement>) => {
      setKeyFocused(undefined);
    });

    const onOptionChange = useConstCallback(
      (evt: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOptionProps) => {
        const { onChange } = props;

        setKeyChecked(option.itemKey);

        if (onChange) {
          onChange(
            evt,
            find(props.options || [], (value: IChoiceGroupOption) => value.key === option.itemKey),
          );
        }
      },
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
              const innerOptionProps = {
                ...option,
                focused: option.key === keyFocused,
                checked: option.key === keyChecked,
                disabled: option.disabled || disabled,
                id: getOptionId(option, id),
                labelId: `${choiceGroupLabelId}-${option.key}`,
                name: name || id,
                required,
              };

              return (
                <ChoiceGroupOption
                  key={option.key}
                  itemKey={option.key}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  onChange={onOptionChange}
                  {...innerOptionProps}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
);
