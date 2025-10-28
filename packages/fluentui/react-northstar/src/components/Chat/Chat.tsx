import { Accessibility, chatBehavior, ChatBehaviorProps } from '@fluentui/accessibility';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  wrapWithFocusZone,
  useFluentContext,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { FluentComponentStaticProps, ShorthandCollection } from '../../types';
import {
  ChildrenComponentProps,
  childrenExist,
  commonPropTypes,
  createShorthandFactory,
  rtlTextContainer,
  UIComponentProps,
} from '../../utils';
import { defaultChatDensity, ChatDensity, ChatDensityContextProvider } from './chatDensityContext';
import { ChatItem, ChatItemProps } from './ChatItem';
import { ChatMessage } from './ChatMessage';
import { ChatMessageDetails } from './ChatMessageDetails';
import { ChatMessageHeader } from './ChatMessageHeader';
import { ChatMessageReadStatus } from './ChatMessageReadStatus';

export interface ChatSlotClassNames {
  item: string;
}

export interface ChatProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ChatBehaviorProps>;

  /** Chat density. */
  density?: ChatDensity;

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandCollection<ChatItemProps>;
}

export type ChatStylesProps = Pick<ChatProps, 'density'>;
export const chatClassName = 'ui-chat';
export const chatSlotClassNames: ChatSlotClassNames = {
  item: `${chatClassName}__item`,
};

/**
 * A Chat displays messages from a conversation between multiple users.
 */
export const Chat = React.forwardRef<HTMLUListElement, ChatProps>((props, ref) => {
  const context = useFluentContext();

  const {
    accessibility = chatBehavior,
    children,
    className,
    density = defaultChatDensity,
    design,
    items,
    styles,
    variables,
  } = props;

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });
  const { classes } = useStyles<ChatStylesProps>(Chat.displayName, {
    className: chatClassName,
    mapPropsToStyles: () => ({ density }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props, 'ul');
  const unhandledProps = useUnhandledProps(Chat.handledProps, props);

  const element = wrapWithFocusZone(
    a11yBehavior,
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <ChatDensityContextProvider value={density}>
        {childrenExist(children)
          ? children
          : _.map(items, item =>
              ChatItem.create(item, {
                defaultProps: () => ({ className: chatSlotClassNames.item }),
              }),
            )}
      </ChatDensityContextProvider>
    </ElementType>,
  );

  return element;
}) as unknown as ForwardRefWithAs<'ul', HTMLUListElement, ChatProps> &
  FluentComponentStaticProps<ChatProps> & {
    Item: typeof ChatItem;
    Message: typeof ChatMessage;
    MessageDetails: typeof ChatMessageDetails;
    MessageReadStatus: typeof ChatMessageReadStatus;
    MessageHeader: typeof ChatMessageHeader;
  };

Chat.displayName = 'Chat';

Chat.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: PropTypes.arrayOf(customPropTypes.itemShorthand),
  density: PropTypes.oneOf<ChatDensity>(['comfy', 'compact']),
};
Chat.handledProps = Object.keys(Chat.propTypes) as any;

Chat.Item = ChatItem;
Chat.Message = ChatMessage;
Chat.MessageHeader = ChatMessageHeader;
Chat.MessageDetails = ChatMessageDetails;
Chat.MessageReadStatus = ChatMessageReadStatus;

Chat.create = createShorthandFactory({ Component: Chat });
