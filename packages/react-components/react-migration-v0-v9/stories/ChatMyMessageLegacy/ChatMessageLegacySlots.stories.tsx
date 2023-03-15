import * as React from 'react';
import { makeStyles, Button, shorthands, tokens } from '@fluentui/react-components';
import { EmojiSmileSlightRegular, Question20Regular } from '@fluentui/react-icons';
import { ChatLegacy, ChatMyMessageLegacy } from '../../src/index';

const useReactionStyles = makeStyles({
  button: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2),
    ...shorthands.borderRadius('13px'),
    backgroundColor: tokens.colorNeutralBackground1,
    fontSize: tokens.fontSizeBase200, // "12px"
    lineHeight: tokens.lineHeightBase200, // "16px"
    fontWeight: tokens.fontWeightRegular,

    paddingLeft: 0,
    paddingRight: 0,

    minWidth: '41px',
    height: '26px',
  },
  buttonIcon: {
    marginRight: '2px',
  },
});
const Reactions = () => {
  const styles = useReactionStyles();
  return (
    <Button
      icon={{
        className: styles.buttonIcon,
        children: <EmojiSmileSlightRegular fontSize={16} />,
      }}
      appearance="subtle"
      className={styles.button}
      aria-label="Smile"
    >
      1
    </Button>
  );
};

export const Slots = () => {
  return (
    <ChatLegacy>
      <ChatMyMessageLegacy body="Message body" />
      <ChatMyMessageLegacy details="Edited">Message with details</ChatMyMessageLegacy>
      <ChatMyMessageLegacy author="Ashley McCarthy">Message with author</ChatMyMessageLegacy>
      <ChatMyMessageLegacy decorationLabel="important!" decorationIcon={<Question20Regular />}>
        Message with decoration icon and label
      </ChatMyMessageLegacy>
      <ChatMyMessageLegacy timestamp="8:00 AM">Message with timestamp</ChatMyMessageLegacy>
      <ChatMyMessageLegacy reactions={<Reactions />}>Message with reactions</ChatMyMessageLegacy>
    </ChatLegacy>
  );
};

Slots.parameters = {
  component: ChatMyMessageLegacy,
};
