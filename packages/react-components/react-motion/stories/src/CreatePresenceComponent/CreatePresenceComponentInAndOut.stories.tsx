import { createPresenceComponent } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentInAndOut.stories.md';

import styles from './CreatePresenceComponentInAndOut.module.css';

const useClasses = () => styles;

const MyFade = createPresenceComponent({
  enter: {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    duration: 4000,
    iterations: Infinity,
    reducedMotion: {
      duration: 8000,
    },
  },

  exit: {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    duration: 2000,
    iterations: Infinity,
    reducedMotion: {
      duration: 8000,
    },
  },
});

export const CreatePresenceComponentInAndOut = (): JSXElement => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <MyFade.In>
          <div className={classes.item}>MyFade.In</div>
        </MyFade.In>
        <MyFade.Out>
          <div className={classes.item}>MyFade.Out</div>
        </MyFade.Out>
      </div>
    </div>
  );
};

CreatePresenceComponentInAndOut.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
