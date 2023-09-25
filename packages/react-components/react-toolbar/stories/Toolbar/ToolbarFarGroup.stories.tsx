import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { FontIncreaseRegular, FontDecreaseRegular, TextFontRegular } from '@fluentui/react-icons';
import { Toolbar, ToolbarButton, ToolbarDivider, ToolbarGroup } from '@fluentui/react-components';
import type { ToolbarProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const FarGroup = (props: Partial<ToolbarProps>) => {
  const farGroupStyles = useStyles();
  return (
    <Toolbar aria-label="with Separeted Groups" {...props} className={farGroupStyles.toolbar}>
      <ToolbarGroup role="presentation">
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
        <ToolbarDivider />
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
      </ToolbarGroup>
      <ToolbarGroup role="presentation">
        <ToolbarButton aria-label="Increase Font Size" appearance="primary" icon={<FontIncreaseRegular />} />
        <ToolbarButton aria-label="Decrease Font Size" icon={<FontDecreaseRegular />} />
        <ToolbarButton aria-label="Reset Font Size" icon={<TextFontRegular />} />
      </ToolbarGroup>
    </Toolbar>
  );
};
