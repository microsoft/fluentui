# Utilities/Focus Management/useRestoreFocusSource

The hooks `useRestoreFocusSource` and `useRestoreFocusTarget` are intended to be used together, but without tight
coupling.

When the attribute returned by `useRestoreFocusSource` is applied to an element, it will be ready to restore focus
to the last 'bookmarked' element that was set using `useRestoreFocusTarget`. The restore focus target
**needs to be focused** before focus is lost from a source. This is to prevent focus randomly jumping across
an application but being restored to the an element at the closest point in time.

The examples below simulate a feedback experience. One a user submits feedback, the control will be removed from
the page and the focus will need to revert from the body (since the focused element was removed).

## Examples

### Default

```tsx
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
```

### Focus Restore History

Target elements are stored in a limited history. In this example try to submit the feedback in reverse order.
The first feedback button is a restore target, so once the second feedback is submitted focus is restored
to the first feedback button. Likewise once the first feedback is submitted, focus will be restored to the
send button.

```tsx
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
```

### User Restore Focus

If the user manually moves focus to a desired element, then the utility **will not move focus**.
The focus will only be restored if it is lost to the `document body`.

This example is similar to the previous. However, submitting the second feedback will manually move
focus to the 'Send message' button. This bypasses the restore focus history, which should restore
focus to the first feedback button.

```tsx
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
```
