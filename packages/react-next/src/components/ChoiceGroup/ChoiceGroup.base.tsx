import * as React from 'react';
import { Label } from '../../Label';
import { warnMutuallyExclusive, classNamesFunction, find, getNativeProps, divProperties } from '../../Utilities';
import { IChoiceGroupOption, IChoiceGroupProps, IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
import { useId, useControllableValue } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

const getOptionId = (option: IChoiceGroupOption, id: string): string => {
  return `${id}-${option.optionKey}`;
};

const getCheckedOption = (options: IChoiceGroupOption[], keyChecked: string | number) =>
  find(options, (value: IChoiceGroupOption) => value.optionKey === keyChecked);

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

    useComponentRef(props, keyChecked, id);

    const onFocus = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setKeyFocused(option.optionKey);
    };

    const onBlur = (ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setKeyFocused(undefined);
    };

    const onOptionChange = (evt: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
      const { onChange } = props;

      setKeyChecked(option.optionKey);

      if (onChange) {
        onChange(
          evt,
          find(props.options || [], (value: IChoiceGroupOption) => value.optionKey === option.optionKey),
        );
      }
    };

    if (process.env.NODE_ENV !== 'production') {
      warnMutuallyExclusive('ChoiceGroup', props, {
        selectedKey: 'defaultSelectedKey',
      });
    }

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
                focused: option.optionKey === keyFocused,
                checked: option.optionKey === keyChecked,
                disabled: option.disabled || disabled,
                id: getOptionId(option, id),
                labelId: `${choiceGroupLabelId}-${option.optionKey}`,
                name: name || id,
                required,
              };

              return (
                <ChoiceGroupOption
                  key={option.optionKey}
                  // eslint-disable-next-line react/jsx-no-bind
                  onBlur={onBlur}
                  // eslint-disable-next-line react/jsx-no-bind
                  onFocus={onFocus}
                  // eslint-disable-next-line react/jsx-no-bind
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
