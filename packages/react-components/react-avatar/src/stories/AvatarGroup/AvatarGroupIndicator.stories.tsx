import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupOverflow } from '@fluentui/react-avatar';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

export const Indicator = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupOverflow overflowIndicator="count">
          <AvatarGroupItem name="Mona Kane" />
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup>
        <AvatarGroupItem name="Katri Athokas" />
        <AvatarGroupItem name="Elvia Atkins" />
        <AvatarGroupItem name="Cameron Evans" />
        <AvatarGroupItem name="Wanda Howard" />
        <AvatarGroupOverflow overflowIndicator="icon">
          <AvatarGroupItem name="Mona Kane" />
          <AvatarGroupItem name="Allan Munger" />
          <AvatarGroupItem name="Daisy Phillips" />
          <AvatarGroupItem name="Robert Tolbert" />
          <AvatarGroupItem name="Kevin Sturgis" />
        </AvatarGroupOverflow>
      </AvatarGroup>
    </div>
  );
};

Indicator.parameters = {
  docs: {
    description: {
      story: `An AvatarGroup supports an icon and a count overflow indicator.
        When size is less than 24, then icon will be used by default.`,
    },
  },
};
