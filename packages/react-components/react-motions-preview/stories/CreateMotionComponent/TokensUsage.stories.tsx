import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { createMotionComponent } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './TokensUsage.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap('10px'),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',

    ...shorthands.border(tokens.strokeWidthThicker, 'solid', tokens.colorNeutralForeground3),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.padding('10px'),

    alignItems: 'center',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    width: '100px',
    height: '100px',
    forcedColorAdjust: 'none',
  },
  description: {
    ...shorthands.margin('5px'),
  },
});

const BackgroundChange = createMotionComponent({
  keyframes: [
    { backgroundColor: tokens.colorStatusDangerBackground3 },
    { backgroundColor: tokens.colorStatusSuccessBackground3 },
  ],
  duration: 3000,
});

export const TokensUsage = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <BackgroundChange iterations={Infinity}>
          <div className={classes.item} />
        </BackgroundChange>

        <code className={classes.description}>Custom background color motion</code>
      </div>
    </div>
  );
};

TokensUsage.parameters = {
  docs: {
    description: {
      story: description,
    },
    name: 'foo',
  },
  name: 'foo',
  storyName: 'foo',
  title: 'components/Button',
};
