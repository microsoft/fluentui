import { Steps } from 'storywright';
import { makeStyles } from '@griffel/react';

export const buttonId = 'button-id';

export const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const steps = new Steps()
  .snapshot('default')
  .hover('#button-id')
  .snapshot('hover')
  .mouseDown('#button-id')
  .snapshot('pressed')
  .end();
