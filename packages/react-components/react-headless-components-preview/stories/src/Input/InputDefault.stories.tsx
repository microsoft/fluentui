import * as React from 'react';
import { Input } from '@fluentui/react-headless-components-preview/input';
import { AddRegular, MicRegular, MicPulseRegular, SendRegular } from '@fluentui/react-icons';

import chatStyles from './chat-input.module.css';
import storySource from './InputDefault.stories?raw';
import { withStorySource } from '../_helpers/withStorySource';
export const Default = (): React.ReactNode => {
  const [value, setValue] = React.useState('');
  const hasText = value.trim().length > 0;
  return (
    <div className={chatStyles.demo}>
      <Input
        className={chatStyles.chat}
        input={{
          className: chatStyles.chatField,
          value,
          onChange: e => setValue((e.target as HTMLInputElement).value),
          placeholder: 'Ask anything…',
          'aria-label': 'Chat input',
        }}
        contentBefore={{
          className: chatStyles.chatLeading,
          children: (
            <button type="button" className={chatStyles.iconBtn} aria-label="Add attachment">
              <AddRegular />
            </button>
          ),
        }}
        contentAfter={{
          className: chatStyles.chatTrailing,
          children: (
            <>
              <button type="button" className={chatStyles.iconBtn} aria-label="Voice input">
                <MicRegular />
              </button>
              <button
                type="button"
                className={`${chatStyles.iconBtn} ${chatStyles.send}`}
                aria-label={hasText ? 'Send message' : 'Live waveform'}
                disabled={!hasText && false}
              >
                {hasText ? <SendRegular /> : <MicPulseRegular />}
              </button>
            </>
          ),
        }}
      />
    </div>
  );
};

Default.parameters = withStorySource(storySource);
