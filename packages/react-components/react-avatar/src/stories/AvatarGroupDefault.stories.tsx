import * as React from 'react';
import { AvatarGroup } from '../AvatarGroup';
import type { AvatarGroupProps } from '../AvatarGroup';
import { Avatar } from '../Avatar';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Default = (props: Partial<AvatarGroupProps>) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <AvatarGroup {...props}>
        <Avatar name="Katri Athokas" />
        <Avatar name="Elvia Atkins" />
        <Avatar name="Cameron Evans" />
        <Avatar name="Wanda Howard" />
        <Avatar name="Mona Kane" />
        <Avatar name="Allan Munger" />
        <Avatar name="Daisy Phillips" />
        <Avatar name="Robert Tolbert" />
        <Avatar name="Kevin Sturgis" />
      </AvatarGroup>
    </div>
  );
};
