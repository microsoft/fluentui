import * as React from 'react';
import * as _ from 'lodash';
import { getCode, keyboardKey } from '@fluentui/accessibility';

import { Button, Flex, Input, Toolbar, Ref, Chat } from '@fluentui/react-northstar';
import { toolbarItems } from './mockData';
import classNames from './classNames';
import { SendIcon } from '@fluentui/react-icons-northstar';

const ThreadReplyEditor: React.FC = () => {
  const buttonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (editMode) {
      _.invoke(inputRef.current, 'focus');
    } else {
      _.invoke(buttonRef.current, 'focus');
    }
  }, [editMode]);

  const renderReplyButton = () => {
    return (
      <Ref innerRef={buttonRef}>
        <Button fluid className={classNames.threadReplies.trigger} content="Reply" onClick={() => setEditMode(true)} />
      </Ref>
    );
  };

  const handleOnEditorKeydown = (e: React.KeyboardEvent) => {
    const eventCode = getCode(e);
    if (eventCode === keyboardKey.Escape) {
      setEditMode(false);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const renderEditor = () => {
    return (
      <Chat.Message className={classNames.replyEditor} onKeyDown={handleOnEditorKeydown}>
        <Flex column>
          <Input fluid placeholder="Reply" inputRef={inputRef} />
          <Flex space="between">
            <Toolbar items={toolbarItems} aria-label="Editor tools" data-is-focusable={true} />
            <Flex gap="gap.small">
              <Button circular icon={<SendIcon />} iconOnly title="Send reply" text />
            </Flex>
          </Flex>
        </Flex>
      </Chat.Message>
    );
  };

  return editMode ? renderEditor() : renderReplyButton();
};

export default ThreadReplyEditor;
