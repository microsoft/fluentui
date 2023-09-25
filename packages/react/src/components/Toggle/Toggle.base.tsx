import * as React from 'react';
import { useControllableValue, useId, useWarnings } from '@fluentui/react-hooks';
import { classNamesFunction, getNativeProps, inputProperties, useFocusRects } from '@fluentui/utilities';
import { Label } from '../Label/Label';
import type { IToggleProps, IToggleStyleProps, IToggleStyles, IToggle } from './Toggle.types';

const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>();

const COMPONENT_NAME = 'Toggle';

export const ToggleBase: React.FunctionComponent<IToggleProps> = React.forwardRef<HTMLElement, IToggleProps>(
  (props, forwardedRef) => {
    const {
      as: RootType = 'div',
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
      // eslint-disable-next-line deprecation/deprecation
      onChanged,
      onClick: onToggleClick,
      onText,
      role,
      styles,
      theme,
    } = props;

    const [checked, setChecked] = useControllableValue(
      controlledChecked,
      defaultChecked,
      React.useCallback(
        (ev: React.MouseEvent<HTMLElement>, isChecked: boolean) => {
          onChange?.(ev, isChecked);
          onChanged?.(isChecked);
        },
        [onChange, onChanged],
      ),
    );

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
    const toggleNativeProps = getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(props, inputProperties, [
      'defaultChecked',
    ]);

    // The following properties take priority for what Narrator should read:
    // 1. ariaLabel
    // 2. onAriaLabel (if checked) or offAriaLabel (if not checked)
    // 3. label, if existent

    let labelledById: string | undefined = undefined;
    if (!ariaLabel && !badAriaLabel) {
      if (label) {
        labelledById = labelId;
      }
      if (stateText && !labelledById) {
        labelledById = stateTextId;
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
        setChecked(!checked, ev);
        if (onToggleClick) {
          onToggleClick(ev);
        }
      }
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
        disabled,
        id,
        onClick,
        ref: toggleButton,
        role: role ? role : 'switch',
        type: 'button' as React.ButtonHTMLAttributes<HTMLButtonElement>['type'],
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

    return (
      <RootType ref={forwardedRef as React.Ref<HTMLDivElement>} {...slotProps.root}>
        {label && <Label {...slotProps.label} />}
        <div {...slotProps.container}>
          <button {...slotProps.pill}>
            <span {...slotProps.thumb} />
          </button>
          {((checked && onText) || offText) && <Label {...slotProps.stateText} />}
        </div>
      </RootType>
    );
  },
);

ToggleBase.displayName = COMPONENT_NAME + 'Base';

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
