import * as React from 'react';
import * as _ from 'lodash';
import { getCode, keyboardKey } from '@fluentui/accessibility';

import { List, ChatMessageProps, Flex } from '@fluentui/react-northstar';
import ControlMessage from './ControlMessage';
import controlMessagesGroupBehavior from './controlMessagesGroupBehavior';
import { TriangleDownIcon, ParticipantAddIcon, TriangleEndIcon } from '@fluentui/react-icons-northstar';

type GroupControlMessagesProps = {
  items: ChatMessageProps[];
  mainMessage: ChatMessageProps;
};

const GroupControlMessages = (props: GroupControlMessagesProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  const renderItems = () => {
    const { items } = props;
    return _.map(items, (item, index) => {
      return {
        content: <ControlMessage message={item} />,
        key: `control-message-${index}`,
      };
    });
  };

  return (
    <Flex
      onKeyDown={e => {
        const eventCode = getCode(e);
        if (eventCode === keyboardKey.Enter) {
          setExpanded(true);
        }
        if (eventCode === keyboardKey.Escape) {
          setExpanded(false);
          setFocused(true);
        }
      }}
    >
      {expanded ? (
        <TriangleDownIcon onClick={() => setExpanded(!expanded)} />
      ) : (
        <TriangleEndIcon onClick={() => setExpanded(!expanded)} />
      )}
      <ParticipantAddIcon />
      {expanded ? (
        <List accessibility={controlMessagesGroupBehavior} items={renderItems()} aria-label={'control messages'} />
      ) : (
        <ControlMessage focused={focused} message={props.mainMessage} />
      )}
    </Flex>
  );
};

export default GroupControlMessages;
