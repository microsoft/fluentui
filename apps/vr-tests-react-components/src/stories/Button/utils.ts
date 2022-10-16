import Screener from 'screener-storybook/src/screener';
import { makeStyles } from '@griffel/react';

export const buttonId = 'button-id';

export const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

export const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();
