import { createPresenceComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import description from './CreatePresenceComponentInAndOut.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card card" "controls ." / 1fr 1fr`,
    gap: '20px 10px',
  },

  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    borderRadius: '50%',

    width: '100px',
    height: '100px',
    color: 'white',
  },
});

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
