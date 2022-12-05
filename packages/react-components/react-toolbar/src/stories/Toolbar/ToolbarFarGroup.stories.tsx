import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { FontIncrease24Regular, FontDecrease24Regular, TextFont24Regular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton, ToolbarDivider, ToolbarGroup } from '@fluentui/react-toolbar';
import type { ToolbarProps } from '@fluentui/react-toolbar';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const FarGroup = (props: Partial<ToolbarProps>) => {
  const farGroupStyles = useStyles();
  return (
    <Toolbar {...props} className={farGroupStyles.toolbar}>
      <ToolbarGroup role="presentation">
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
        <ToolbarDivider />
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
      </ToolbarGroup>
      <ToolbarGroup role="presentation">
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncrease24Regular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecrease24Regular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFont24Regular />} />
      </ToolbarGroup>
    </Toolbar>
  );
};
