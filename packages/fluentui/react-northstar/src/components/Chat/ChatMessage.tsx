import {
  Accessibility,
  chatMessageBehavior,
  ChatMessageBehaviorProps,
  IS_FOCUSABLE_ATTRIBUTE,
  keyboardKey,
  menuAsToolbarBehavior,
} from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useAutoControlled,
  useContextSelector,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  useMergedRefs,
  ForwardRefWithAs,
  mergeVariablesOverrides,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import cx from 'classnames';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  ComponentEventHandler,
  ComponentKeyboardEventHandler,
  FluentComponentStaticProps,
  ObjectShorthandValue,
  ShorthandCollection,
  ShorthandValue,
} from '../../types';
import {
  ChildrenComponentProps,
  childrenExist,
  commonPropTypes,
  ContentComponentProps,
  createShorthand,
  createShorthandFactory,
  getOrGenerateIdFromShorthand,
  rtlTextContainer,
  UIComponentProps,
} from '../../utils';
import {
  getScrollParent,
  partitionPopperPropsFromShorthand,
  PopperModifiersFn,
  PopperRefHandle,
  PopperShorthandProps,
  usePopper,
} from '../../utils/positioner';
import { Box, BoxProps } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Label, LabelProps } from '../Label/Label';
import { Menu, MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import { PortalInner } from '../Portal/PortalInner';
import { Reaction, ReactionProps } from '../Reaction/Reaction';
import { ReactionGroupProps } from '../Reaction/ReactionGroup';
import { Text, TextProps } from '../Text/Text';
import { useChatContextSelectors } from './chatContext';
import { ChatDensity } from './chatDensity';
import { ChatItemContext } from './chatItemContext';
import { ChatMessageDetails, ChatMessageDetailsProps } from './ChatMessageDetails';
import { ChatMessageHeader, ChatMessageHeaderProps } from './ChatMessageHeader';
import { ChatMessageReadStatus, ChatMessageReadStatusProps } from './ChatMessageReadStatus';
import { ChatMessageContent } from './ChatMessageContent';

export interface ChatMessageSlotClassNames {
  actionMenu: string;
  author: string;
  badge: string;
  bar: string;
  bubble: string;
  bubbleInset: string;
  body: string;
  compactBody: string;
  reactionGroup: string;
  timestamp: string;
}

export type ChatMessageLayout = 'default' | 'refresh';

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

  /** Badge attached to the message. */
  badge?: ShorthandValue<LabelProps>;

  /** A message can format the badge to appear at the start or the end of the message. */
  badgePosition?: 'start' | 'end';

  /** A message can have a custom body. Only rendered in compact density. */
  compactBody?: ShorthandValue<BoxProps>;

  /** Chat density. Is automatically set by the Chat. */
  density?: ChatDensity;

  /** Message details info slot. Displayed in the header or body in comfy and compact density respectively. */
  details?: ShorthandValue<ChatMessageDetailsProps>;

  /** A message can have a custom header. */
  header?: ShorthandValue<ChatMessageHeaderProps>;

  /** Optional slot for inserting content into the default header. */
  headerContent?: React.ReactNode;

  /** Indicates whether message belongs to the current user. */
  mine?: boolean;

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
   * Called on chat message item key down.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onKeyDown?: ComponentKeyboardEventHandler<ChatMessageProps>;

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

  /** Allows suppression of action menu positioning for performance reasons. */
  positionActionMenu?: boolean;

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>;

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end';

  /** Message read status indicator. */
  readStatus?: ShorthandValue<ChatMessageReadStatusProps>;

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<TextProps>;

  /** Positions an actionMenu slot in "fixed" mode. */
  unstable_overflow?: boolean;

  /** A message can render with different layouts. */
  unstable_layout?: ChatMessageLayout;

  /** Indicates whether the message is in a failed state. */
  failed?: boolean;

  /** A message can have a custom body element (only applicable to "refresh" layout). */
  body?: ShorthandValue<BoxProps>;

  /** A message can have a custom bubble element (only applicable to "refresh" layout). */
  bubble?: ShorthandValue<BoxProps>;

  /** A message can have a custom bubble inset element which sits next to the bubble (only applicable to "refresh" layout). */
  bubbleInset?: ShorthandValue<BoxProps>;

  /** Optional override for the content in the default bubble inset (only applicable to "refresh" layout). */
  bubbleInsetContent?: React.ReactNode;
}

export type ChatMessageStylesProps = Pick<ChatMessageProps, 'attached' | 'badgePosition' | 'density' | 'mine'> & {
  hasBadge: boolean;
  hasHeaderReactionGroup: boolean;
  hasReactions: boolean;
  layout: ChatMessageLayout;
  failed: boolean;

  // focused, hasActionMenu and showActionMenu controls the visibility of action menu
  focused: boolean;
  hasActionMenu: boolean;
  showActionMenu: boolean;
};

export const chatMessageClassName = 'ui-chat__message';
export const chatMessageSlotClassNames: ChatMessageSlotClassNames = {
  actionMenu: `${chatMessageClassName}__actions`,
  author: `${chatMessageClassName}__author`,
  badge: `${chatMessageClassName}__badge`,
  bar: `${chatMessageClassName}__bar`,
  body: `${chatMessageClassName}__body`,
  bubble: `${chatMessageClassName}__bubble`,
  bubbleInset: `${chatMessageClassName}__bubble-inset`,
  compactBody: `${chatMessageClassName}__compact-body`,
  reactionGroup: `${chatMessageClassName}__reactions`,
  timestamp: `${chatMessageClassName}__timestamp`,
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
export const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>((inputProps, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(ChatMessage.displayName, context.telemetry);
  setStart();

  const parentAttached = useContextSelector(ChatItemContext, v => v.attached);
  const chatProps = useChatContextSelectors({
    density: v => v.density,
    accessibility: v => v.behaviors.message,
  });

  const props = {
    ...inputProps,
    density: inputProps.density === undefined ? chatProps.density : inputProps.density,
    accessibility:
      inputProps.accessibility === undefined
        ? chatProps.accessibility || chatMessageBehavior
        : inputProps.accessibility,
  };
  const {
    accessibility,
    attached = parentAttached,
    author,
    badge,
    badgePosition,
    children,
    className,
    compactBody,
    content,
    density,
    design,
    details,
    header,
    mine,
    positionActionMenu,
    reactionGroup,
    reactionGroupPosition,
    readStatus,
    styles,
    timestamp,
    unstable_overflow: overflow,
    unstable_layout: layout = 'default',
    variables,
    failed,
    bubble,
    body,
    bubbleInset,
    bubbleInsetContent,
    headerContent,
  } = props;

  const isRefreshComfyLayout = layout === 'refresh' && density === 'comfy';

  const [actionMenuOptions, positioningProps] = partitionPopperPropsFromShorthand(props.actionMenu);
  const [actionMenu, inlineActionMenu, controlledShowActionMenu] =
    partitionActionMenuPropsFromShorthand(actionMenuOptions);
  const [showActionMenu, setShowActionMenu] = useAutoControlled<boolean>({
    defaultValue: false,
    value: controlledShowActionMenu,
  });
  const hasActionMenu = !_.isNil(actionMenu);
  const hasHeaderReactionGroup = !!reactionGroup && reactionGroupPosition === 'start';

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
  const { targetRef: actionsMenuTargetRef, containerRef: actionsMenuRef } = usePopper({
    align: 'end',
    rtl: context.rtl,
    position: 'above',
    positionFixed: overflow,

    enabled: hasActionMenu && positionActionMenu,
    modifiers,

    ...positioningProps,
    popperRef: useMergedRefs(positioningProps?.popperRef, popperRef),
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
        const target = actionsMenuTargetRef.current;
        if (target) {
          target.focus();
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
      density,
      focused,
      hasActionMenu,
      hasBadge: !!badge,
      hasHeaderReactionGroup,
      mine,
      showActionMenu,
      hasReactions: !!reactionGroup,
      failed,
      layout,
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
      size: density === 'comfy' ? 'small' : undefined,
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

  const messageContent = createShorthand(ChatMessageContent, content, {
    defaultProps: () => ({ badgePosition, density, failed, hasBadge: !!badge, mine, unstable_layout: layout }),
    overrideProps: predefinedProps => ({
      variables: mergeVariablesOverrides(variables, predefinedProps.variables),
    }),
  });

  const detailsElement = createShorthand(ChatMessageDetails, details, {
    defaultProps: () => ({ attached, density, hasHeaderReactionGroup, mine }),
  });

  const readStatusElement = createShorthand(ChatMessageReadStatus, readStatus, {
    defaultProps: () => ({ density }),
  });

  let elements = <></>;
  if (density === 'compact') {
    const headerElement = createShorthand(ChatMessageHeader, header);

    const bodyElement = Box.create(compactBody || {}, {
      defaultProps: () =>
        getA11Props('compactBody', {
          className: chatMessageSlotClassNames.compactBody,
          styles: resolvedStyles.compactBody,
        }),
      overrideProps: () => ({
        content: (
          <>
            <Flex.Item grow={1}>
              <div>
                {authorElement}
                {messageContent}
              </div>
            </Flex.Item>
            {timestampElement}
            {detailsElement}
            {badgeElement}
          </>
        ),
      }),
    });

    elements = (
      <>
        {actionMenuElement}
        <div className={chatMessageSlotClassNames.bar} />
        {headerElement}
        {bodyElement}
        {reactionGroupElement}
        {readStatusElement}
      </>
    );
  } else if (isRefreshComfyLayout) {
    const headerElement = createShorthand(ChatMessageHeader, header || {}, {
      defaultProps: () => ({
        styles: resolvedStyles.header,
        content: (
          <>
            {authorElement}
            {headerContent}
            {detailsElement}
          </>
        ),
      }),
    });

    const bubbleElement = Box.create(bubble || {}, {
      defaultProps: () =>
        getA11Props('bubble', {
          className: chatMessageSlotClassNames.bubble,
          styles: resolvedStyles.bubble,
        }),
      overrideProps: () => ({
        ref: actionsMenuTargetRef,
        content: (
          <>
            {actionMenuElement}
            {messageContent}
            {reactionGroupElement}
            {readStatusElement}
          </>
        ),
        onMouseEnter(e: React.SyntheticEvent) {
          popperRef.current?.updatePosition();
          handleMouseEnter(e);
        },
        onMouseLeave(e: React.SyntheticEvent) {
          handleMouseLeave(e);
        },
      }),
    });

    const bubbleInsetElement = Box.create(bubbleInset || {}, {
      defaultProps: () => ({
        as: 'span',
        className: chatMessageSlotClassNames.bubbleInset,
        styles: resolvedStyles.bubbleInset,
      }),
      overrideProps: () => ({
        content: (
          <>
            {badgeElement}
            {bubbleInsetContent}
            {timestampElement}
          </>
        ),
      }),
    });

    const bodyElement = Box.create(body || {}, {
      defaultProps: () =>
        getA11Props('body', {
          className: chatMessageSlotClassNames.body,
          styles: resolvedStyles.body,
        }),
      overrideProps: () => ({
        content: (
          <>
            {bubbleElement}
            {bubbleInsetElement}
          </>
        ),
      }),
    });

    elements = (
      <>
        {headerElement}
        {bodyElement}
      </>
    );
  } else {
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

    elements = (
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
    );
  }

  const element = (
    <Ref innerRef={!isRefreshComfyLayout && actionsMenuTargetRef}>
      {getA11Props.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11Props('root', {
            className: rootClasses,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            onKeyDown: handleKeyDown,
            ref,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          {childrenPropExists ? children : elements}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, ChatMessageProps> &
  FluentComponentStaticProps<ChatMessageProps>;

ChatMessage.displayName = 'ChatMessage';

ChatMessage.defaultProps = {
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
  badgePosition: PropTypes.oneOf(['start', 'end']),
  compactBody: customPropTypes.itemShorthand,
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
  details: customPropTypes.itemShorthand,
  header: customPropTypes.itemShorthand,
  mine: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  positionActionMenu: PropTypes.bool,
  reactionGroup: PropTypes.oneOfType([customPropTypes.collectionShorthand, customPropTypes.itemShorthand]),
  reactionGroupPosition: PropTypes.oneOf(['start', 'end']),
  readStatus: customPropTypes.itemShorthand,
  timestamp: customPropTypes.itemShorthand,
  unstable_overflow: PropTypes.bool,
  unstable_layout: PropTypes.oneOf(['default', 'refresh']),
  failed: PropTypes.bool,
  headerContent: PropTypes.node,
  body: customPropTypes.itemShorthand,
  bubble: customPropTypes.itemShorthand,
  bubbleInset: customPropTypes.itemShorthand,
  bubbleInsetContent: PropTypes.node,
};

ChatMessage.handledProps = Object.keys(ChatMessage.propTypes) as any;

ChatMessage.create = createShorthandFactory({ Component: ChatMessage, mappedProp: 'content' });
