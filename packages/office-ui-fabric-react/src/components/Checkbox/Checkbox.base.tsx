import * as React from 'react';
import { classNamesFunction, mergeAriaAttributeValues, warnMutuallyExclusive, FocusRects } from '../../Utilities';
import { Icon } from '../../Icon';
import { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';
import { useId, useControllableValue } from '@uifabric/react-hooks';

export interface ICheckboxState {
  /** Is true when Uncontrolled control is checked. */
  isChecked?: boolean;
  isIndeterminate?: boolean;
}

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>();

// tslint:disable-next-line:no-function-expression
export const CheckboxBase = React.forwardRef(function(props: ICheckboxProps, ref: React.Ref<HTMLDivElement>) {
  const {
    className,
    disabled,
    inputProps,
    name,
    boxSide = 'start',
    theme,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    styles,
    checkmarkIconProps,
    ariaPositionInSet,
    ariaSetSize,
    keytipProps,
    title,
    label,
  } = props;

  const checkBox = React.useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked);
  const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);

  useDebugWarning(props);
  useComponentRef(props, isChecked, isIndeterminate, checkBox);

  const id = useId('checkbox-', props.id);
  const classNames: { [key in keyof ICheckboxStyles]: string } = getClassNames(styles!, {
    theme: theme!,
    className,
    disabled,
    indeterminate: isIndeterminate,
    checked: isChecked,
    reversed: boxSide !== 'start',
    isUsingCustomLabelRender: !!props.onRenderLabel,
  });

  const onRenderLabel = (): JSX.Element | null => {
    return label ? (
      <span aria-hidden="true" className={classNames.text} title={title}>
        {label}
      </span>
    ) : null;
  };

  //#region Input callbacks
  const _onFocus = React.useCallback(
    (ev: React.FocusEvent<HTMLElement>): void => {
      if (inputProps?.onFocus) {
        inputProps.onFocus(ev);
      }
    },
    [inputProps?.onFocus],
  );

  const _onBlur = React.useCallback(
    (ev: React.FocusEvent<HTMLElement>): void => {
      if (inputProps?.onBlur) {
        inputProps.onBlur(ev);
      }
    },
    [inputProps?.onBlur],
  );

  const _onChange = React.useCallback(
    (ev: React.ChangeEvent<HTMLElement>): void => {
      const { onChange, checked, indeterminate } = props;

      if (!isIndeterminate) {
        if (onChange) {
          onChange(ev, !isChecked);
        }
        if (checked === undefined) {
          setIsChecked(!isChecked);
        }
      } else {
        // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
        // controlled, lets the consumer know to change it by calling onChange). It doesn't
        // change the checked state.
        if (onChange) {
          onChange(ev, isChecked);
        }
        if (indeterminate === undefined) {
          setIsIndeterminate(false);
        }
      }
    },
    [props.onChange, props.checked, props.indeterminate, isChecked, isIndeterminate],
  );
  //#endregion

  return (
    <KeytipData keytipProps={keytipProps} disabled={disabled}>
      {(keytipAttributes: any): JSX.Element => (
        <div className={classNames.root} title={title} ref={ref}>
          <FocusRects />
          <input
            type="checkbox"
            {...inputProps}
            data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
            checked={!!isChecked}
            disabled={disabled}
            className={classNames.input}
            ref={checkBox}
            name={name}
            id={id}
            title={title}
            onChange={_onChange}
            onFocus={_onFocus}
            onBlur={_onBlur}
            aria-disabled={disabled}
            aria-label={ariaLabel || label}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={mergeAriaAttributeValues(ariaDescribedBy, keytipAttributes['aria-describedby'])}
            aria-posinset={ariaPositionInSet}
            aria-setsize={ariaSetSize}
            aria-checked={isIndeterminate ? 'mixed' : isChecked ? 'true' : 'false'}
          />
          <label className={classNames.label} htmlFor={id}>
            <div className={classNames.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
              <Icon iconName="CheckMark" {...checkmarkIconProps} className={classNames.checkmark} />
            </div>
            {(props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
          </label>
        </div>
      )}
    </KeytipData>
  );
});

function useDebugWarning(props: ICheckboxProps) {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      warnMutuallyExclusive('Checkbox', props, {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate',
      });
    }
  }, []);
}

function useComponentRef(
  props: ICheckboxProps,
  isChecked: boolean | undefined,
  isIndeterminate: boolean | undefined,
  checkBox: React.RefObject<HTMLInputElement>,
) {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get checked() {
        return !!isChecked;
      },
      get indeterminate() {
        return !!isIndeterminate;
      },
      focus() {
        if (checkBox.current) {
          checkBox.current.focus();
        }
      },
    }),
    [isChecked, isIndeterminate],
  );
}
