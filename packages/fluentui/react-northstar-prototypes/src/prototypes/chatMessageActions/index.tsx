import {
  Chat,
  Provider,
  Avatar,
  ChatMessageProps,
  ShorthandCollection,
  ReactionProps,
  Button,
} from '@fluentui/react-northstar';

import * as React from 'react';
import ReactionPopup from './ReactionPopup';
import { Ref } from '@fluentui/react-component-ref';
import { AcceptIcon, EmojiIcon, LikeIcon } from '@fluentui/react-icons-northstar';
import { keyboardKey, chatBehavior, menuAsToolbarBehavior, chatMessageBehavior } from '@fluentui/accessibility';
import { PortalInner } from '@fluentui/react-northstar/src/components/Portal/PortalInner';

const chatBehaviorOverride: any = () => {
  const behavior = chatBehavior();

  // doesn't work when chat message get only focus event
  behavior.focusZone.props.shouldEnterInnerZone = event => false;
  return behavior;
};

const chatMessageBehaviorOverride: any = () => {
  const behavior = chatMessageBehavior();

  behavior.focusZone.props.isCircularNavigation = false;
  return behavior;
};

const reactions: ShorthandCollection<ReactionProps> = [
  {
    icon: <LikeIcon />,
    content: '1K',
    key: 'likes',
    variables: { meReacting: true },
    children: (Component, props) => <ReactionPopup {...props} />,
  },
  {
    icon: <EmojiIcon />,
    content: 2,
    key: 'smiles',
    children: (Component, props) => <ReactionPopup {...props} />,
  },
];

const robinAvatar = {
  image: 'public/images/avatar/RobinCounts.jpg',
  status: { color: 'green', icon: <AcceptIcon /> },
};

const ChatMessageActions = () => {
  return (
    <div>
      <input placeholder="type message here" />
      <button> set focus </button>
      <Provider
        theme={{
          componentStyles: {
            ChatMessage: {
              root: ({ props: p, theme: { siteVariables } }) => ({
                '& a': {
                  color: siteVariables.colors.brand[600],
                },
              }),
            },
            Menu: {
              root: {
                background: '#fff',
                transition: 'opacity 0.2s',
                position: 'absolute',

                '& a:focus': {
                  textDecoration: 'none',
                  color: 'inherit',
                },
                '& a': {
                  color: 'inherit',
                },

                '& .smile-emoji': {
                  position: 'absolute',
                  opacity: 0,
                  zIndex: -1,
                },

                '&.focused .smile-emoji': {
                  position: 'initial',
                  zIndex: 'initial',
                  opacity: 1,
                },

                '&:hover .smile-emoji': {
                  position: 'initial',
                  zIndex: 'initial',
                  opacity: 1,
                },
              },
            },
          },
        }}
      >
        <Chat
          accessibility={chatBehaviorOverride}
          items={[
            {
              key: 'a',
              message: (
                <TeamsChatMessage
                  author="Robin"
                  content={
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  }
                  reactionGroup={{
                    items: reactions,
                  }}
                  timestamp="Yesterday, 10:15 PM"
                />
              ),
              gutter: <Avatar {...robinAvatar} />,
            },
            {
              key: 'b',
              message: (
                <TeamsChatMessage
                  author="Mike"
                  content={
                    <div>
                      <a href="/">Link</a> Hover me to see the actions <a href="/">Some Link</a>
                    </div>
                  }
                  reactionGroup={{
                    items: reactions,
                  }}
                  timestamp="Yesterday, 10:15 PM"
                />
              ),
              gutter: <Avatar {...robinAvatar} />,
            },
          ]}
        />
      </Provider>
      <input placeholder="type message here" />
    </div>
  );
};

const TeamsChatMessage: React.FC<ChatMessageProps> = (messageProps: ChatMessageProps) => {
  const [showPopover, setShowPopover] = React.useState<EventSource | string>(null);
  const [triggerEvent, setTriggerEvent] = React.useState<any>(null);

  const popoverRef = React.useRef(null);
  const buttonRef = React.useRef<HTMLElement>();
  const messageRef = React.useRef<HTMLElement>();

  const handleKeyDownOnMessage = e => {
    const focusableElements = popoverRef.current.querySelectorAll('[tabindex="0"],[tabindex="-1"]');

    if (e.keyCode === keyboardKey.Enter) {
      focusableElements[0].focus();
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.keyCode === keyboardKey.Tab) {
      const focusableElementsInsideMessage = e.currentTarget.querySelectorAll('[tabindex="-1"]');
      if (e.shiftKey) {
        const firstElement = focusableElementsInsideMessage[0];
        if (e.target === firstElement) {
          focusableElements[0].focus();
          e.stopPropagation();
          e.preventDefault();
        }
      } else {
        const lastElement = focusableElementsInsideMessage[focusableElementsInsideMessage.length - 1];
        if (e.target === lastElement) {
          focusableElements[0].focus();
          e.stopPropagation();
          e.preventDefault();
        }
      }
    }
  };

  const handleKeyDownOnActionMenu = e => {
    if (e.keyCode === keyboardKey.Tab) {
      const getElementTabbableElements: NodeListOf<HTMLElement> = messageRef.current.querySelectorAll(
        '[tabindex="-1"]:not([data-is-focusable="false"])',
      );

      if (e.shiftKey) {
        getElementTabbableElements[getElementTabbableElements.length - 1].focus();
      } else {
        getElementTabbableElements[0].focus();
      }
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleMouseEnterOnMessage = e => {
    show('mouse', e);
  };

  const handleBlurOnMessage = (e: any) => {
    e.stopPropagation();
    e.preventDefault();

    console.log('currentTarget:');
    console.log(e.currentTarget);
    console.log('relatedTarget:');
    console.log(e.relatedTarget);
    const messageElement = e.currentTarget as HTMLElement;
    const nextFocusedElement = e.relatedTarget as HTMLElement;
    const shouldPreserveFocusState = messageElement.contains(nextFocusedElement);
    // when voiceOver keys are used then 'relatedTarget' is null
    if (!nextFocusedElement) {
      return;
    }
    if (!shouldPreserveFocusState) {
      hide('focus');
    }
  };

  const getPopoverItems = (props: ChatMessageProps) => {
    return [
      { key: 'emoji', icon: 'emoji', 'aria-label': 'Emoji', 'data-tab-stop': 'first' },
      {
        key: props.author === 'Mike' ? 'Mike' : 'Robin',
        content: props.author === 'Mike' ? 'Mike' : 'Robin',
        'aria-label': 'Lock',
      },

      {
        key: 'more',
        icon: 'more',
        'aria-label': 'More options',
        'data-tab-stop': 'last',
        menu: ['Save', 'Edit', { content: 'Remove', menu: ['1', '2', '3'] }],
      },
    ];
  };

  const popoverBehavior = (shouldFocusOnMount: boolean) => (props: any) => {
    const behavior = menuAsToolbarBehavior();
    behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
      return root.querySelector('[aria-label="Emoji"]');
    };
    behavior.focusZone.props.shouldFocusOnMount = shouldFocusOnMount;
    return behavior;
  };

  const actionMenu = (
    Component: any,
    props: any,
    messageProps: ChatMessageProps,
    // showPopover: EventSource,
    // setShowPopover: React.Dispatch<React.SetStateAction<EventSource>>,
    showPopover: any,
    setShowPopover: any,
    buttonRef: React.MutableRefObject<HTMLElement>,
  ) => {
    console.log(`show popover variable: ${showPopover}`);

    return !showPopover || showPopover === 'button' ? (
      <div>
        <Ref innerRef={buttonRef}>
          <Button
            id="hidden-button"
            data-is-focusable={false}
            aria-expanded={!!showPopover}
            tabIndex={-1}
            aria-label={`Open actions toolbar for ${messageProps.author}`}
            onClick={() => setShowPopover('button')}
            iconOnly
            styles={{ opacity: 0, width: '0px', height: '0px' }}
          />
        </Ref>
        {!!showPopover && (
          // <PortalInner mountNode={messageRef.current}>
          <PortalInner>
            <Ref innerRef={popoverRef}>
              <Component
                onKeyDown={handleKeyDownOnActionMenu}
                // accessibility={popoverBehavior(showPopover === 'button')}
                items={getPopoverItems(messageProps)}
                {...props}
              />
            </Ref>
          </PortalInner>
        )}
      </div>
    ) : (
      // <PortalInner mountNode={messageRef.current}>
      <PortalInner>
        <Ref innerRef={popoverRef}>
          <Component onKeyDown={handleKeyDownOnActionMenu} items={getPopoverItems(messageProps)} {...props} />
        </Ref>
      </PortalInner>
    );
  };

  const handleFocusOnMessage = (show, e) => {
    console.log(`onFocus called on message`);
    show('focus', e);
  };

  const show = (es: any, event: React.SyntheticEvent<HTMLElement, Event>) => {
    console.log(`event source: ${es}`);

    if (event && event.target && es === 'focus') {
      const targetElement = event.target as HTMLElement;
      if (!targetElement.matches(`.ui-chat__message`)) {
        console.log('not on message element, return');
        return;
      }
    }

    if (triggerEvent === null) {
      setTriggerEvent(es);
    }
    setShowPopover(es);
  };

  const hide = (es: any) => {
    // if the popover was open by focus, it can be closed only by focus
    if (triggerEvent === 'focus' && es !== 'focus') {
      return;
    }
    // WARNING: do not use global document
    if (messageRef.current) {
      // const maybeActionMenu = messageRef.current.querySelector(`.${Chat.Message.slotClassNames.actionMenu}`);
      // if (maybeActionMenu && maybeActionMenu.contains(document.activeElement)) {
      //   // do not hide popover if it is focused
      //   return;
      // }
    }
    setTriggerEvent(null);
    setShowPopover(null);
  };

  return (
    <Ref innerRef={messageRef}>
      <Chat.Message
        accessibility={chatMessageBehaviorOverride}
        role="group"
        aria-label="tempary label"
        renderOutsideDomOrder={true}
        {...messageProps}
        actionMenu={{
          accessibility: popoverBehavior(showPopover === 'button'),
          children: (Component, props) =>
            actionMenu(Component, props, messageProps, showPopover, setShowPopover, buttonRef),
        }}
        onFocus={e => handleFocusOnMessage(show, e)}
        onBlur={e => handleBlurOnMessage(e)}
        onMouseEnter={e => handleMouseEnterOnMessage(e)}
        onMouseLeave={() => hide('mouse')}
        onKeyDown={e => handleKeyDownOnMessage(e)}
      />
    </Ref>
  );
};

export default ChatMessageActions;
