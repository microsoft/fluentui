import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupOverflow, AvatarSizes } from '@fluentui/react-avatar';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const sizes = [16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96, 120, 128];

export const SizeStack = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {sizes.map(size => (
        <AvatarGroup layout="stack" size={size as AvatarSizes} key={size}>
          <AvatarGroupItem name="Katri Athokas" />
          <AvatarGroupItem name="Elvia Atkins" />
          <AvatarGroupItem name="Cameron Evans" />
          <AvatarGroupItem name="Wanda Howard" />
          <AvatarGroupOverflow>
            <AvatarGroupItem name="Mona Kane" />
            <AvatarGroupItem name="Allan Munger" />
            <AvatarGroupItem name="Daisy Phillips" />
            <AvatarGroupItem name="Robert Tolbert" />
            <AvatarGroupItem name="Kevin Sturgis" />
          </AvatarGroupOverflow>
        </AvatarGroup>
      ))}
    </div>
  );
};

SizeStack.parameters = {
  docs: {
    description: {
      story: 'An AvatarGroup with `stack` layout supports a range of sizes from 16 to 128. The default is 32.',
    },
  },
};
