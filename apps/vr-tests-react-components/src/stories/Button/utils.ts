import { Steps } from 'storywright';
import { makeStyles } from '@griffel/react';

export const buttonId = 'button-id';

export const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const steps = new Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();
