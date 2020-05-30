import * as React from 'react';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { useControllableValue, useId } from '@uifabric/react-hooks';
import {
  classNamesFunction,
  getNativeProps,
  inputProperties,
  useFocusRects,
  warnDeprecations,
  warnMutuallyExclusive,
} from '../../Utilities';
import { IToggle, IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>({ useStaticStyles: true });

const COMPONENT_NAME = 'Toggle';

// tslint:disable-next-line:no-any
export const useToggle = (props: IToggleProps, options: ComposePreparedOptions): any => {
  const {
    ariaLabel,
    checked: controlledChecked,
    className,
    defaultChecked = false,
    disabled,
    id: toggleId,
    inlineLabel,
    label,
    // tslint:disable-next-line:deprecation
    offAriaLabel,
    offText,
    // tslint:disable-next-line:deprecation
    onAriaLabel,
    onChange,
    onClick: onToggleClick,
    onText,
    role,
    styles,
    theme,
  } = props;
  const [checked, setChecked] = useControllableValue(controlledChecked, defaultChecked, onChange);

  const classNames = getClassNames(styles!, {
    theme: theme!,
    className,
    disabled,
    checked,
    inlineLabel,
    onOffMissing: !onText && !offText,
  });
  const badAriaLabel = checked ? onAriaLabel : offAriaLabel;
  const id = toggleId || useId();
  const labelId = `${id}-label`;
  const stateTextId = `${id}-stateText`;
  const stateText = checked ? onText : offText;
  const toggleNativeProps = getNativeProps<HTMLInputElement>(props, inputProperties, ['defaultChecked']);

  // The following properties take priority for what Narrator should read:
  // 1. ariaLabel
  // 2. onAriaLabel (if checked) or offAriaLabel (if not checked)
  // 3. label
  // 4. onText (if checked) or offText (if not checked)
  let labelledById: string | undefined = undefined;
  if (!ariaLabel && !badAriaLabel) {
    if (label) {
      labelledById = labelId;
    } else if (stateText) {
      labelledById = stateTextId;
    }
  }

  const toggleButton = React.useRef<HTMLButtonElement>(null);
  useFocusRects(toggleButton);
  useComponentRef(props, checked, toggleButton);

  warnDeprecations(COMPONENT_NAME, props, {
    offAriaLabel: undefined,
    onAriaLabel: 'ariaLabel',
    onChanged: 'onChange',
  });
  warnMutuallyExclusive(COMPONENT_NAME, props, {
    checked: 'defaultChecked',
  });

  const onClick = (ev: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setChecked(!checked);
      if (onToggleClick) {
        onToggleClick(ev);
      }
    }
  };

  const state = {
    checked,
  };

  const slots = {
    ...options.slots,
    // tslint:disable-next-line:no-any
    root: props.as || ((options as any).defaultProps as any)?.as,
  };

  const slotProps = {
    root: {
      className: classNames.root,
      hidden: toggleNativeProps.hidden,
    },
    label: {
      children: label,
      className: classNames.label,
      htmlFor: id,
      id: labelId,
    },
    container: {
      className: classNames.container,
    },
    pill: {
      ...toggleNativeProps,
      'aria-disabled': disabled,
      'aria-checked': checked,
      'aria-label': ariaLabel ? ariaLabel : badAriaLabel,
      'aria-labelledby': labelledById,
      className: classNames.pill,
      'data-is-focusable': true,
      disabled: disabled,
      id: id,
      onClick: onClick,
      ref: toggleButton,
      role: role ? role : 'switch',
      type: 'button',
    },
    thumb: {
      className: classNames.thumb,
    },
    stateText: {
      children: stateText,
      className: classNames.text,
      htmlFor: id,
      id: stateTextId,
    },
  };

  return { state, slots, slotProps };
};

const useComponentRef = (
  props: IToggleProps,
  isChecked: boolean | undefined,
  toggleButtonRef: React.RefObject<IToggle>,
) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get checked() {
        return !!isChecked;
      },
      focus() {
        if (toggleButtonRef.current) {
          toggleButtonRef.current.focus();
        }
      },
    }),
    [isChecked],
  );
};
