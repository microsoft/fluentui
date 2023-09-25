import * as React from 'react';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@fluentui/react-hooks';
import { useFocusRects, classNamesFunction } from '@fluentui/utilities';
import { Icon } from '../Icon/Icon';
import type { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>();

export const CheckboxBase: React.FunctionComponent<ICheckboxProps> = React.forwardRef<HTMLDivElement, ICheckboxProps>(
  (props, forwardedRef) => {
    const {
      disabled,
      required,
      inputProps,
      name,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaPositionInSet,
      ariaSetSize,
      title,
      checkmarkIconProps,
      styles,
      theme,
      className,
      boxSide = 'start',
    } = props;

    const id = useId('checkbox-', props.id);

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRootRefs: React.Ref<HTMLDivElement> = useMergedRefs(rootRef, forwardedRef);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
    const [isIndeterminate, setIsIndeterminate] = useControllableValue(props.indeterminate, props.defaultIndeterminate);

    useFocusRects(rootRef);
    useDebugWarning(props);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      indeterminate: isIndeterminate,
      checked: isChecked,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: !!props.onRenderLabel,
    });

    const onChange = React.useCallback(
      (event: React.ChangeEvent<HTMLElement>): void => {
        if (isIndeterminate) {
          // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
          // controlled, lets the consumer know to change it by calling onChange). It doesn't
          // change the checked state.
          setIsChecked(!!isChecked, event);
          setIsIndeterminate(false);
        } else {
          setIsChecked(!isChecked, event);
        }
      },
      [setIsChecked, setIsIndeterminate, isIndeterminate, isChecked],
    );

    const defaultLabelRenderer = React.useCallback(
      (checkboxProps?: ICheckboxProps): JSX.Element | null => {
        if (!checkboxProps) {
          return null;
        }
        return checkboxProps.label ? (
          <span className={classNames.text} title={checkboxProps.title}>
            {checkboxProps.label}
          </span>
        ) : null;
      },
      [classNames.text],
    );

    const setNativeIndeterminate = React.useCallback(
      (indeterminate: boolean | undefined) => {
        if (!inputRef.current) {
          return;
        }

        const value = !!indeterminate;

        inputRef.current.indeterminate = value;
        setIsIndeterminate(value);
      },
      [setIsIndeterminate],
    );

    useComponentRef(props, isChecked, isIndeterminate, setNativeIndeterminate, inputRef);
    React.useEffect(() => setNativeIndeterminate(isIndeterminate), [setNativeIndeterminate, isIndeterminate]);

    const onRenderLabel = props.onRenderLabel || defaultLabelRenderer;

    const ariaChecked: React.InputHTMLAttributes<HTMLInputElement>['aria-checked'] = isIndeterminate
      ? 'mixed'
      : undefined;

    const mergedInputProps: React.InputHTMLAttributes<HTMLInputElement> = {
      className: classNames.input,
      type: 'checkbox' as React.InputHTMLAttributes<HTMLInputElement>['type'],
      ...inputProps,
      checked: !!isChecked,
      disabled,
      required,
      name,
      id,
      title,
      onChange,
      'aria-disabled': disabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      'aria-posinset': ariaPositionInSet,
      'aria-setsize': ariaSetSize,
      'aria-checked': ariaChecked,
    };

    return (
      <div className={classNames.root} title={title} ref={mergedRootRefs}>
        <input {...mergedInputProps} ref={inputRef} title={title} data-ktp-execute-target={true} />
        <label className={classNames.label} htmlFor={id}>
          <div className={classNames.checkbox} data-ktp-target={true}>
            <Icon iconName="CheckMark" {...checkmarkIconProps} className={classNames.checkmark} />
          </div>
          {onRenderLabel(props, defaultLabelRenderer)}
        </label>
      </div>
    );
  },
);

CheckboxBase.displayName = 'CheckboxBase';

function useDebugWarning(props: ICheckboxProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Checkbox',
      props,
      mutuallyExclusive: {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate',
      },
    });
  }
}

function useComponentRef(
  props: ICheckboxProps,
  isChecked: boolean | undefined,
  isIndeterminate: boolean | undefined,
  setIndeterminate: (indeterminate: boolean) => void,
  checkBoxRef: React.RefObject<HTMLInputElement>,
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
      set indeterminate(indeterminate: boolean) {
        setIndeterminate(indeterminate);
      },
      focus() {
        if (checkBoxRef.current) {
          checkBoxRef.current.focus();
        }
      },
    }),
    [checkBoxRef, isChecked, isIndeterminate, setIndeterminate],
  );
}
