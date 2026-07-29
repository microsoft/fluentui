'use client';

import * as React from 'react';

import type { ICheckboxProps, ICheckboxStyles, ICheckboxStyleProps } from '@fluentui/react';
import { classNamesFunction } from '@fluentui/react';
import { clsx } from 'clsx';
import { Checkbox } from '@fluentui/react-components';
import { useCheckboxProps } from './shimCheckboxProps';
import { useCheckboxStyles } from './Checkbox.styles';
import type { JSXElement } from '@fluentui/react-utilities';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>({
  useStaticStyles: false,
});

export const CheckboxShim = React.forwardRef((props, _ref) => {
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

  const defaultLabelRenderer = (checkboxProps?: ICheckboxProps): JSXElement | null => {
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

  // `mergeClasses` → `clsx`, ARGUMENT ORDER UNCHANGED. Per DECISIONS.md D7-revision that order
  // no longer carries cascade meaning: `stylesV9.root` is a hashed CSS-Modules class in
  // `@layer fui.components.l2` (Checkbox.module.css), while `styles.*` are the consumer's v8
  // merge-styles classes, injected UNLAYERED at runtime — and unlayered beats every layer before
  // specificity is consulted. So the consumer's `ICheckboxStyles` keeps winning over the shim,
  // which is the shim's whole intent, at zero cost and with no unlayered block needed here
  // (s4-v8-layering-decision.md §1.4).
  //
  // No named-group marker is stamped: this component renders no DOM element of its own — the
  // outermost node is `@fluentui/react-checkbox`'s root, which already carries
  // `group/fui-checkbox`, and D15.1 allows exactly one marker per element.
  //
  // `ms-Checkbox` / `ms-Checkbox-text` / `ms-Checkbox-checkbox` are v8 interop classes, RETAINED
  // (they are not `fui`-prefixed BEM statics, so D16.1's sweep does not cover them).
  if (label || onRenderLabel) {
    shimProps.label = {
      className: clsx('ms-Checkbox-text', styles.label, styles.text),
      children: onRenderLabel ? onRenderLabel(props, defaultLabelRenderer) : label,
    };
  }

  return (
    <Checkbox
      {...shimProps}
      ref={checkboxRef}
      className={clsx(stylesV9.root, 'ms-Checkbox', className, styles.root)}
      indicator={{ className: clsx('ms-Checkbox-checkbox', styles.checkbox) }}
    />
  );
  // NOTE: cast is necessary as `ICheckboxProps` extends React.Ref<HTMLDivElement> which is not compatible with our defined  React.Ref<HTMLInputElement>
}) as React.ForwardRefExoticComponent<
  ICheckboxProps &
    // eslint-disable-next-line @typescript-eslint/no-restricted-types -- this is expected in order to be compatible with v8, as every v8 interface contains `React.RefAttributes` to accept ref as string
    React.RefAttributes<HTMLInputElement>
>;

CheckboxShim.displayName = 'CheckboxShim';
