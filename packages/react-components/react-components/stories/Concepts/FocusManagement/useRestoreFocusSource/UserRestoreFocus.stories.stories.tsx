import * as React from 'react';
import { ThumbLikeRegular, ThumbDislikeRegular } from '@fluentui/react-icons';
import {
  useRestoreFocusSource,
  useRestoreFocusTarget,
  Button,
  makeStyles,
  Textarea,
  Field,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  feedback: {
    display: 'flex',
    alignItems: 'center',
  },

  field: {
    width: '300px',
  },
});

export const UserRestoreFocus = () => {
  const styles = useStyles();
  const restoreFocusSourceAttribute = useRestoreFocusSource();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
  const sendButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [experienceFeedbackSent, setExperienceFeedbackSent] = React.useState(false);
  const [deliveryFeedbackSent, setDeliveryFeedbackSent] = React.useState(false);

  React.useEffect(() => {
    // reset example
    if (experienceFeedbackSent) {
      const timeout = setTimeout(() => setExperienceFeedbackSent(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [experienceFeedbackSent]);

  React.useEffect(() => {
    // reset example
    if (deliveryFeedbackSent) {
      sendButtonRef.current?.focus();
      const timeout = setTimeout(() => setDeliveryFeedbackSent(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [deliveryFeedbackSent]);

  return (
    <div>
      <Field label="Compose message" className={styles.field}>
        <Textarea />
      </Field>
      <br />
      <Button ref={sendButtonRef} {...restoreFocusTargetAttribute}>
        Send message
      </Button>
      {!experienceFeedbackSent ? (
        <>
          <div {...restoreFocusSourceAttribute} className={styles.feedback}>
            How was your experience completing this task?
            <Button
              {...restoreFocusTargetAttribute}
              appearance="subtle"
              onClick={() => setExperienceFeedbackSent(true)}
              icon={<ThumbLikeRegular />}
              aria-label="Like"
            />
            <Button
              appearance="subtle"
              onClick={() => setExperienceFeedbackSent(true)}
              icon={<ThumbDislikeRegular />}
              aria-label="Dislike"
            />
          </div>
        </>
      ) : (
        <div>Thanks for submitting feedback!</div>
      )}
      {!deliveryFeedbackSent ? (
        <>
          <div {...restoreFocusSourceAttribute} className={styles.feedback}>
            Was your message delivered successfully?
            <Button
              appearance="subtle"
              onClick={() => setDeliveryFeedbackSent(true)}
              icon={<ThumbLikeRegular />}
              aria-label="Like"
            />
            <Button
              appearance="subtle"
              onClick={() => setDeliveryFeedbackSent(true)}
              icon={<ThumbDislikeRegular />}
              aria-label="Dislike"
            />
          </div>
        </>
      ) : (
        <div>Thanks for submitting feedback!</div>
      )}
    </div>
  );
};

UserRestoreFocus.parameters = {
  docs: {
    description: {
      story: [
        'If the user manually moves focus to a desired element, then the utility **will not move focus**.',
        'The focus will only be restored if it is lost to the `document body`.',
        '',
        'This example is similar to the previous. However, submitting the second feedback will manually move',
        "focus to the 'Send message' button. This bypasses the restore focus history, which should restore",
        'focus to the first feedback button.',
      ].join('\n'),
    },
  },
};
