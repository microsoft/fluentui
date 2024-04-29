import * as React from 'react';
import { Ref, ChatMessageProps, Chat } from '@fluentui/react-northstar';
import { ParticipantAddIcon } from '@fluentui/react-icons-northstar';

interface ControlMessageProps {
  focused?: boolean;
  icon?: boolean;
  message: ChatMessageProps;
}
class ControlMessage extends React.Component<ControlMessageProps> {
  messageRef = React.createRef<HTMLElement>();

  componentDidMount() {
    if (this.props.focused && this.messageRef) {
      this.messageRef.current.focus();
    }
  }

  render() {
    return (
      <>
        {this.props.icon ? <ParticipantAddIcon /> : null}
        <Ref innerRef={this.messageRef}>
          <Chat.Message {...this.props.message} className="ui-chat__message_control" />
        </Ref>
      </>
    );
  }
}

export default ControlMessage;
