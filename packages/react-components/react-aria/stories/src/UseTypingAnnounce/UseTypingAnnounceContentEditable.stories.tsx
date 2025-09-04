import * as React from 'react';
import {
  AriaLiveAnnouncer,
  Field,
  JSXElement,
  makeStyles,
  tokens,
  useId,
  useTypingAnnounce,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  contentEditable: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: '4px',
    padding: '0.5em',
  },
});

const charCountMessage = (count: number) => {
  // the threshold for announcing character count updates is 10 characters
  const threshold = 10;

  // the maxLength is 100
  const maxLength = 100;

  if (count >= maxLength) {
    return `You have reached the maximum character limit, ${maxLength}`;
  } else if (maxLength - count === 1) {
    return `You have 1 character remaining`;
  } else if (maxLength - count <= threshold) {
    return `You have ${maxLength - count} characters remaining`;
  } else {
    return undefined;
  }
};

export const ContentEditable = (): JSXElement => {
  const [count, setCount] = React.useState(0);
  const styles = useStyles();

  const announceId = useId('charCount');

  const { typingAnnounce, inputRef } = useTypingAnnounce();

  const onInput = (ev: React.FormEvent<HTMLSpanElement>) => {
    const charCount = (ev.target as HTMLSpanElement).textContent?.length ?? 0;
    setCount(charCount);

    const message = charCountMessage(charCount);
    if (message) {
      // pass typingAnnounce a batchId to ensure new charCount updates override old ones
      typingAnnounce(message, { batchId: announceId });
    }
  };

  return (
    <AriaLiveAnnouncer>
      <Field label="A contenteditable div with a maxlength of 100" hint={`${count}/100`}>
        {fieldProps => (
          <span contentEditable ref={inputRef} onInput={onInput} className={styles.contentEditable} {...fieldProps} />
        )}
      </Field>
    </AriaLiveAnnouncer>
  );
};

ContentEditable.parameters = {
  docs: {
    description: {
      story: `Updates on remaining characters will begin being announced once you are within 10 characters of the max length.`,
    },
  },
};
