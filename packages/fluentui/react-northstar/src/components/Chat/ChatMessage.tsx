import {
  Accessibility,
  IS_FOCUSABLE_ATTRIBUTE,
  chatMessageBehavior,
  menuAsToolbarBehavior,
  ChatMessageBehaviorProps,
} from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import { useContextSelector } from '@fluentui/react-context-selector';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import cx from 'classnames';
import * as _ from 'lodash';
import PopperJs from 'popper.js';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { Popper } from '../../utils/positioner';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import {
  WithAsProp,
  ShorthandValue,
  ComponentEventHandler,
  withSafeTypeForAs,
  ShorthandCollection,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import Box, { BoxProps } from '../Box/Box';
import Label, { LabelProps } from '../Label/Label';
import Menu, { MenuProps } from '../Menu/Menu';
import { MenuItemProps } from '../Menu/MenuItem';
import Text, { TextProps } from '../Text/Text';
import Reaction, { ReactionProps } from '../Reaction/Reaction';
import { ReactionGroupProps } from '../Reaction/ReactionGroup';
import { ChatItemContext } from './chatItemContext';

export interface ChatMessageSlotClassNames {
  actionMenu: string;
  author: string;
  timestamp: string;
  badge: string;
  content: string;
  reactionGroup: string;
}

export interface ChatMessageProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ChatMessageBehaviorProps>;

  /** Menu with actions of the message. */
  actionMenu?: ShorthandValue<MenuProps> | ShorthandCollection<MenuItemProps>;

  /** Controls messages's relation to other chat messages. Is automatically set by the ChatItem. */
  attached?: boolean | 'top' | 'bottom';

  /** Author of the message. */
  author?: ShorthandValue<TextProps>;

  /** Indicates whether message belongs to the current user. */
  mine?: boolean;

  /** Timestamp of the message. */
  timestamp?: ShorthandValue<TextProps>;

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

  /** Allows suppression of action menu positioning for performance reasons */
  positionActionMenu?: boolean;

  /** Reaction group applied to the message. */
  reactionGroup?: ShorthandValue<ReactionGroupProps> | ShorthandCollection<ReactionProps>;

  /** A message can format the reactions group to appear at the start or the end of the message. */
  reactionGroupPosition?: 'start' | 'end';

  /** Positions an actionMenu slot in "fixed" mode. */
  unstable_overflow?: boolean;
}

export type ChatMessageStylesProps = Pick<ChatMessageProps, 'attached' | 'badgePosition' | 'mine'> & {
  focused: boolean;
  hasBadge: boolean;
  hasReactionGroup: boolean;
};

const ChatMessage: React.FC<WithAsProp<ChatMessageProps>> &
  FluentComponentStaticProps<ChatMessageProps> & {
    slotClassNames: ChatMessageSlotClassNames;
  } = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(ChatMessage.displayName, context.telemetry);
  setStart();

  const parentAttached = useContextSelector(ChatItemContext, v => v.attached);
  const {
    accessibility,
    actionMenu,
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
    unstable_overflow: overflow,
  } = props;

  const [focused, setFocused] = React.useState<boolean>(false);
  const [messageNode, setMessageNode] = React.useState<HTMLElement | null>(null);

  const menuRef = React.useRef<HTMLElement>();
  const updateActionsMenuPosition = React.useRef<(() => void) | null>(null);

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
        if (messageNode) {
          messageNode.focus();
          event.stopPropagation();
        }
      },
    },
  });
  const { classes, styles: resolvedStyles } = useStyles<ChatMessageStylesProps>(ChatMessage.displayName, {
    className: ChatMessage.className,
    mapPropsToStyles: () => ({
      attached,
      badgePosition,
      focused,
      mine,
      hasBadge: !!badge,
      hasReactionGroup: !!reactionGroup,
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
    _.invoke(updateActionsMenuPosition, 'current');

    setFocused(true);
    _.invoke(props, 'onFocus', e, props);
  };

  const handleBlur = (e: React.SyntheticEvent) => {
    // `focused` controls is focused the whole `ChatMessage` or any of its children. When we're navigating
    // with keyboard the focused element will be changed and there is no way to use `:focus` selector
    const shouldPreserveFocusState = _.invoke(e, 'currentTarget.contains', (e as any).relatedTarget);

    setFocused(shouldPreserveFocusState);
    _.invoke(props, 'onBlur', e, props);
  };

  const handleMouseEnter = (e: React.SyntheticEvent) => {
    _.invoke(updateActionsMenuPosition, 'current');
    _.invoke(props, 'onMouseEnter', e, props);
  };

  const renderActionMenu = () => {
    const actionMenuElement = Menu.create(actionMenu, {
      defaultProps: () => ({
        [IS_FOCUSABLE_ATTRIBUTE]: true,
        accessibility: menuAsToolbarBehavior,
        className: ChatMessage.slotClassNames.actionMenu,
        styles: resolvedStyles.actionMenu,
      }),
    });

    if (!actionMenuElement) {
      return actionMenuElement;
    }

    const messageRect: DOMRect | undefined = positionActionMenu && messageNode?.getBoundingClientRect();
    const overflowPadding: PopperJs.Padding = { top: Math.round(messageRect?.height || 0) };

    return (
      <Popper
        enabled={positionActionMenu}
        align="end"
        modifiers={
          positionActionMenu && {
            // https://popper.js.org/popper-documentation.html#modifiers..flip.behavior
            // Forces to flip only in "top-*" positions
            flip: { behavior: ['top'] },
            preventOverflow: {
              escapeWithReference: false,
              // https://popper.js.org/popper-documentation.html#modifiers..preventOverflow.priority
              // Forces to stop prevent overflow on bottom and bottom
              priority: ['left', 'right'],

              // Is required to properly position action items
              ...(overflow && {
                boundariesElement: 'scrollParent',
                padding: overflowPadding,
              }),
            },
          }
        }
        position="above"
        positionFixed={overflow}
        targetRef={messageNode}
      >
        {({ scheduleUpdate }) => {
          updateActionsMenuPosition.current = scheduleUpdate;

          return <Ref innerRef={menuRef}>{actionMenuElement}</Ref>;
        }}
      </Popper>
    );
  };

  const childrenPropExists = childrenExist(children);
  const rootClasses = childrenPropExists ? cx(classes.root, classes.content) : classes.root;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ChatMessage.handledProps, props);

  const badgeElement = Label.create(badge, {
    defaultProps: () => ({
      className: ChatMessage.slotClassNames.badge,
      styles: resolvedStyles.badge,
    }),
  });

  const reactionGroupElement = Reaction.Group.create(reactionGroup, {
    defaultProps: () => ({
      className: ChatMessage.slotClassNames.reactionGroup,
      styles: resolvedStyles.reactionGroup,
    }),
  });

  const actionMenuElement = renderActionMenu();

  const authorElement = Text.create(author, {
    defaultProps: () => ({
      size: 'small',
      styles: resolvedStyles.author,
      className: ChatMessage.slotClassNames.author,
    }),
  });

  const timestampElement = Text.create(timestamp, {
    defaultProps: () => ({
      size: 'small',
      styles: resolvedStyles.timestamp,
      timestamp: true,
      className: ChatMessage.slotClassNames.timestamp,
    }),
  });

  const messageContent = Box.create(content, {
    defaultProps: () => ({
      className: ChatMessage.slotClassNames.content,
      styles: resolvedStyles.content,
    }),
  });

  const element = (
    <Ref innerRef={setMessageNode}>
      {getA11Props.unstable_wrapWithFocusZone(
        <ElementType
          {...getA11Props('root', {
            className: rootClasses,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onMouseEnter: handleMouseEnter,
            ...rtlTextContainer.getAttributes({ forElements: [children] }),
            ...unhandledProps,
          })}
        >
          {childrenPropExists ? (
            children
          ) : (
            <>
              {actionMenuElement}
              {badgePosition === 'start' && badgeElement}
              {authorElement}
              {timestampElement}
              {reactionGroupPosition === 'start' && reactionGroupElement}
              {messageContent}
              {reactionGroupPosition === 'end' && reactionGroupElement}
              {badgePosition === 'end' && badgeElement}
            </>
          )}
        </ElementType>,
      )}
    </Ref>
  );
  setEnd();

  return element;
};

ChatMessage.className = 'ui-chat__message';
ChatMessage.displayName = 'ChatMessage';

ChatMessage.defaultProps = {
  accessibility: chatMessageBehavior,
  badgePosition: 'end',
  positionActionMenu: true,
  reactionGroupPosition: 'start',
};
ChatMessage.propTypes = {
  ...commonPropTypes.createCommon({ content: 'shorthand' }),
  actionMenu: customPropTypes.itemShorthand,
  attached: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'top' | 'bottom'>(['top', 'bottom'])]),
  author: customPropTypes.itemShorthand,
  badge: customPropTypes.itemShorthand,
  badgePosition: PropTypes.oneOf(['start', 'end']),
  mine: PropTypes.bool,
  timestamp: customPropTypes.itemShorthand,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseEnter: PropTypes.func,
  positionActionMenu: PropTypes.bool,
  reactionGroup: PropTypes.oneOfType([customPropTypes.collectionShorthand, customPropTypes.itemShorthand]),
  reactionGroupPosition: PropTypes.oneOf(['start', 'end']),
  unstable_overflow: PropTypes.bool,
};
ChatMessage.handledProps = Object.keys(ChatMessage.propTypes) as any;

ChatMessage.create = createShorthandFactory({ Component: ChatMessage, mappedProp: 'content' });
ChatMessage.slotClassNames = {
  actionMenu: `${ChatMessage.className}__actions`,
  author: `${ChatMessage.className}__author`,
  timestamp: `${ChatMessage.className}__timestamp`,
  badge: `${ChatMessage.className}__badge`,
  content: `${ChatMessage.className}__content`,
  reactionGroup: `${ChatMessage.className}__reactions`,
};

/**
 * A ChatMessage represents a single message in chat.
 */
export default withSafeTypeForAs<typeof ChatMessage, ChatMessageProps>(ChatMessage);
