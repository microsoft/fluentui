import { createMotionComponent, makeStyles, tokens } from '@fluentui/react-components';
import * as React from 'react';

import description from './CreateMotionComponent.stories.md';

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
    paddingTop: '120px',
  },

  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    width: '100px',
    height: '100px',
  },
  description: {
    fontFamily: tokens.fontFamilyMonospace,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: tokens.colorNeutralBackground1Pressed,
  },
});

const DropIn = createMotionComponent({
  keyframes: [
    { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
    { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
  ],
  duration: 4000,
  iterations: Infinity,
});

export const CreateMotionComponent = () => {
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

CreateMotionComponent.parameters = {
  docs: {
    description: {
      story: description,
    },
  },
};
