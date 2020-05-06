import * as React from 'react';
import {
  classNamesFunction,
  inputProperties,
  getNativeProps,
  warnDeprecations,
  warnMutuallyExclusive,
  FocusRects,
} from '../../Utilities';
import { IToggleProps, IToggle, IToggleStyleProps, IToggleStyles } from './Toggle.types';
import { Label } from '../../Label';
import { KeytipData } from '../../KeytipData';
import { useId, useControllableValue } from '@uifabric/react-hooks';
import { useFocusRects } from 'office-ui-fabric-react';

export interface IToggleState {
  checked: boolean;
}

const COMPONENT_NAME = 'Toggle';
const getClassNames = classNamesFunction<IToggleStyleProps, IToggleStyles>();
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

export const ToggleBase: React.FunctionComponent = React.forwardRef(
  (props: IToggleProps, ref: React.Ref<HTMLDivElement>) => {
    const [checked, setChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);
    const toggleButton = React.useRef<HTMLButtonElement>(null);
    const id = props.id || useId('Toggle', props.id);
    const {
      as: RootType = 'div',
      className,
      theme,
      disabled,
      keytipProps,
      label,
      ariaLabel,
      /* tslint:disable-next-line:deprecation */
      onAriaLabel,
      /* tslint:disable-next-line:deprecation */
      offAriaLabel,
      offText,
      onText,
      styles,
      inlineLabel,
    } = props;
    const stateText = checked ? onText : offText;
    const badAriaLabel = checked ? onAriaLabel : offAriaLabel;
    const toggleNativeProps = getNativeProps(props, inputProperties, ['defaultChecked']);
    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      disabled,
      checked,
      inlineLabel,
      onOffMissing: !onText && !offText,
    });
    const labelId = `${id}-label`;
    const stateTextId = `${id}-stateText`;

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
    const ariaRole = props.role ? props.role : 'switch';
    useFocusRects(toggleButton);
    useComponentRef(props, checked, toggleButton);
    warnDeprecations(COMPONENT_NAME, props, {
      onAriaLabel: 'ariaLabel',
      offAriaLabel: undefined,
      onChanged: 'onChange',
    });
    warnMutuallyExclusive(COMPONENT_NAME, props, {
      checked: 'defaultChecked',
    });
    const onClick = (ev: React.MouseEvent<HTMLElement>) => {
      if (!disabled) {
        setChecked(!checked);
        if (props.onClick) {
          props.onClick(ev);
        }
      }
    };

    return (
      <RootType className={classNames.root} hidden={(toggleNativeProps as any).hidden} ref={ref}>
        {label && (
          <Label htmlFor={id} className={classNames.label} id={labelId}>
            {label}
          </Label>
        )}
        <div className={classNames.container}>
          <KeytipData
            keytipProps={keytipProps}
            ariaDescribedBy={(toggleNativeProps as any)['aria-describedby']}
            disabled={disabled}
          >
            {(keytipAttributes: any): JSX.Element => (
              <button
                {...toggleNativeProps}
                {...keytipAttributes}
                className={classNames.pill}
                disabled={disabled}
                id={id}
                type="button"
                role={ariaRole}
                ref={toggleButton}
                aria-disabled={disabled}
                aria-checked={!!checked}
                aria-label={ariaLabel ? ariaLabel : badAriaLabel}
                data-is-focusable
                onClick={onClick}
                aria-labelledby={labelledById}
              >
                <span className={classNames.thumb} />
              </button>
            )}
          </KeytipData>
          {stateText && (
            <Label htmlFor={id} className={classNames.text} id={stateTextId}>
              {stateText}
            </Label>
          )}
        </div>
        <FocusRects />
      </RootType>
    );
  },
);
ToggleBase.displayName = COMPONENT_NAME;
