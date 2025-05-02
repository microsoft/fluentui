import * as React from 'react';
import { AriaLiveAnnouncer, Field, makeStyles, tokens, useId } from '@fluentui/react-components';
import { useTypingAnnounce } from '../../../library/src/useTypingAnnounce/useTypingAnnounce';

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
  } else return undefined;
};

export const ContentEditable = () => {
  const inputRef = React.useRef<HTMLSpanElement>(null);
  const [count, setCount] = React.useState(0);
  const styles = useStyles();

  const announceId = useId('charCount');

  const { typingAnnounce } = useTypingAnnounce(inputRef);

  const onInput = ev => {
    setCount(ev.target.textContent.length);

    const message = charCountMessage(ev.target.textContent.length);
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
