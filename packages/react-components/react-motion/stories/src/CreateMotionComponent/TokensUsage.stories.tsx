import { createMotionComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';

import description from './TokensUsage.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"card" / 1fr`,
    gap: '20px 10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gridArea: 'card',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusCircular,
    width: '100px',
    height: '100px',
    forcedColorAdjust: 'none',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const BackgroundChange = createMotionComponent({
  keyframes: [
    { backgroundColor: tokens.colorStatusDangerBackground3 },
    { backgroundColor: tokens.colorStatusSuccessBackground3 },
  ],
  duration: 3000,
  iterations: Infinity,
});

export const TokensUsage = () => {
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

TokensUsage.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
