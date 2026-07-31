import { createMotionComponent, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreateMotionComponentTokensUsage.stories.md';

import styles from './CreateMotionComponentTokensUsage.module.css';

const useClasses = () => styles;

const BackgroundChange = createMotionComponent({
  keyframes: [
    { backgroundColor: tokens.colorStatusDangerBackground3 },
    { backgroundColor: tokens.colorStatusSuccessBackground3 },
  ],
  duration: 3000,
  iterations: Infinity,

  reducedMotion: {
    iterations: 1,
  },
});

export const CreateMotionComponentTokensUsage = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <BackgroundChange>
          <div className={classes.item} />
        </BackgroundChange>

        <div className={classes.description}>Custom background color motion</div>
      </div>
    </div>
  );
};

CreateMotionComponentTokensUsage.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
