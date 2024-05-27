import { makeStyles, tokens } from '@fluentui/react-components';
import { createMotionComponent } from '@fluentui/react-motions-preview';
import * as React from 'react';

import description from './CreateMotionComponent.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: '10px',

    alignItems: 'center',
    paddingTop: '100px',
  },
  item: {
    backgroundColor: tokens.colorBrandBackground,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorTransparentStroke}`,
    width: '100px',
    height: '100px',
  },
  description: { margin: '5px' },
});

const DropIn = createMotionComponent({
  keyframes: [
    { transform: 'rotate(-30deg) translateY(-100%)', opacity: 0 },
    { transform: 'rotate(0deg) translateY(0%)', opacity: 1 },
  ],
  duration: 4000,
});

export const CreateMotionComponent = () => {
  const classes = useClasses();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <DropIn iterations={Infinity}>
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
