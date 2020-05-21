import * as React from 'react';
import { compose } from '@fluentui/react-compose';
import { useMergedRefs } from '@uifabric/react-hooks';
import { mergeAriaAttributeValues, warnMutuallyExclusive, useFocusRects } from '../../Utilities';
import { Icon } from '../../Icon';
import { ICheckboxProps, ICheckboxStyles } from './Checkbox.types';
import { KeytipData } from '../../KeytipData';
import { useCheckboxClasses } from './useCheckboxClasses';
import { useCheckbox } from './useCheckbox';

export const CheckboxBase = compose<'div', ICheckboxProps, ICheckboxProps, {}, {}>(
  (props, forwardedRef, composeOptions) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRootRefs = useMergedRefs(rootRef, forwardedRef);

    const { slotProps, slots } = useCheckbox(props, composeOptions);
    const { disabled, keytipProps, label, title } = props;
    const { checked, indeterminate, checkBox } = slotProps.input;

    useFocusRects(rootRef);
    useDebugWarning(props);
    useComponentRef(props, checked, indeterminate, checkBox);

    // TODO: this should be called during `compose`
    const classNames: { [key in keyof ICheckboxStyles]: string } = useCheckboxClasses({
      ...props,
      indeterminate,
      checked,
    });

    const onRenderLabel = (): JSX.Element | null => {
      return label ? (
        <span aria-hidden="true" className={classNames.text} title={title}>
          {label}
        </span>
      ) : null;
    };

    return (
      <KeytipData keytipProps={keytipProps} disabled={disabled}>
        {(keytipAttributes: any): JSX.Element => (
          <slots.root className={classNames.root} ref={mergedRootRefs} {...slotProps.root}>
            <slots.input
              {...slotProps.input}
              className={classNames.input}
              data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
              aria-describedby={mergeAriaAttributeValues(
                slotProps.input['aria-describedby'],
                keytipAttributes['aria-describedby'],
              )}
            />
            <slots.label className={classNames.label} {...slotProps.label}>
              <div className={classNames.checkbox} data-ktp-target={keytipAttributes['data-ktp-target']}>
                <slots.checkmarkIcon className={classNames.checkmark} {...slotProps.checkmarkIcon} />
              </div>
              {(props.onRenderLabel || onRenderLabel)(props, onRenderLabel)}
            </slots.label>
          </slots.root>
        )}
      </KeytipData>
    );
  },
  {
    slots: {
      input: 'input',
      checkmarkIcon: Icon,
      label: 'label',
    },
    displayName: 'CheckboxBase',
  },
);

CheckboxBase.defaultProps = {
  boxSide: 'start',
};

function useDebugWarning(props: ICheckboxProps) {
  if (process.env.NODE_ENV !== 'production') {
    // This is a build-time conditional that will be constant at runtime
    // tslint:disable-next-line:react-hooks-nesting
    React.useEffect(() => {
      warnMutuallyExclusive('Checkbox', props, {
        checked: 'defaultChecked',
        indeterminate: 'defaultIndeterminate',
      });
    }, []);
  }
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
