import * as React from 'react';
import { ComposePreparedOptions } from '@fluentui/react-compose';
import { useControllableValue, useId, useWarnings } from '@uifabric/react-hooks';
import { classNamesFunction, getNativeProps, inputProperties, useFocusRects } from '../../Utilities';
import { IToggle, IToggleProps, IToggleStyleProps, IToggleStyles } from './Toggle.types';

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>({ useStaticStyles: true });

const COMPONENT_NAME = 'Toggle';

export const useToggle = (
  props: IToggleProps,
  ref: React.Ref<HTMLDivElement>,
  options: ComposePreparedOptions,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const {
    ariaLabel,
    checked: controlledChecked,
    className,
    defaultChecked = false,
    disabled,
    inlineLabel,
    label,
    // eslint-disable-next-line deprecation/deprecation
    offAriaLabel,
    offText,
    // eslint-disable-next-line deprecation/deprecation
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
  const id = useId(COMPONENT_NAME, props.id);
  const labelId = `${id}-label`;
  const stateTextId = `${id}-stateText`;
  const stateText = checked ? onText : offText;
  const toggleNativeProps = getNativeProps<React.HTMLAttributes<HTMLInputElement>>(props, inputProperties, [
    'defaultChecked',
  ]);

  // The following properties take priority for what Narrator should read:
  // 1. ariaLabel
  // 2. onAriaLabel (if checked) or offAriaLabel (if not checked)
  // 3. label AND stateText, if existent

  let labelledById: string | undefined = undefined;
  if (!ariaLabel && !badAriaLabel) {
    if (label) {
      labelledById = labelId;
    }
    if (stateText) {
      labelledById = labelledById ? `${labelledById} ${stateTextId}` : stateTextId;
    }
  }

  const toggleButton = React.useRef<HTMLButtonElement>(null);
  useFocusRects(toggleButton);
  useComponentRef(props, checked, toggleButton);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: COMPONENT_NAME,
      props,
      deprecations: {
        offAriaLabel: undefined,
        onAriaLabel: 'ariaLabel',
        onChanged: 'onChange',
      },
      mutuallyExclusive: { checked: 'defaultChecked' },
    });
  }

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      'data-ktp-target': true,
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
    [isChecked, toggleButtonRef],
  );
};
