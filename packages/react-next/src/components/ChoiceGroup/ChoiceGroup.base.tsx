import * as React from 'react';
import { Label } from '../../Label';
import {
  warnMutuallyExclusive,
  classNamesFunction,
  find,
  isControlled,
  getNativeProps,
  divProperties,
} from '../../Utilities';
import { IChoiceGroupOption, IChoiceGroupProps, IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { ChoiceGroupOption, IChoiceGroupOptionProps } from './ChoiceGroupOption/index';
import { useId, useConstCallback } from '@uifabric/react-hooks';

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

export const ChoiceGroupBase: React.FunctionComponent = React.forwardRef(
  (props: IChoiceGroupProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { className, theme, styles, options = [], label, required, disabled, name, defaultSelectedKey } = props;
    const id = useId('ChoiceGroup');
    const choiceGroupLabelId = useId('ChoiceGroupLabel');
    const labelId = id + '-label';
    const focusCallbacks: { [key: string]: IChoiceGroupOptionProps['onFocus'] } = {};
    const changeCallbacks: { [key: string]: IChoiceGroupOptionProps['onBlur'] } = {};

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

    /**
     * Returns `selectedKey` if provided, or the key of the first option with the `checked` prop set.
     */
    const getKeyChecked = (): string | number | undefined => {
      if (props.selectedKey !== undefined) {
        return props.selectedKey;
      }
      // eslint-disable-next-line deprecation/deprecation
      const optionsChecked = options.filter((option: IChoiceGroupOption) => option.checked);
      return optionsChecked[0] && optionsChecked[0].key;
    };

    const validDefaultSelectedKey =
      !isControlled(props, 'selectedKey') &&
      defaultSelectedKey !== undefined &&
      options.some(option => option.key === defaultSelectedKey);

    const [keyChecked, setKeyChecked] = React.useState(validDefaultSelectedKey ? defaultSelectedKey : getKeyChecked());
    const [keyFocused, setKeyFocused] = React.useState<string | number>();

    const onFocus = (key: string) => {
      // This extra mess is necessary because React won't pass the `key` prop through to ChoiceGroupOption
      if (!focusCallbacks[key]) {
        focusCallbacks[key] = (ev: React.FocusEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
          setKeyFocused(key);
        };
      }
      return focusCallbacks[key];
    };

    const onBlur = useConstCallback((ev: React.FocusEvent<HTMLElement>, option: IChoiceGroupOption) => {
      setKeyFocused(undefined);
    });

    const choiceGroupOnChange = (key: string) => {
      // This extra mess is necessary because React won't pass the `key` prop through to ChoiceGroupOption
      if (!changeCallbacks[key]) {
        changeCallbacks[key] = (evt: React.FormEvent<HTMLElement | HTMLInputElement>, option: IChoiceGroupOption) => {
          const { onChange } = props;

          // Only manage state in uncontrolled scenarios.
          if (!isControlled(props, 'selectedKey')) {
            setKeyChecked(key);
          }

          // Get the original option without the `key` prop removed
          const originalOption = find(props.options || [], (value: IChoiceGroupOption) => value.key === key);

          if (onChange) {
            onChange(evt, originalOption);
          }
        };
      }
      return changeCallbacks[key];
    };

    if (process.env.NODE_ENV !== 'production') {
      warnMutuallyExclusive('ChoiceGroup', props, {
        selectedKey: 'defaultSelectedKey',
      });
    }

    useComponentRef(props, keyChecked, id);

    // TODO (Fabric 8?) - if possible, move `root` class to the actual root and eliminate
    // `applicationRole` class (but the div structure will stay the same by necessity)
    return (
      // eslint-disable-next-line deprecation/deprecation
      <div className={classNames.applicationRole} {...divProps} ref={forwardedRef}>
        <div
          className={classNames.root}
          role="radiogroup"
          {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })}
        >
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
                  onBlur={onBlur}
                  onFocus={onFocus(option.key)}
                  onChange={choiceGroupOnChange(option.key)}
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
