import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-popover';
import type { Meta } from '@storybook/react-webpack5';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';

import styles from './Portal.module.css';

const steps = new Steps().click('#popoverTrigger').snapshot('should have green border').end();

export default {
  title: 'Portal',
  component: Portal,
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof Portal>;

const Example = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <button id="popoverTrigger">foo</button>
      </PopoverTrigger>
      <PopoverSurface>
        <button className={styles.canary}>should have green border</button>
      </PopoverSurface>
    </Popover>
  );
};

/**
 * CSS variable insertion can happen after the DOM is mounted.
 * This can accidentally trigger transitions on mount. The below example
 * adds a transition to the border. If the css variable insertion happens
 * after DOM is mounted, then the applied border colour should not be
 * visible in the screenshot since the transtion duration is 1000 seconds.
 */
export const ApplyClassNames = () => <Example />;
