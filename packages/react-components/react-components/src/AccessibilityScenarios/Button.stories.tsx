import * as React from 'react';

import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const MessengerButtonsAccessibilityScenario: React.FunctionComponent = () => {
  const [sendButtonDisabled, setSendButtonDisabled] = React.useState<boolean | undefined>(true);
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
    setSendButtonDisabled(true);
    setDeleteButtonDisabled(true);
  };

  const onSendButtonClick = () => {
    resetMessage();
    setStatusText('Message has been sent.');
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
      setSendButtonDisabled(undefined);
      setDeleteButtonDisabled(undefined);
      setStatusText('');
    } else {
      setSendButtonDisabled(true);
      setDeleteButtonDisabled(true);
    }
    setMessage(value);
  };

  return (
    <Scenario pageTitle="Messenger buttons">
      <Button disabledFocusable={sendButtonDisabled} onClick={onSendButtonClick}>
        Send
      </Button>
      <Button disabledFocusable={deleteButtonDisabled} onClick={onDeleteButtonClick}>
        Delete
      </Button>
      <Button ref={increaseFontButtonRef} disabled={increaseFontButtonDisabled} onClick={onIncreaseFontButtonClick}>
        Increase font size
      </Button>
      <Button ref={decreaseFontButtonRef} disabled={decreaseFontButtonDisabled} onClick={onDecreaseFontButtonClick}>
        Decrease font size
      </Button>
      <div>
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
      </div>
      <p>
        <span aria-live="polite">{statusText}</span>
      </p>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Messenger buttons',
  id: 'button-accessibility-scenario',
};
