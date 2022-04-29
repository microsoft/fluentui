import * as React from 'react';
import { AvatarGroup, AvatarGroupProps } from '../index';
import { Avatar } from '../Avatar';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
  },
});

export const Default = (props: Partial<AvatarGroupProps>) => {
  const avatarGroupId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={avatarGroupId}>Default AvatarGroup.</Label>
      <AvatarGroup id={avatarGroupId} {...props}>
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
