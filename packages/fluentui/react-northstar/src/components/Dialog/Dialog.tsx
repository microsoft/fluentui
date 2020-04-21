import { Accessibility, dialogBehavior } from '@fluentui/accessibility';
import { FocusTrapZoneProps } from '@fluentui/react-bindings';
import { Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';
import { EventListener } from '@fluentui/react-component-event-listener';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as keyboardKey from 'keyboard-key';
import { disableBodyScroll, enableBodyScroll } from './utils';

import {
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  AutoControlledComponent,
  doesNodeContainClick,
  applyAccessibilityKeyHandlers,
  getOrGenerateIdFromShorthand,
  createShorthand,
} from '../../utils';
import { ComponentEventHandler, WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import Button, { ButtonProps } from '../Button/Button';
import ButtonGroup from '../Button/ButtonGroup';
import Box, { BoxProps } from '../Box/Box';
import Header, { HeaderProps } from '../Header/Header';
import Portal, { TriggerAccessibility } from '../Portal/Portal';
import Flex from '../Flex/Flex';
import DialogFooter, { DialogFooterProps } from './DialogFooter';

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
  trapFocus?: true | FocusTrapZoneProps;

  /** Element to be rendered in-place where the dialog is defined. */
  trigger?: JSX.Element;
}

export interface DialogState {
  contentId?: string;
  headerId?: string;
  open?: boolean;
}
const dialogsCounterAttribute = 'fluent-dialogs-count';
export const dialogClassName = 'ui-dialog';
export const dialogSlotClassNames: DialogSlotClassNames = {
  header: `${dialogClassName}__header`,
  headerAction: `${dialogClassName}__headerAction`,
  content: `${dialogClassName}__content`,
  overlay: `${dialogClassName}__overlay`,
  footer: `${dialogClassName}__footer`,
};

class Dialog extends AutoControlledComponent<WithAsProp<DialogProps>, DialogState> {
  static displayName = 'Dialog';
  static deprecated_className = dialogClassName;

  static propTypes = {
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

  static defaultProps = {
    accessibility: dialogBehavior as Accessibility,
    actions: {},
    backdrop: true,
    closeOnOutsideClick: true,
    overlay: {},
    footer: {},
    trapFocus: true,
  };

  static autoControlledProps = ['open'];
  static Footer = DialogFooter;

  actionHandlers = {
    closeAndFocusTrigger: e => {
      this.handleDialogCancel(e);
      e.stopPropagation();

      _.invoke(this.triggerRef, 'current.focus');
    },
    close: e => this.handleDialogCancel(e),
  };
  contentRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  overlayRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>;
  triggerRef = React.createRef<HTMLElement>();

  getInitialAutoControlledState(): DialogState {
    return {
      open: false,
    };
  }

  static getAutoControlledStateFromProps(props: DialogProps, state: DialogState): Partial<DialogState> {
    return {
      contentId: getOrGenerateIdFromShorthand('dialog-content-', props.content, state.contentId),
      headerId: getOrGenerateIdFromShorthand('dialog-header-', props.header, state.headerId),
    };
  }

  handleDialogCancel = (e: Event | React.SyntheticEvent) => {
    _.invoke(this.props, 'onCancel', e, { ...this.props, open: false });
    this.setState({ open: false });
  };

  handleDialogConfirm = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onConfirm', e, { ...this.props, open: false });
    this.setState({ open: false });
  };

  handleDialogOpen = (e: React.SyntheticEvent) => {
    _.invoke(this.props, 'onOpen', e, { ...this.props, open: true });
    this.setState({ open: true });
  };

  handleCancelButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      this.handleDialogCancel(e);
    },
  });

  handleConfirmButtonOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      this.handleDialogConfirm(e);
    },
  });

  handleOverlayClick = (e: MouseEvent) => {
    // Dialog has different conditions to close than Popup, so we don't need to iterate across all
    // refs
    const isInsideContentClick = doesNodeContainClick(this.contentRef.current, e, this.context.target);
    const isInsideOverlayClick = doesNodeContainClick(this.overlayRef.current, e, this.context.target);

    const shouldClose = !isInsideContentClick && isInsideOverlayClick;

    if (shouldClose) {
      this.handleDialogCancel(e);
    }
  };

  handleDocumentKeydown = (getRefs: Function) => (e: KeyboardEvent) => {
    // if focus was lost from Dialog, for e.g. when click on Dialog's content
    // and ESC is pressed, the opened Dialog should get closed and the trigger should get focus
    const lastOverlayRef = getRefs().pop();
    const isLastOpenedDialog: boolean = lastOverlayRef && lastOverlayRef.current === this.overlayRef.current;

    if (keyboardKey.getCode(e) === keyboardKey.Escape && isLastOpenedDialog) {
      this.handleDialogCancel(e);
      _.invoke(this.triggerRef, 'current.focus');
    }
  };

  lockBodyScroll() {
    const openDialogs = (+this.context.target.body.getAttribute(dialogsCounterAttribute) || 0) + 1;
    this.context.target.body.setAttribute(dialogsCounterAttribute, `${openDialogs}`);

    // Avoid to block scroll in nested dialogs
    if (openDialogs === 1) {
      disableBodyScroll(this.context.target.body);
    }
  }

  unlockBodyScroll() {
    const openDialogs = (+this.context.target.body.getAttribute(dialogsCounterAttribute) || 0) - 1;
    this.context.target.body.setAttribute(dialogsCounterAttribute, `${openDialogs}`);

    // Only enables scroll if all dialogs are closed
    if (openDialogs === 0) {
      enableBodyScroll(this.context.target.body);
      this.context.target.body.removeAttribute(dialogsCounterAttribute);
    }
  }

  componentDidUpdate(_, prevState) {
    // Open -> Closed
    if (prevState.open && !this.state.open) {
      this.unlockBodyScroll();
    }
    // Closed -> Open
    if (!prevState.open && this.state.open) {
      this.lockBodyScroll();
    }
  }

  componentDidMount() {
    if (this.state.open) {
      this.lockBodyScroll();
    }
  }

  componentWillUnmount() {
    if (this.state.open) {
      this.unlockBodyScroll();
    }
  }

  renderComponent({ accessibility, classes, ElementType, styles, unhandledProps, rtl }) {
    const {
      actions,
      cancelButton,
      closeOnOutsideClick,
      confirmButton,
      content,
      header,
      headerAction,
      overlay,
      trapFocus,
      trigger,
      footer,
    } = this.props;
    const { open } = this.state;

    const cancelElement = createShorthand(Button, cancelButton, {
      overrideProps: this.handleCancelButtonOverrides,
    });

    const confirmElement = createShorthand(Button, confirmButton, {
      defaultProps: () => ({
        primary: true,
      }),
      overrideProps: this.handleConfirmButtonOverrides,
    });

    const dialogActions =
      (cancelElement || confirmElement) &&
      ButtonGroup.create(actions, {
        defaultProps: () => ({
          styles: styles.actions,
        }),
        overrideProps: {
          content: (
            <Flex gap="gap.smaller">
              {cancelElement}
              {confirmElement}
            </Flex>
          ),
        },
      });

    const dialogContent = (
      <Ref innerRef={this.contentRef}>
        <ElementType
          className={classes.root}
          {...accessibility.attributes.popup}
          {...unhandledProps}
          {...applyAccessibilityKeyHandlers(accessibility.keyHandlers.popup, unhandledProps)}
        >
          {Header.create(header, {
            defaultProps: () => ({
              as: 'h2',
              className: dialogSlotClassNames.header,
              styles: styles.header,
              ...accessibility.attributes.header,
            }),
          })}
          {createShorthand(Button, headerAction, {
            defaultProps: () => ({
              className: dialogSlotClassNames.headerAction,
              styles: styles.headerAction,
              text: true,
              iconOnly: true,
              ...accessibility.attributes.headerAction,
            }),
          })}
          {Box.create(content, {
            defaultProps: () => ({
              styles: styles.content,
              className: dialogSlotClassNames.content,
              ...accessibility.attributes.content,
            }),
          })}
          {DialogFooter.create(footer, {
            overrideProps: {
              content: dialogActions,
              className: dialogSlotClassNames.footer,
              styles: styles.footer,
            },
          })}
        </ElementType>
      </Ref>
    );

    const triggerAccessibility: TriggerAccessibility = {
      attributes: accessibility.attributes.trigger,
      keyHandlers: accessibility.keyHandlers.trigger,
    };

    return (
      <Portal
        onTriggerClick={this.handleDialogOpen}
        open={open}
        trapFocus={trapFocus}
        trigger={trigger}
        triggerAccessibility={triggerAccessibility}
        triggerRef={this.triggerRef}
      >
        <Unstable_NestingAuto>
          {(getRefs, nestingRef) => (
            <>
              <Ref
                innerRef={(contentNode: HTMLElement) => {
                  this.overlayRef.current = contentNode;
                  nestingRef.current = contentNode;
                }}
              >
                {Box.create(overlay, {
                  defaultProps: () => ({
                    className: dialogSlotClassNames.overlay,
                    styles: styles.overlay,
                  }),
                  overrideProps: { content: dialogContent },
                })}
              </Ref>

              {closeOnOutsideClick && (
                <EventListener listener={this.handleOverlayClick} target={this.context.target} type="click" capture />
              )}
              <EventListener
                listener={this.handleDocumentKeydown(getRefs)}
                target={this.context.target}
                type="keydown"
                capture
              />
            </>
          )}
        </Unstable_NestingAuto>
      </Portal>
    );
  }
}

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
export default withSafeTypeForAs<typeof Dialog, DialogProps>(Dialog);
