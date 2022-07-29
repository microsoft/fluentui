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

export const Layout = () => {
  const styles = useStyles();
  const spreadAvatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={'spread-' + name} />);
  const stackAvatarGroupItems = names.map(name => <AvatarGroupItem name={name} key={'stack-' + name} />);
  const spreadPartitionedItems = getPartitionedAvatarGroupItems(spreadAvatarGroupItems);
  const stackPartitionedItems = getPartitionedAvatarGroupItems(stackAvatarGroupItems);

  return (
    <div className={styles.root}>
      <AvatarGroup layout="spread">
        {spreadPartitionedItems.inlineItems}
        <AvatarGroupOverflow>{spreadPartitionedItems.overflowItems}</AvatarGroupOverflow>
      </AvatarGroup>
      <AvatarGroup layout="stack">
        {stackPartitionedItems.inlineItems}
        <AvatarGroupOverflow>{stackPartitionedItems.overflowItems}</AvatarGroupOverflow>
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
