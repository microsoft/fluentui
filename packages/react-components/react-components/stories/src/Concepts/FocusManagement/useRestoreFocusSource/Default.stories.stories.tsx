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

export const Default = () => {
  const styles = useStyles();
  const restoreFocusSourceAttribute = useRestoreFocusSource();
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
  const [feedbackSent, setFeedbackSent] = React.useState(false);

  React.useEffect(() => {
    if (feedbackSent) {
      const timeout = setTimeout(() => setFeedbackSent(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [feedbackSent]);

  return (
    <div>
      <Field label="Compose message" className={styles.field}>
        <Textarea />
      </Field>
      <br />
      <Button {...restoreFocusTargetAttribute}>Send message</Button>
      {!feedbackSent ? (
        <div {...restoreFocusSourceAttribute} className={styles.feedback}>
          How was your experience completing this task?
          <Button
            appearance="subtle"
            onClick={() => setFeedbackSent(true)}
            icon={<ThumbLikeRegular />}
            aria-label="Like"
          />
          <Button
            appearance="subtle"
            onClick={() => setFeedbackSent(true)}
            icon={<ThumbDislikeRegular />}
            aria-label="Dislike"
          />
        </div>
      ) : (
        <div>Thanks for submitting feedback!</div>
      )}
    </div>
  );
};
