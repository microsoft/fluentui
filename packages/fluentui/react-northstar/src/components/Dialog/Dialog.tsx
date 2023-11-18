import { Accessibility, dialogBehavior, DialogBehaviorProps, getCode, keyboardKey } from '@fluentui/accessibility';
import {
  FocusTrapZoneProps,
  useAutoControlled,
  useTelemetry,
  useAccessibility,
  useStyles,
  useFluentContext,
  useUnhandledProps,
  getElementType,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import { Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import {
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  doesNodeContainClick,
  getOrGenerateIdFromShorthand,
  createShorthand,
  createShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Button, ButtonProps } from '../Button/Button';
import { ButtonGroup } from '../Button/ButtonGroup';
import { Box, BoxProps } from '../Box/Box';
import { Header, HeaderProps } from '../Header/Header';
import { Portal, TriggerAccessibility } from '../Portal/Portal';
import { Flex } from '../Flex/Flex';
import { DialogFooter, DialogFooterProps } from './DialogFooter';

export interface DialogSlotClassNames {
  header: string;
  headerAction: string;
  content: string;
  overlay: string;
  footer: string;
}

export interface DialogProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** A dialog can contain actions. */
  actions?: ShorthandValue<BoxProps>;

  /** A dialog can have a backdrop on its overlay. */
  backdrop?: boolean;

  /** A dialog can contain a cancel button. */
  cancelButton?: ShorthandValue<ButtonProps>;

  /** A dialog can be closed when a user clicks outside of it. */
  closeOnOutsideClick?: boolean;

  /** A dialog can contain a confirm button. */
  confirmButton?: ShorthandValue<ButtonProps>;

  /** A dialog can be open by default. */
  defaultOpen?: boolean;

  /** A dialog can contain a header. */
  header?: ShorthandValue<HeaderProps>;

  /** A dialog can contain a button next to the header. */
  headerAction?: ShorthandValue<ButtonProps>;

  /** A dialog can contain a footer. */
  footer?: ShorthandValue<DialogFooterProps>;

  /**
   * Called after a user clicks the cancel button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onCancel?: ComponentEventHandler<DialogProps>;

  /**
   * Called after a user clicks the confirm button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onConfirm?: ComponentEventHandler<DialogProps>;

  /**
   * Called after a user opens the dialog.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onOpen?: ComponentEventHandler<DialogProps>;

  /** A dialog's open state can be controlled. */
  open?: boolean;

  /** A dialog can contain a overlay. */
  overlay?: ShorthandValue<BoxProps>;

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: boolean | FocusTrapZoneProps;

  /** Element to be rendered in-place where the dialog is defined. */
  trigger?: JSX.Element;
}

export interface DialogState {
  contentId?: string;
  headerId?: string;
  open?: boolean;
}

export const dialogClassName = 'ui-dialog';
export const dialogSlotClassNames: DialogSlotClassNames = {
  header: `${dialogClassName}__header`,
  headerAction: `${dialogClassName}__headerAction`,
  content: `${dialogClassName}__content`,
  overlay: `${dialogClassName}__overlay`,
  footer: `${dialogClassName}__footer`,
};

export type DialogStylesProps = Required<Pick<DialogProps, 'backdrop'>>;

/**
 * A Dialog displays important information on top of a page which requires a user's attention, confirmation, or interaction.
 * Dialogs are purposefully interruptive, so they should be used sparingly.
 *
 * @accessibility
 * Implements [ARIA Dialog (Modal)](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) design pattern.
 * @accessibilityIssues
 * [NVDA narrates dialog title and button twice](https://github.com/nvaccess/nvda/issues/10003)
 * [NVDA does not recognize the ARIA 1.1 values of aria-haspopup](https://github.com/nvaccess/nvda/issues/8235)
 * [Jaws does not announce token values of aria-haspopup](https://github.com/FreedomScientific/VFO-standards-support/issues/33)
 * [Issue 989517: VoiceOver narrates dialog content and button twice](https://bugs.chromium.org/p/chromium/issues/detail?id=989517)
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Dialog.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    content,
    header,
    actions,
    cancelButton,
    closeOnOutsideClick,
    confirmButton,
    headerAction,
    overlay,
    trapFocus,
    trigger,
    footer,
    backdrop,
    className,
    design,
    styles,
    variables,
  } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Dialog.handledProps, props);

  const contentRef = React.useRef<HTMLElement>();
  const overlayRef = React.useRef<HTMLElement>();
  const triggerRef = React.useRef<HTMLElement>();

  const contentId = React.useRef<string>();
  contentId.current = getOrGenerateIdFromShorthand('dialog-content-', content, contentId.current);
  const headerId = React.useRef<string>();
  headerId.current = getOrGenerateIdFromShorthand('dialog-header-', header, headerId.current);

  const getA11yProps = useAccessibility<DialogBehaviorProps>(accessibility, {
    debugName: Dialog.displayName,
    actionHandlers: {
      closeAndFocusTrigger: e => {
        handleDialogCancel(e);
        e.stopPropagation();

        _.invoke(triggerRef, 'current.focus');
      },
      close: e => handleDialogCancel(e),
    },
    mapPropsToBehavior: () => ({
      headerId: headerId.current,
      contentId: contentId.current,
      trapFocus,
      trigger,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<DialogStylesProps>(Dialog.displayName, {
    className: dialogClassName,
    mapPropsToStyles: () => ({
      backdrop,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,
    initialValue: false,
  });

  React.useEffect(() => {
    const target = contentRef?.current;
    if (open) {
      disableBodyScroll(target);
    }
    return () => {
      if (open) {
        enableBodyScroll(target);
      }
    };
  }, [open]);

  const handleDialogCancel = (e: Event | React.SyntheticEvent) => {
    _.invoke(props, 'onCancel', e, { ...props, open: false });
    setOpen(false);
  };

  const handleDialogConfirm = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onConfirm', e, { ...props, open: false });
    setOpen(false);
  };

  const handleDialogOpen = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onOpen', e, { ...props, open: true });
    setOpen(true);
  };

  const handleCancelButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      handleDialogCancel(e);
    },
  });

  const handleConfirmButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      handleDialogConfirm(e);
    },
  });

  // when press left click on Dialog content and hold, and mouse up on Dialog overlay, Dialog should keep open
  const isMouseDownInsideContent = React.useRef(false);
  const registerMouseDownOnDialogContent = (e: React.MouseEvent) => {
    if (e.button === 0) {
      isMouseDownInsideContent.current = true;
    }
    if (unhandledProps.onMouseDown) {
      _.invoke(unhandledProps, 'onMouseDown', e);
    }
  };

  const handleOverlayClick = (e: MouseEvent) => {
    // Dialog has different conditions to close than Popup, so we don't need to iterate across all
    // refs
    const isInsideContentClick =
      isMouseDownInsideContent.current || doesNodeContainClick(contentRef.current, e, context.target);
    isMouseDownInsideContent.current = false;

    const isInsideOverlayClick = doesNodeContainClick(overlayRef.current, e, context.target);

    const shouldClose = !isInsideContentClick && isInsideOverlayClick;

    if (shouldClose) {
      handleDialogCancel(e);
    }
  };

  const handleDocumentKeydown = (getRefs: Function) => (e: KeyboardEvent) => {
    // if focus was lost from Dialog, for e.g. when click on Dialog's content
    // and ESC is pressed, the opened Dialog should get closed and the trigger should get focus
    const lastOverlayRef = getRefs().pop();
    const isLastOpenedDialog: boolean = lastOverlayRef && lastOverlayRef.current === overlayRef.current;
    const targetIsBody = (e.target as HTMLElement).nodeName === 'BODY';

    if (targetIsBody && getCode(e) === keyboardKey.Escape && isLastOpenedDialog) {
      handleDialogCancel(e);
      _.invoke(triggerRef, 'current.focus');
    }
  };

  const cancelElement = createShorthand(Button, cancelButton, {
    overrideProps: handleCancelButtonOverrides,
  });

  const confirmElement = createShorthand(Button, confirmButton, {
    defaultProps: () => ({
      primary: true,
    }),
    overrideProps: handleConfirmButtonOverrides,
  });

  const dialogActions =
    (cancelElement || confirmElement) &&
    ButtonGroup.create(actions, {
      defaultProps: () => ({
        styles: resolvedStyles.actions,
      }),
      overrideProps: {
        content: (
          <Flex gap="gap.smaller" hAlign="end">
            {cancelElement}
            {confirmElement}
          </Flex>
        ),
      },
    });

  const dialogContent = (
    <Ref innerRef={contentRef}>
      <ElementType
        {...getA11yProps('popup', {
          className: classes.root,
          ref,
          ...unhandledProps,
          onMouseDown: registerMouseDownOnDialogContent,
        })}
      >
        {Header.create(header, {
          defaultProps: () =>
            getA11yProps('header', {
              as: 'h2',
              className: dialogSlotClassNames.header,
              styles: resolvedStyles.header,
            }),
        })}
        {createShorthand(Button, headerAction, {
          defaultProps: () =>
            getA11yProps('headerAction', {
              className: dialogSlotClassNames.headerAction,
              styles: resolvedStyles.headerAction,
              text: true,
              iconOnly: true,
            }),
        })}
        {Box.create(content, {
          defaultProps: () =>
            getA11yProps('content', {
              styles: resolvedStyles.content,
              className: dialogSlotClassNames.content,
            }),
        })}
        {DialogFooter.create(footer, {
          overrideProps: {
            content: dialogActions,
            className: dialogSlotClassNames.footer,
            styles: resolvedStyles.footer,
          },
        })}
      </ElementType>
    </Ref>
  );

  const triggerAccessibility: TriggerAccessibility = {
    // refactor this when unstable_behaviorDefinition gets merged
    attributes: accessibility(props).attributes.trigger,
    keyHandlers: accessibility(props).keyActions.trigger,
  };

  const element = (
    <Portal
      onTriggerClick={handleDialogOpen}
      open={open}
      trapFocus={trapFocus}
      trigger={trigger}
      triggerAccessibility={triggerAccessibility}
      triggerRef={triggerRef}
    >
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={(contentNode: HTMLElement) => {
                overlayRef.current = contentNode;
                nestingRef.current = contentNode;
              }}
            >
              {Box.create(overlay, {
                defaultProps: () => ({
                  className: dialogSlotClassNames.overlay,
                  styles: resolvedStyles.overlay,
                }),
                overrideProps: { content: dialogContent },
              })}
            </Ref>

            {closeOnOutsideClick && (
              <EventListener listener={handleOverlayClick} target={context.target} type="click" capture />
            )}
            <EventListener listener={handleDocumentKeydown(getRefs)} target={context.target} type="keydown" capture />
          </>
        )}
      </Unstable_NestingAuto>
    </Portal>
  );
  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DialogProps> &
  FluentComponentStaticProps<DialogProps> & {
    Footer: typeof DialogFooter;
  };

Dialog.displayName = 'Dialog';

Dialog.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: 'shorthand',
  }),
  actions: customPropTypes.itemShorthand,
  backdrop: PropTypes.bool,
  headerAction: customPropTypes.itemShorthand,
  cancelButton: customPropTypes.itemShorthand,
  closeOnOutsideClick: PropTypes.bool,
  confirmButton: customPropTypes.itemShorthand,
  defaultOpen: PropTypes.bool,
  header: customPropTypes.itemShorthand,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  overlay: customPropTypes.itemShorthand,
  trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  trigger: PropTypes.any,
};

Dialog.defaultProps = {
  accessibility: dialogBehavior,
  actions: {},
  backdrop: true,
  closeOnOutsideClick: true,
  overlay: {},
  footer: {},
  trapFocus: true,
};

Dialog.handledProps = Object.keys(Dialog.propTypes) as any;

Dialog.Footer = DialogFooter;

Dialog.create = createShorthandFactory({
  Component: Dialog,
});
