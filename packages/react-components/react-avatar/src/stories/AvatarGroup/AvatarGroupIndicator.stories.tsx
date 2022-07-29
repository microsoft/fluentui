import * as React from 'react';
import {
  AvatarGroup,
  AvatarGroupItem,
  AvatarGroupOverflow,
  getPartitionedAvatarGroupItems,
} from '@fluentui/react-avatar';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];

export const Indicator = () => {
  const styles = useStyles();
  const countAvatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={'spread-' + name} />);
  const iconAvatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={'stack-' + name} />);
  const countPartitionedItems = getPartitionedAvatarGroupItems(countAvatarGroupItems);
  const iconPartitionedItems = getPartitionedAvatarGroupItems(iconAvatarGroupItems);

  return (
    <div className={styles.root}>
      <AvatarGroup>
        {countPartitionedItems.inlineItems}
        <AvatarGroupOverflow indicator="count">{countPartitionedItems.overflowItems}</AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup>
        {iconPartitionedItems.inlineItems}
        <AvatarGroupOverflow indicator="icon">{iconPartitionedItems.overflowItems}</AvatarGroupOverflow>
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
