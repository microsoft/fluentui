import * as React from 'react';
import { InfoButton } from '@fluentui/react-infobutton';
import { Label, Input, makeStyles, shorthands, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('20px'),
    ...shorthands.gap('10px'),
  },
  labelSpacing: {
    display: 'flex',
    ...shorthands.gap('4px'),
  },
});

export const InfoButtonWithLabel = () => {
  const styles = useStyles();
  const infoButtonId = useId();
  const inputId = useId();
  const labelId = useId();

  return (
    <div className={styles.base}>
      <div className={styles.labelSpacing}>
        <Label id={labelId} htmlFor={inputId}>
          Enter your username
        </Label>
        <InfoButton
          id={infoButtonId}
          aria-labelledby={`${labelId} ${infoButtonId}`}
          content="Usernames offer a unique way to identify you and keep your account secure."
        />
      </div>
      <Input id={inputId} placeholder="Username" />
    </div>
  );
};

InfoButtonWithLabel.parameters = {
  docs: {
    description: {
      story:
        "An InfoButton's `aria-labelledby` should include the label's id to correctly" +
        ' associate the label with the InfoButton.',
    },
  },
};
