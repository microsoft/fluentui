import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { DecoratorFunction } from '@storybook/addons';
import { ExtendedStoryFnReturnType } from '../../utilities/types';
import { makeStyles } from '@griffel/react';

export const buttonId = 'button-id';

export const useStyles = makeStyles({
  longText: {
    width: '280px',
  },
});

const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

export const ButtonDecorator: DecoratorFunction<ExtendedStoryFnReturnType> = story => {
  return <Screener steps={steps}> {story()} </Screener>;
};
