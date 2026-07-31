import { createMotionComponent } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentFactory.stories.md';

import styles from './CreateMotionComponentFactory.module.css';

const useClasses = () => styles;

const DropIn = createMotionComponent({
  keyframes: [
    { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
    { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
  ],
  duration: 4000,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentFactory = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn>
          <div className={classes.item} />
        </DropIn>

        <code className={classes.description}>Custom drop in motion</code>
      </div>
    </div>
  );
};

CreateMotionComponentFactory.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
