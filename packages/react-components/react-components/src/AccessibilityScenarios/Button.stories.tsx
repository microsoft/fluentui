import * as React from 'react';

import { Button } from '@fluentui/react-components';

import { Scenario } from './utils';

export const MessengerButtons: React.FunctionComponent = () => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState<boolean | undefined>(true);
  const [increaseFontButtonDisabled, setIncreaseFontButtonDisabled] = React.useState<boolean | undefined>(undefined);
  const [decreaseFontButtonDisabled, setDecreaseFontButtonDisabled] = React.useState<boolean | undefined>(true);
  const [fontSizeIndex, setFontSizeIndex] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [statusText, setStatusText] = React.useState('');

  const increaseFontButtonRef = React.useRef<HTMLButtonElement>(null);
  const decreaseFontButtonRef = React.useRef<HTMLButtonElement>(null);

  const possibleFontSizes = ['100%', '140%', '180%'];
  const messageStyle = {
    fontSize: possibleFontSizes[fontSizeIndex],
  };

  const resetMessage = () => {
    setMessage('');
    setDeleteButtonDisabled(true);
  };

  const onSendButtonClick = () => {
    if (message.length > 0) {
      setStatusText('Message has been sent.');
    } else {
      setStatusText('Please type a message.');
    }
    resetMessage();
  };
  const onDeleteButtonClick = () => {
    resetMessage();
  };
  const onIncreaseFontButtonClick = () => {
    if (fontSizeIndex < possibleFontSizes.length - 1) {
      if (fontSizeIndex === possibleFontSizes.length - 2) {
        setIncreaseFontButtonDisabled(true);
        decreaseFontButtonRef.current!.focus();
      } else if (fontSizeIndex === 0) {
        setDecreaseFontButtonDisabled(undefined);
      }
      setFontSizeIndex(fontSizeIndex + 1);
    }
  };
  const onDecreaseFontButtonClick = () => {
    if (fontSizeIndex > 0) {
      if (fontSizeIndex === possibleFontSizes.length - 1) {
        setIncreaseFontButtonDisabled(undefined);
      } else if (fontSizeIndex === 1) {
        setDecreaseFontButtonDisabled(true);
        increaseFontButtonRef.current!.focus();
      }
      setFontSizeIndex(fontSizeIndex - 1);
    }
  };
  const onMessageTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length > 0) {
      setDeleteButtonDisabled(undefined);
      setStatusText('');
    } else {
      setDeleteButtonDisabled(true);
    }
    setMessage(value);
  };

  return (
    <Scenario pageTitle="Messenger buttons">
      <Button ref={increaseFontButtonRef} disabled={increaseFontButtonDisabled} onClick={onIncreaseFontButtonClick}>
        Increase font size
      </Button>
      <Button ref={decreaseFontButtonRef} disabled={decreaseFontButtonDisabled} onClick={onDecreaseFontButtonClick}>
        Decrease font size
      </Button>
      <textarea
        name="message"
        rows={3}
        cols={50}
        placeholder="Enter message here...."
        aria-label="Message"
        onChange={onMessageTextareaChange}
        value={message}
        style={messageStyle}
      />
      <Button onClick={onSendButtonClick}>Send</Button>
      <Button disabledFocusable={deleteButtonDisabled} onClick={onDeleteButtonClick}>
        Delete
      </Button>

      <p aria-live="polite">{statusText}</p>
    </Scenario>
  );
};
