import * as React from 'react';
import { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';
import { useControllableValue, useId, useMergedRefs, useWarnings } from '@uifabric/react-hooks';
import { useFocusRects, classNamesFunction } from '@uifabric/utilities';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>();

export const CheckboxBase: React.FunctionComponent<ICheckboxProps> = React.forwardRef<HTMLDivElement, ICheckboxProps>(
  (props, forwardedRef) => {
    const {
      disabled,
      inputProps,
      name,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaPositionInSet,
      ariaSetSize,
      title,
      label,
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
    useComponentRef(props, isChecked, isIndeterminate, inputRef);

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      indeterminate: isIndeterminate,
      checked: isChecked,
      reversed: boxSide !== 'start',
      isUsingCustomLabelRender: !!props.onRenderLabel,
    });

    const onChange = (ev: React.ChangeEvent<HTMLElement>): void => {
      if (isIndeterminate) {
        // If indeterminate, clicking the checkbox *only* removes the indeterminate state (or if
        // controlled, lets the consumer know to change it by calling onChange). It doesn't
        // change the checked state.
        setIsChecked(!!isChecked, ev);
        setIsIndeterminate(false);
      } else {
        setIsChecked(!isChecked, ev);
      }
    };

    const defaultLabelRenderer = React.useCallback(
      (checkboxProps?: ICheckboxProps): JSX.Element | null => {
        if (!checkboxProps) {
          return null;
        }
        return checkboxProps.label ? (
          <span aria-hidden="true" className={classNames.text} title={checkboxProps.title}>
            {checkboxProps.label}
          </span>
        ) : null;
      },
      [classNames.text],
    );

    const onRenderLabel = props.onRenderLabel || defaultLabelRenderer;

    const ariaChecked: React.InputHTMLAttributes<HTMLInputElement>['aria-checked'] = isIndeterminate
      ? 'mixed'
      : isChecked
      ? 'true'
      : 'false';

    const slotProps = {
      root: {
        className: classNames.root,
        title,
        ref: mergedRootRefs,
      },
      input: {
        className: classNames.input,
        type: 'checkbox' as React.InputHTMLAttributes<HTMLInputElement>['type'],
        ...inputProps,
        ref: inputRef,
        checked: !!isChecked,
        disabled,
        name,
        id,
        title,
        onChange,
        'data-ktp-execute-target': true,
        'aria-disabled': disabled,
        'aria-label': ariaLabel || label,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        'aria-posinset': ariaPositionInSet,
        'aria-setsize': ariaSetSize,
        'aria-checked': ariaChecked,
      },
      checkbox: {
        className: classNames.checkbox,
        'data-ktp-target': true,
      },
      container: {
        className: classNames.label,
        htmlFor: id,
      },
    };

    return (
      <div {...slotProps.root}>
        <input {...slotProps.input} />
        <label {...slotProps.container}>
          <div {...slotProps.checkbox}>
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
      focus() {
        if (checkBoxRef.current) {
          checkBoxRef.current.focus();
        }
      },
    }),
    [checkBoxRef, isChecked, isIndeterminate],
  );
}
