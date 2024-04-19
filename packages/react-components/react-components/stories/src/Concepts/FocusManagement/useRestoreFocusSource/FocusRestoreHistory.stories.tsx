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

export const FocusRestoreHistory = () => {
  const styles = useStyles();
  const restoreFocusSourceAttribute = useRestoreFocusSource();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
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
      <Button {...restoreFocusTargetAttribute}>Send message</Button>
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

FocusRestoreHistory.parameters = {
  docs: {
    description: {
      story: [
        'Target elements are stored in a limited history. In this example try to submit the feedback in reverse order.',
        'The first feedback button is a restore target, so once the second feedback is submitted focus is restored',
        'to the first feedback button. Likewise once the first feedback is submitted, focus will be restored to the',
        'send button.',
      ].join('\n'),
    },
  },
};
