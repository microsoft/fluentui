import { makeStyles, shorthands } from '@griffel/react';
import { Avatar } from '@fluentui/react-avatar';
import { Button } from '@fluentui/react-button';
import { Input } from '@fluentui/react-input';
import * as React from 'react';

import { ShadowRoot } from './utils';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    ...shorthands.gap('5px'),
    ...shorthands.padding('5px'),
  },
});

const ComponentSet: React.FC = () => {
  const classes = useClasses();

  return (
    <div>
      <div className={classes.container}>
        <Avatar name="Ashley McCarthy" />

        <Button>Hello world!</Button>
        <Button appearance="primary">Hello world!</Button>
        <Button appearance="subtle">Hello world!</Button>
      </div>

      <div className={classes.container}>
        <Input appearance="outline" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default {
  title: 'Shadow DOM',
  parameters: {
    storyWright: { steps: new Steps().snapshot('normal', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
};

export const Default = () => (
  <ShadowRoot>
    <ComponentSet />
  </ShadowRoot>
);

Default.parameters = { storyWright: { steps: new Steps().snapshot('default').end() } } satisfies StoryParameters;
