import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupOverflow, partitionAvatarGroupItems } from '@fluentui/react-avatar';
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

export const Layout = () => {
  const styles = useStyles();
  const partitionedItems = partitionAvatarGroupItems({ items: names });
  const piePartitionedItems = partitionAvatarGroupItems({ items: names, layout: 'pie' });

  return (
    <div className={styles.root}>
      <AvatarGroup layout="spread">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        <AvatarGroupOverflow>
          {partitionedItems.overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup layout="stack">
        {partitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        <AvatarGroupOverflow>
          {partitionedItems.overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup layout="pie">
        {piePartitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        <AvatarGroupOverflow>
          {piePartitionedItems.overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupOverflow>
      </AvatarGroup>
    </div>
  );
};

Layout.parameters = {
  docs: {
    description: {
      story: `An AvatarGroup supports three layouts: spread, stack, and pie. The default is spread.`,
    },
  },
};
