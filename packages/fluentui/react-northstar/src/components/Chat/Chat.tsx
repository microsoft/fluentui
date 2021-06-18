import { Accessibility, chatBehavior, ChatBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
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
import { ChatItem, ChatItemProps } from './ChatItem';
import { ChatLayout, ChatLayoutContextProvider, defaultChatLayout } from './chatLayoutContext';
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

  /** Chat density layout. */
  layout?: ChatLayout;

  /** Shorthand array of the items inside the chat. */
  items?: ShorthandCollection<ChatItemProps>;
}

export type ChatStylesProps = Pick<ChatProps, 'layout'>;
export const chatClassName = 'ui-chat';
export const chatSlotClassNames: ChatSlotClassNames = {
  item: `${chatClassName}__item`,
};

/**
 * A Chat displays messages from a conversation between multiple users.
 */
export const Chat: ComponentWithAs<'ul', ChatProps> &
  FluentComponentStaticProps<ChatProps> & {
    Item: typeof ChatItem;
    Message: typeof ChatMessage;
    MessageDetails: typeof ChatMessageDetails;
    MessageReadStatus: typeof ChatMessageReadStatus;
    MessageHeader: typeof ChatMessageHeader;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Chat.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, design, items, layout, styles, variables } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: Chat.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<ChatStylesProps>(Chat.displayName, {
    className: chatClassName,
    mapPropsToStyles: () => ({ layout }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Chat.handledProps, props);

  const element = getA11Props.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ...rtlTextContainer.getAttributes({ forElements: [children] }),
        ...unhandledProps,
      })}
    >
      <ChatLayoutContextProvider value={layout}>
        {childrenExist(children)
          ? children
          : _.map(items, item =>
              ChatItem.create(item, {
                defaultProps: () => ({ className: chatSlotClassNames.item }),
              }),
            )}
      </ChatLayoutContextProvider>
    </ElementType>,
  );
  setEnd();

  return element;
};

Chat.displayName = 'Chat';

Chat.defaultProps = {
  accessibility: chatBehavior,
  as: 'ul',
  layout: defaultChatLayout,
};
Chat.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  items: PropTypes.arrayOf(customPropTypes.itemShorthand),
  layout: PropTypes.oneOf<ChatLayout>(['comfy', 'compact']),
};
Chat.handledProps = Object.keys(Chat.propTypes) as any;

Chat.Item = ChatItem;
Chat.Message = ChatMessage;
Chat.MessageHeader = ChatMessageHeader;
Chat.MessageDetails = ChatMessageDetails;
Chat.MessageReadStatus = ChatMessageReadStatus;

Chat.create = createShorthandFactory({ Component: Chat });
