import { Accessibility, Menu, menuAsToolbarBehavior } from '@fluentui/react-northstar';
import {
  BookmarkIcon,
  TranslationIcon,
  EmojiIcon,
  LinkIcon,
  LikeIcon,
  MoreIcon,
} from '@fluentui/react-icons-northstar';
import * as React from 'react';
import cx from 'classnames';

export interface PopoverProps {
  className?: string;
  onForceShowActionMenuChange?: (val: boolean) => void;
  onShowActionMenuChange?: (val: boolean) => void;
  chatMessageElement?: HTMLElement;
}

interface PopoverState {
  focused: boolean;
}

const popoverBehavior: Accessibility = () => {
  const behavior = menuAsToolbarBehavior();

  behavior.focusZone.props.defaultTabbableElement = (root: HTMLElement): HTMLElement => {
    return root.querySelector('[aria-label="thumbs up"]');
  };

  return behavior;
};

class Popover extends React.Component<PopoverProps, PopoverState> {
  state = {
    focused: false,
  };

  handleFocus = () => this.setState({ focused: true });

  handleBlur = e => {
    this.setState({ focused: e.currentTarget.contains(e.relatedTarget) });
  };

  handleActionableItemClick = e => {
    const { onShowActionMenuChange, chatMessageElement } = this.props;
    onShowActionMenuChange(false);
    // Currently when the action menu is closed because of some actionable item is clicked, we focus the ChatMessage
    // this was not in the spec, so it may be changed if the requirement is different
    e.type === 'keydown' && chatMessageElement && chatMessageElement.focus();
  };

  render() {
    const { onShowActionMenuChange, onForceShowActionMenuChange, ...rest } = this.props;
    delete rest.chatMessageElement;
    return (
      <Menu
        {...rest}
        accessibility={popoverBehavior}
        iconOnly
        className={cx(this.props.className, this.state.focused ? 'focused' : '')}
        items={[
          {
            icon: <EmojiIcon />,
            key: 'smile',
            className: 'smile-emoji',
            'aria-label': 'smile one',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'smile2',
            icon: <EmojiIcon />,
            className: 'smile-emoji',
            'aria-label': 'smile two',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'smile3',
            icon: <EmojiIcon />,
            className: 'smile-emoji',
            'aria-label': 'smile three',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'a',
            icon: <LikeIcon />,
            'aria-label': 'thumbs up',
            onClick: this.handleActionableItemClick,
          },
          {
            key: 'c',
            icon: <MoreIcon />,
            onMenuOpenChange: (e, { menuOpen }) => {
              onShowActionMenuChange(true);
              onForceShowActionMenuChange(menuOpen);
            },
            'aria-label': 'more options',
            indicator: false,
            menu: {
              pills: true,
              items: [
                { key: 'bookmark', icon: <BookmarkIcon />, content: 'Save this message' },
                { key: 'linkify', icon: <LinkIcon />, content: 'Copy link' },
                { key: 'translate', icon: <TranslationIcon />, content: 'Translate' },
              ],
            },
          },
        ]}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        data-is-focusable={true}
      />
    );
  }
}

export default Popover;
