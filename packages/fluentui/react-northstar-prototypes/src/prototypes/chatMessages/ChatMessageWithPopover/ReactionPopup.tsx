import * as React from 'react';
import { keyboardKey } from '@fluentui/accessibility';
import { Popup, Menu, Reaction, ReactionProps } from '@fluentui/react-northstar';

const getAriaLabel = ({ content: numberOfPersons, icon: emojiType }: ReactionProps) => {
  if (numberOfPersons === 1) {
    return `One person reacted to this message with a ${emojiType} emoji. Open menu to see person who reacted.`;
  }
  return `${numberOfPersons} people reacted this message with a ${emojiType} emoji. Open menu to see people who reacted.`;
};

class ReactionPopup extends React.Component<ReactionProps, { open: boolean }> {
  state = {
    open: false,
  };

  handleKeyDownOnMenu = e => {
    if (e.keyCode === keyboardKey.Tab) {
      this.setState({ open: false });
    }
  };

  handleOpenChange = (e, { open }) => {
    this.setState({ open });
  };

  render() {
    return (
      <Popup
        autoFocus
        trigger={<Reaction as="button" aria-haspopup="true" {...this.props} aria-label={getAriaLabel(this.props)} />}
        content={{
          children: () => (
            <Menu
              items={['Robin Counts', 'Cecil Folk']}
              vertical
              variables={{ borderColor: 'transparent' }}
              onKeyDown={this.handleKeyDownOnMenu}
            />
          ),
        }}
        inline
        on="hover"
        position="below"
        open={this.state.open}
        onOpenChange={this.handleOpenChange}
      />
    );
  }
}

export default ReactionPopup;
