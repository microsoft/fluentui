import * as React from 'react';

import { classNamesFunction, ICheckboxProps, ICheckboxStyles, ICheckboxStyleProps } from '@fluentui/react';
import { Checkbox, CheckboxOnChangeData, mergeClasses } from '@fluentui/react-components';
import { useControllableValue } from '@fluentui/react-hooks';
import { useCheckboxProps } from './shimCheckboxProps';
import { useCheckboxStyles } from './Checkbox.styles';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>({
  useStaticStyles: false,
});

export const CheckboxShim = React.forwardRef((props: ICheckboxProps, _ref: React.ForwardedRef<HTMLInputElement>) => {
  const { className, styles: stylesV8, onRenderLabel, label, onChange: onChangeV8, componentRef } = props;
  const shimProps = useCheckboxProps(props);
  const styles = getClassNames(stylesV8);
  const stylesV9 = useCheckboxStyles();
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
  const checkboxRef = (_ref as React.RefObject<HTMLInputElement>) || React.createRef<HTMLInputElement>();

  React.useImperativeHandle(componentRef, () => ({
    checked: checkboxRef.current?.checked ?? false,
    indeterminate: checkboxRef.current?.indeterminate ?? false,
    focus: () => checkboxRef.current?.focus(),
  }));

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLElement>, data: CheckboxOnChangeData): void => {
      const checked = data.checked === 'mixed' ? true : data.checked;
      if (isChecked !== undefined) {
        // Ensure the checkbox is controlled
        setIsChecked(checked, event);
      }
      onChangeV8?.(event, checked);
    },
    [setIsChecked, isChecked, onChangeV8],
  );

  shimProps.checked = isChecked;
  shimProps.onChange = onChange;

  const defaultLabelRenderer = (checkboxProps?: ICheckboxProps): JSX.Element | null => {
    if (!checkboxProps) {
      return null;
    }
    const { label: defualtLabel, title } = checkboxProps;
    return defualtLabel ? (
      <span title={title} className={styles.text}>
        {defualtLabel}
      </span>
    ) : null;
  };

  if (label || onRenderLabel) {
    shimProps.label = {
      className: mergeClasses('ms-Checkbox-text', styles.label, styles.text),
      children: onRenderLabel ? onRenderLabel(props, defaultLabelRenderer) : label,
    };
  }

  return (
    <Checkbox
      {...shimProps}
      ref={checkboxRef}
      className={mergeClasses(stylesV9.root, 'ms-Checkbox', className, styles.root)}
      indicator={{ className: mergeClasses('ms-Checkbox-checkbox', styles.checkbox) }}
    />
  );
});

CheckboxShim.displayName = 'CheckboxShim';
