import * as React from 'react';

import { classNamesFunction, ICheckboxProps, ICheckboxStyles, ICheckboxStyleProps } from '@fluentui/react';
import { Checkbox, mergeClasses } from '@fluentui/react-components';
import { useCheckboxProps } from './shimCheckboxProps';
import { useCheckboxStyles } from './Checkbox.styles';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>({
  useStaticStyles: false,
});

export const CheckboxShim = React.forwardRef((props: ICheckboxProps, _ref: React.ForwardedRef<HTMLInputElement>) => {
  'use no memo';

  const { className, styles: stylesV8, onRenderLabel, label, componentRef } = props;
  const shimProps = useCheckboxProps(props);
  const styles = getClassNames(stylesV8);
  const stylesV9 = useCheckboxStyles();
  const checkboxRef = (_ref as React.RefObject<HTMLInputElement>) || React.createRef<HTMLInputElement>();

  React.useImperativeHandle(componentRef, () => ({
    checked: checkboxRef.current?.checked ?? false,
    indeterminate: checkboxRef.current?.indeterminate ?? false,
    focus: () => checkboxRef.current?.focus(),
  }));

  const defaultLabelRenderer = (checkboxProps?: ICheckboxProps): JSX.Element | null => {
    if (!checkboxProps) {
      return null;
    }
    const { label: defaultLabel, title } = checkboxProps;
    return defaultLabel ? (
      <span title={title} className={styles.text}>
        {defaultLabel}
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
