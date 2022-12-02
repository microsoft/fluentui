import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { FontIncrease24Regular, FontDecrease24Regular, TextFont24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton, ToolbarDivider } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
  group: {
    display: 'flex',
    ...shorthands.gap('8px'),
  },
});

export const FarGroup = (props: Partial<ToolbarProps>) => {
  const farGroupStyles = useStyles();
  return (
    <Toolbar {...props} className={farGroupStyles.toolbar}>
      <div role="presentation" className={farGroupStyles.group}>
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
        <ToolbarDivider />
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
      </div>
      <div role="presentation" className={farGroupStyles.group}>
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
      </div>
    </Toolbar>
  );
};
