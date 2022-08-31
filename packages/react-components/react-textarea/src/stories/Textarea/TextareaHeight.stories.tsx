import * as React from 'react';
import { makeStyles, tokens, useId, Label, Textarea } from '@fluentui/react-components';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      display: 'block',
      marginBottom: tokens.spacingVerticalMNudge,
    },
  },
  textarea: {
    height: '200px',
  },
});

export const Height = () => {
  const textareaId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Label htmlFor={textareaId}>Textarea with a height of 200px</Label>
      <Textarea resize="both" textarea={{ className: styles.textarea }} id={textareaId} />
    </div>
  );
};

Height.parameters = {
  docs: {
    description: {
      story: `When changing a Textarea's height, the classname with the styling should be given to the textarea element.
      Textarea has a wrapper that adds all the styling for the borders and an inner textarea element that handles all
      the interaction, the wrapper is only in charge of surrounding the textarea element.`,
    },
  },
};
