import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { Button } from '@fluentui/react-button';
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
  },
});

export const ApplyClassNames = () => {
  const styles = useStyles();
  return (
    <Popover>
      <PopoverTrigger>
        <button>foo</button>
      </PopoverTrigger>
      <PopoverSurface>
        <Button className={styles.canary}>should have green border</Button>
      </PopoverSurface>
    </Popover>
  );
};
