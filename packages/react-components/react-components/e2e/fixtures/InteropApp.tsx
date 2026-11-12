import * as React from 'react';
import { clsx } from 'clsx';
import {
  Button,
  FluentProvider,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  mergeClasses,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-components';
import type {
  ButtonProps,
  ButtonState,
  FluentProviderCustomStyleHooks,
  PopoverSurfaceState,
} from '@fluentui/react-components';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';
import { useInteropStyles } from './useInteropStyles.styles';
import styles from './InteropApp.module.css';

// A typical app-level wrapper: its own Griffel styles merged before the caller's className.
const AppButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const griffel = useInteropStyles();
  return <Button {...props} ref={ref} className={mergeClasses(griffel.wrapper, props.className)} />;
}) as ForwardRefComponent<ButtonProps>;
AppButton.displayName = 'AppButton';

export type InteropAppProps = {
  targetDocument: Document;
  /** App overrides passed through `className` and slot `className`. */
  override?: 'none' | 'griffel' | 'class-name';
  /** Griffel `customStyleHooks_unstable` registered on the root provider. */
  customHook?: boolean;
  /** An additional single-class override passed by the caller. */
  callerOverride?: 'none' | 'griffel' | 'plain-css';
  dir?: 'ltr' | 'rtl';
  onActivate?: React.MouseEventHandler<HTMLButtonElement>;
};

export const InteropApp = ({
  targetDocument,
  override = 'none',
  customHook = false,
  callerOverride = 'none',
  dir = 'ltr',
  onActivate,
}: InteropAppProps): JSXElement => {
  const griffel = useInteropStyles();
  const [dark, setDark] = React.useState(false);
  const customStyleHooks: FluentProviderCustomStyleHooks = customHook
    ? {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        useButtonStyles_unstable: (state: unknown) => {
          const buttonState = state as ButtonState;
          buttonState.root.className = mergeClasses(
            buttonState.root.className,
            griffel.hook,
            getSlotClassNameProp_unstable(buttonState.root),
          );
          if (buttonState.icon) {
            buttonState.icon.className = mergeClasses(
              buttonState.icon.className,
              griffel.hookIcon,
              getSlotClassNameProp_unstable(buttonState.icon),
            );
          }
        },
      }
    : {};
  const className = clsx(
    override === 'griffel' && griffel.override,
    override === 'class-name' && styles.override,
    callerOverride === 'griffel' && griffel.caller,
    callerOverride === 'plain-css' && styles.plainCaller,
  );

  return (
    <FluentProvider
      data-testid="outer"
      targetDocument={targetDocument}
      theme={webLightTheme}
      dir={dir}
      customStyleHooks_unstable={customStyleHooks}
    >
      <button data-testid="keyboard-start">Start keyboard navigation</button>
      <Button
        data-testid="subject"
        appearance="primary"
        className={className}
        icon={{
          className: override === 'griffel' ? griffel.icon : override === 'class-name' ? styles.icon : undefined,
          children: <span aria-hidden="true">+</span>,
        }}
      >
        Migrated action
      </Button>
      <AppButton data-testid="wrapped" appearance="primary" className={styles.emphasis}>
        Wrapped action
      </AppButton>
      <Button data-testid="disabled" disabled onClick={onActivate}>
        Disabled action
      </Button>
      <Button data-testid="disabled-focusable" disabledFocusable onClick={onActivate}>
        Focusable disabled action
      </Button>
      <button data-testid="toggle-theme" onClick={() => setDark(value => !value)}>
        Toggle nested theme
      </button>
      <FluentProvider
        data-testid="nested"
        theme={dark ? webDarkTheme : undefined}
        customStyleHooks_unstable={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
          usePopoverSurfaceStyles_unstable: (state: unknown) => {
            const surfaceState = state as PopoverSurfaceState;
            surfaceState.root.className = mergeClasses(surfaceState.root.className, griffel.surface);
          },
        }}
      >
        <Button data-testid="nested-button" appearance="primary">
          Nested action
        </Button>
        <Popover>
          <PopoverTrigger disableButtonEnhancement>
            <Button data-testid="open-popover">Open details</Button>
          </PopoverTrigger>
          <PopoverSurface data-testid="surface">
            <Button data-testid="portal-button" appearance="primary">
              Portaled action
            </Button>
          </PopoverSurface>
        </Popover>
      </FluentProvider>
    </FluentProvider>
  );
};
