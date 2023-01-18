import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { tokens } from '@fluentui/react-theme';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import { makeStyles, shorthands } from '@griffel/react';
import { ComponentMeta } from '@storybook/react';
import { Steps } from 'storywright';
import { withStoryWrightSteps } from '../utilities/withStoryWrightSteps';

export const steps = new Steps()
  .mouseDown('button')
  .snapshot('should have green border', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Portal',
  Component: Portal,
  decorators: [story => withStoryWrightSteps({ story, steps })],
} as ComponentMeta<typeof Portal>;

const useStyles = makeStyles({
  canary: {
    ...shorthands.borderColor(tokens.colorPaletteGreenBackground2),
    ...shorthands.borderWidth('5px'),
    transitionDuration: '1000s',
    transitionProperty: 'border',
    transitionTimingFunction: tokens.curveEasyEase,
  },
});

/**
 * CSS variable insertion can happen after the DOM is mounted.
 * This can accidentally trigger transitions on mount. The below example
 * adds a transition to the border. If the css variable insertion happens
 * after DOM is mounted, then the applied border colour should not be
 * visible in the screenshot since the transtion duration is 1000 seconds.
 */
export const ApplyClassNames = () => {
  const styles = useStyles();
  return (
    <Popover>
      <PopoverTrigger>
        <button>foo</button>
      </PopoverTrigger>
      <PopoverSurface>
        <button className={styles.canary}>should have green border</button>
      </PopoverSurface>
    </Popover>
  );
};
