import * as React from 'react';
import { Label } from '../../Label';
import {
  classNamesFunction,
  find,
  FocusRectsContext,
  getNativeProps,
  divProperties,
  setFocusVisibility,
  useFocusRects,
} from '../../Utilities';
import { ChoiceGroupOption } from './ChoiceGroupOption/index';
import { useId, useControllableValue, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
import type { IRefObject } from '../../Utilities';
import type {
  IChoiceGroupOption,
  IChoiceGroupProps,
  IChoiceGroupStyleProps,
  IChoiceGroupStyles,
  IChoiceGroup,
} from './ChoiceGroup.types';
import type { IChoiceGroupOptionProps } from './ChoiceGroupOption/ChoiceGroupOption.types';
import { useDocumentEx } from '../../utilities/dom';

const getClassNames = classNamesFunction<IChoiceGroupStyleProps, IChoiceGroupStyles>();

const getOptionId = (option: IChoiceGroupOption, id: string): string => {
  return `${id}-${option.key}`;
};

const findOption = (options: IChoiceGroupOption[], key: IChoiceGroupProps['selectedKey']) => {
  return key === undefined ? undefined : find(options, value => value.key === key);
};

const focusSelectedOption = (
  options: IChoiceGroupOption[],
  keyChecked: IChoiceGroupProps['selectedKey'],
  id: string,
  focusProviders?: React.RefObject<HTMLElement>[],
  doc?: Document,
) => {
  const optionToFocus = findOption(options, keyChecked) || options.filter(option => !option.disabled)[0];
  const elementToFocus = optionToFocus && doc?.getElementById(getOptionId(optionToFocus, id));

  if (elementToFocus) {
    elementToFocus.focus();
    setFocusVisibility(true, elementToFocus as Element, focusProviders);
  }
};

const focusFromFocusTrapZone = (evt: React.FocusEvent<HTMLElement>): boolean => {
  return evt.relatedTarget instanceof HTMLElement && evt.relatedTarget.dataset.isFocusTrapZoneBumper === 'true';
};

const useComponentRef = (
  options: IChoiceGroupOption[],
  keyChecked: IChoiceGroupProps['selectedKey'],
  id: string,
  componentRef?: IRefObject<IChoiceGroup>,
  focusProviders?: React.RefObject<HTMLElement>[],
) => {
  const doc = useDocumentEx();
  React.useImperativeHandle(
    componentRef,
    () => ({
      get checkedOption() {
        return findOption(options, keyChecked);
      },
      focus() {
        focusSelectedOption(options, keyChecked, id, focusProviders, doc);
      },
    }),
    [options, keyChecked, id, focusProviders, doc],
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

  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const mergedRootRefs: React.Ref<HTMLDivElement> = useMergedRefs(rootRef, forwardedRef);

  const focusContext = React.useContext(FocusRectsContext);

  useDebugWarnings(props);
  useComponentRef(options, keyChecked, id, componentRef, focusContext?.registeredProviders);
  useFocusRects(rootRef);

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
      onChange?.(evt, findOption(options, option.itemKey));
    },
    [onChange, options, setKeyChecked],
  );

  const onRadioFocus = React.useCallback(
    (evt: React.FocusEvent<HTMLElement>) => {
      // Handles scenarios like this bug: https://github.com/microsoft/fluentui/issues/20173
      if (focusFromFocusTrapZone(evt)) {
        focusSelectedOption(options, keyChecked, id, focusContext?.registeredProviders);
      }
    },
    [options, keyChecked, id, focusContext],
  );

  return (
    <div className={classNames.root} {...divProps} ref={mergedRootRefs}>
      <div role="radiogroup" {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })} onFocus={onRadioFocus}>
        {label && (
          <Label className={classNames.label} required={required} id={labelId} disabled={disabled}>
            {label}
          </Label>
        )}
        <div className={classNames.flexContainer}>
          {options.map((option: IChoiceGroupOption) => {
            return (
              <ChoiceGroupOption
                itemKey={option.key}
                {...option}
                key={option.key}
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
