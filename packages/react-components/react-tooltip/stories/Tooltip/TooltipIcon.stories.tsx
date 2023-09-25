import * as React from 'react';
import { Label, makeStyles, mergeClasses, tokens, Tooltip, useId } from '@fluentui/react-components';
import { Info16Regular } from '@fluentui/react-icons';
import type { TooltipProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    columnGap: tokens.spacingVerticalS,
  },
  visible: {
    color: tokens.colorNeutralForeground2BrandSelected,
  },
});

export const Icon = (props: Partial<TooltipProps>) => {
  const styles = useStyles();
  const contentId = useId('content');
  const [visible, setVisible] = React.useState(false);

  return (
    <div aria-owns={visible ? contentId : undefined} className={styles.root}>
      <Label>This is an icon with a Tooltip to show extra information</Label>
      <Tooltip
        content={{
          children: 'Content must never contain focusable elements.',
          id: contentId,
        }}
        positioning="above-start"
        withArrow
        relationship="label"
        onVisibleChange={(e, data) => setVisible(data.visible)}
        {...props}
      >
        <Info16Regular tabIndex={0} className={mergeClasses(visible && styles.visible)} />
      </Tooltip>
    </div>
  );
};

Icon.parameters = {
  docs: {
    description: {
      story: `Tooltips can be attached to icons to create an info icon.`,
    },
  },
};
