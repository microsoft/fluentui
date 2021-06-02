import {
  Accessibility,
  IS_FOCUSABLE_ATTRIBUTE,
  chatMessageBehavior,
  menuAsToolbarBehavior,
  ChatMessageBehaviorProps,
  keyboardKey,
} from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useContextSelector,
  useAutoControlled,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  getScrollParent,
  partitionPopperPropsFromShorthand,
  PopperModifiersFn,
  PopperRefHandle,
  PopperShorthandProps,
  usePopper,
} from '../../utils/positioner';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthand,
  getOrGenerateIdFromShorthand,
} from '../../utils';
import {
  ShorthandValue,
  ComponentEventHandler,
  ShorthandCollection,
  FluentComponentStaticProps,
  ObjectShorthandValue,
  ComponentKeyboardEventHandler,
} from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { Label, LabelProps } from '../Label/Label';
import { Menu, MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { Text, TextProps } from '../Text/Text';
import { Reaction, ReactionProps } from '../Reaction/Reaction';
import { ReactionGroupProps } from '../Reaction/ReactionGroup';
import { ChatItemContext } from './chatItemContext';
import { ChatMessageHeader, ChatMessageHeaderProps } from './ChatMessageHeader';
import { ChatMessageDetails, ChatMessageDetailsProps } from './ChatMessageDetails';
import { ChatMessageReadStatus, ChatMessageReadStatusProps } from './ChatMessageReadStatus';
import { PortalInner } from '../Portal/PortalInner';

export interface ChatMessageSlotClassNames {
  actionMenu: string;
  author: string;
  timestamp: string;
  badge: string;
  content: string;
  reactionGroup: string;
  bar: string;
}

export interface ChatMessageProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ChatMessageBehaviorProps>;

  /**
   * Menu with actions of the message.
   * popper: alters the action menu positioning.
   * inline: whether the action menu should be rendered inline with the chat message, or in the body. It's true by default.
   * showActionMenu: controls if the action menu is visible or not.
   */
  actionMenu?:
    | ShorthandValue<MenuProps & { popper?: PopperShorthandProps; inline?: boolean; showActionMenu?: boolean }>
    | ShorthandCollection<MenuItemProps & { inline?: boolean; showActionMenu?: boolean }>;

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom';

  /** Author of the message. */
  author?: ShorthandValue<TextProps>;

  /** Indicates whether message belongs to the current user. */
  mine?: boolean;

  /** A message cane have a custom header */
  header?: ShorthandValue<ChatMessageHeaderProps>;

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<TextProps>;

  /** Message details info slot for the header. */
  details?: ShorthandValue<ChatMessageDetailsProps>;

  /** Message read status indicator */
  readStatus?: ShorthandValue<ChatMessageReadStatusProps>;

  /** Badge attached to the message. */
  badge?: ShorthandValue<LabelProps>;

  /** A message can format the badge to appear at the start or the end of the message. */
  badgePosition?: 'start' | 'end';

  /**
   * Called after user's blur.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onBlur?: ComponentEventHandler<ChatMessageProps>;

  /**
   * Called after user's focus.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ChatMessageProps>;

  /**
   * Called after user enters by mouse.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMouseEnter?: ComponentEventHandler<ChatMessageProps>;

  /**
   * Called after user leaves by mouse.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onMouseLeave?: ComponentEventHandler<ChatMessageProps>;

  /** Allows suppression of action menu positioning for performance reasons */
  positionActionMenu?: boolean;

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>;

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end';

  /** Positions an actionMenu slot in "fixed" mode. */
  unstable_overflow?: boolean;

  /**
   * Called on chat message item key down.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<ChatMessageProps>;
}

export type ChatMessageStylesProps = Pick<ChatMessageProps, 'attached' | 'badgePosition' | 'mine'> & {
  hasBadge: boolean;
  hasReactionGroup: boolean;

  // focused, hasActionMenu and showActionMenu controls the visibility of action menu
  focused: boolean;
  hasActionMenu: boolean;
  showActionMenu: boolean;
};

export const chatMessageClassName = 'ui-chat__message';
export const chatMessageSlotClassNames: ChatMessageSlotClassNames = {
  actionMenu: `${chatMessageClassName}__actions`,
  author: `${chatMessageClassName}__author`,
  timestamp: `${chatMessageClassName}__timestamp`,
  badge: `${chatMessageClassName}__badge`,
  content: `${chatMessageClassName}__content`,
  reactionGroup: `${chatMessageClassName}__reactions`,
  bar: `${chatMessageClassName}__bar`,
};

function partitionActionMenuPropsFromShorthand<P>(
  value: ShorthandValue<P & { inline?: boolean; showActionMenu?: boolean }>,
): [ShorthandValue<P> | ObjectShorthandValue<P>, boolean | undefined, boolean | undefined] {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const { inline, showActionMenu, ...props } = value as ObjectShorthandValue<P> & {
      inline?: boolean;
      showActionMenu?: boolean;
    };

    return [props as ObjectShorthandValue<P>, inline ?? true, showActionMenu];
  }

  return [value, true, false];
}

/**
 * A ChatMessage represents a single message in chat.
 */
export const ChatMessage: ComponentWithAs<'div', ChatMessageProps> &
  FluentComponentStaticProps<ChatMessageProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(ChatMessage.displayName, context.telemetry);
  setStart();

  const parentAttached = useContextSelector(ChatItemContext, v => v.attached);
  const {
    accessibility,
    attached = parentAttached,
    author,
    badge,
    badgePosition,
    children,
    className,
    content,
    design,
    mine,
    positionActionMenu,
    reactionGroup,
    reactionGroupPosition,
    timestamp,
    styles,
    variables,
    header,
    details,
    readStatus,
    unstable_overflow: overflow,
  } = props;

  const [actionMenuOptions, positioningProps] = partitionPopperPropsFromShorthand(props.actionMenu);
  const [actionMenu, inlineActionMenu, controlledShowActionMenu] = partitionActionMenuPropsFromShorthand(
    actionMenuOptions,
  );
  const [showActionMenu, setShowActionMenu] = useAutoControlled<boolean>({
    defaultValue: false,
    value: controlledShowActionMenu,
  });
  const hasActionMenu = !_.isNil(actionMenu);

  const actionMenuId = React.useRef<string>();
  actionMenuId.current = getOrGenerateIdFromShorthand(`${chatMessageClassName}-`, actionMenu, actionMenuId.current);

  const modifiers = React.useCallback<PopperModifiersFn>(
    (target, container) => {
      return (
        positionActionMenu && [
          // https://popper.js.org/docs/v2/modifiers/flip/
          // Forces to flip only in "top-*" positions
          { name: 'flip', options: { fallbackPlacements: ['top'] } },
          overflow && {
            name: 'preventOverflow',
            options: { boundary: getScrollParent(container) },
          },
        ]
      );
    },
    [positionActionMenu, overflow],
  );

  const popperRef = React.useRef<PopperRefHandle>();
  const { targetRef: messageRef, containerRef: actionsMenuRef } = usePopper({
    align: 'end',
    position: 'above',
    positionFixed: overflow,

    enabled: hasActionMenu && positionActionMenu,
    modifiers,
    popperRef,

    ...positioningProps,
  });

  // `focused` state is used for show/hide actionMenu
  const [focused, setFocused] = React.useState<boolean>(false);

  const getA11Props = useAccessibility(accessibility, {
    actionHandlers: {
      // prevents default FocusZone behavior, e.g., in ChatMessageBehavior, it prevents FocusZone from using arrow keys
      // as navigation (only Tab key should work)
      preventDefault: event => {
        // preventDefault only if event coming from inside the message
        if (event.currentTarget !== event.target) {
          event.preventDefault();
        }
      },

      focus: event => {
        if (messageRef.current) {
          messageRef.current.focus();
          event.stopPropagation();
        }
      },
    },
    debugName: ChatMessage.displayName,
    mapPropsToBehavior: () => ({
      hasActionMenu,
      inlineActionMenu,
      actionMenuId: actionMenuId.current,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<ChatMessageStylesProps>(ChatMessage.displayName, {
    className: chatMessageClassName,
    mapPropsToStyles: () => ({
      attached,
      badgePosition,
      focused,
      mine,
      hasBadge: !!badge,
      hasReactionGroup: !!reactionGroup,
      hasActionMenu,
      showActionMenu,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleFocus = (e: React.SyntheticEvent) => {
    popperRef.current?.updatePosition();

    // react onFocus is called even when nested component receives focus (i.e. it bubbles)
    // so when focus moves within actionMenu, the `focus` state in chatMessage remains true, and keeps actionMenu visible
    setFocused(true);
    _.invoke(props, 'onFocus', e, props);
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    // `focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', (e as any).relatedTarget);

    setFocused(shouldPreserveFocusState);
    setShowActionMenu(false);

    _.invoke(props, 'onBlur', e, props);
  };

  const handleMouseEnter = (e: React.SyntheticEvent) => {
    popperRef.current?.updatePosition();
    if (hasActionMenu && !inlineActionMenu) {
      setShowActionMenu(true);
    }
    _.invoke(props, 'onMouseEnter', e, props);
  };

  const handleMouseLeave = (e: React.SyntheticEvent) => {
    if (!focused && hasActionMenu && !inlineActionMenu) {
      setShowActionMenu(false);
    }
    _.invoke(props, 'onMouseLeave', e, props);
  };

  const renderActionMenu = () => {
    const actionMenuElement = Menu.create(actionMenu, {
      defaultProps: () => ({
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        accessibility: menuAsToolbarBehavior,
        className: chatMessageSlotClassNames.actionMenu,
        styles: resolvedStyles.actionMenu,
      }),
      overrideProps: {
        id: actionMenuId.current,
      },
    });

    const content = actionMenuElement ? <Ref innerRef={actionsMenuRef}>{actionMenuElement}</Ref> : actionMenuElement;

    return inlineActionMenu || !content ? content : <PortalInner>{content}</PortalInner>;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hasActionMenu && !inlineActionMenu) {
      // reference: https://github.com/microsoft/fluentui/pull/17329

      const toFocusItemInActionMenu =
        actionsMenuRef.current?.querySelector('[tabindex="0"]') ??
        actionsMenuRef.current?.querySelectorAll('[tabindex="-1"]:not([data-is-focusable="false"])')[0];

      if (e.keyCode === keyboardKey.Enter) {
        toFocusItemInActionMenu?.focus();
        e.stopPropagation();
        e.preventDefault();
      }

      if (e.keyCode === keyboardKey.Tab) {
        // TAB/SHIFT+TAB cycles focus among actionMenu and focusable elements within chat message
        const isShift = !!e.shiftKey;

        const focusableElementsInsideMessage: NodeListOf<HTMLElement> = e.currentTarget.querySelectorAll(
          '[tabindex="-1"]:not([data-is-focusable="false"])',
        );
        const firstFocusableInsideMessage = focusableElementsInsideMessage[0];
        const lastFocusableInsideMessage = focusableElementsInsideMessage[focusableElementsInsideMessage.length - 1];

        if (e.target === toFocusItemInActionMenu) {
          // focus is now inside action menu
          // cycle focus into the first/last focusable element inside chat message
          if (isShift) {
            lastFocusableInsideMessage?.focus();
          } else {
            firstFocusableInsideMessage?.focus();
          }
          e.stopPropagation();
          e.preventDefault();
        } else {
          const boundaryElementInsideMessage = isShift ? firstFocusableInsideMessage : lastFocusableInsideMessage;
          if (e.target === boundaryElementInsideMessage) {
            // focus is now on the first/last focusable element inside chat message
            toFocusItemInActionMenu.focus(); // cycle focus back into action Menu
            e.stopPropagation();
            e.preventDefault();
          }
        }
      }
    }
    _.invoke(props, 'onKeyDown', e, props);
  };

  const childrenPropExists = childrenExist(children);
  const rootClasses = childrenPropExists ? cx(classes.root, classes.content) : classes.root;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ChatMessage.handledProps, props);

  const badgeElement = Label.create(badge, {
    defaultProps: () => ({
      className: chatMessageSlotClassNames.badge,
      styles: resolvedStyles.badge,
    }),
  });

  const reactionGroupElement = Reaction.Group.create(reactionGroup, {
    defaultProps: () => ({
      className: chatMessageSlotClassNames.reactionGroup,
      styles: resolvedStyles.reactionGroup,
    }),
  });

  const actionMenuElement = renderActionMenu();

  const authorElement = Text.create(author, {
    defaultProps: () => ({
      size: 'small',
      styles: resolvedStyles.author,
      className: chatMessageSlotClassNames.author,
    }),
  });

  const timestampElement = Text.create(timestamp, {
    defaultProps: () => ({
      size: 'small',
      styles: resolvedStyles.timestamp,
      timestamp: true,
      className: chatMessageSlotClassNames.timestamp,
    }),
  });

  const messageContent = Box.create(content, {
    defaultProps: () => ({
      className: chatMessageSlotClassNames.content,
      styles: resolvedStyles.content,
    }),
  });

  const detailsElement = createShorthand(ChatMessageDetails, details, {
    defaultProps: () => ({ mine }),
  });

  const readStatusElement = createShorthand(ChatMessageReadStatus, readStatus, {});

  const headerElement = createShorthand(ChatMessageHeader, header || {}, {
    overrideProps: () => ({
      content: (
        <>
          {authorElement}
          {timestampElement}
          {detailsElement}
          {reactionGroupPosition === 'start' && reactionGroupElement}
        </>
      ),
    }),
  });

  const element = (
    <Ref innerRef={messageRef}>
      {getA11Props.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11Props('root', {
            className: rootClasses,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onKeyDown: handleKeyDown,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          {childrenPropExists ? (
            children
          ) : (
            <>
              {actionMenuElement}
              <div className={chatMessageSlotClassNames.bar} />
              {badgePosition === 'start' && badgeElement}
              {headerElement}
              {messageContent}
              {reactionGroupPosition === 'end' && reactionGroupElement}
              {badgePosition === 'end' && badgeElement}
              {readStatusElement}
            </>
          )}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();

  return element;
};

ChatMessage.displayName = 'ChatMessage';

ChatMessage.defaultProps = {
  accessibility: chatMessageBehavior,
  badgePosition: 'end',
  positionActionMenu: true,
  reactionGroupPosition: 'start',
};

ChatMessage.propTypes = {
  ...commonPropTypes.createCommon({ content: 'shorthand' }),
  actionMenu: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'top' | 'bottom'>(['top', 'bottom'])]),
  author: customPropTypes.itemShorthand,
  badge: customPropTypes.itemShorthand,
  details: customPropTypes.itemShorthand,
  badgePosition: PropTypes.oneOf(['start', 'end']),
  header: customPropTypes.itemShorthand,
  mine: PropTypes.bool,
  timestamp: customPropTypes.itemShorthand,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  positionActionMenu: PropTypes.bool,
  reactionGroup: PropTypes.oneOfType([customPropTypes.collectionShorthand, customPropTypes.itemShorthand]),
  reactionGroupPosition: PropTypes.oneOf(['start', 'end']),
  unstable_overflow: PropTypes.bool,
  readStatus: customPropTypes.itemShorthand,
  onKeyDown: PropTypes.func,
};

ChatMessage.handledProps = Object.keys(ChatMessage.propTypes) as any;

ChatMessage.create = createShorthandFactory({ Component: ChatMessage, mappedProp: 'content' });
