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
  const spreadPartitionedItems = partitionAvatarGroupItems({ items: names });
  const stackPartitionedItems = partitionAvatarGroupItems({ items: names });

  return (
    <div className={styles.root}>
      <AvatarGroup layout="spread">
        {spreadPartitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        <AvatarGroupOverflow>
          {spreadPartitionedItems.overflowItems.map(name => (
            <AvatarGroupItem name={name} key={name} />
          ))}
        </AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup layout="stack">
        {stackPartitionedItems.inlineItems.map(name => (
          <AvatarGroupItem name={name} key={name} />
        ))}
        <AvatarGroupOverflow>
          {stackPartitionedItems.overflowItems.map(name => (
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
      story: `An AvatarGroup supports support two layouts: spread and stack. The default is spread.`,
    },
  },
};
