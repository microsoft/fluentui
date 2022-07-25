import * as React from 'react';

import { makeStyles, tokens, Button, Tooltip } from '@fluentui/react-components';
import { SlideTextRegular } from '@fluentui/react-icons';
import type { TooltipProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export const Styled = (props: Partial<TooltipProps>) => {
  const styles = useStyles();
  return (
    <Tooltip
      withArrow
      content={{ children: 'Example tooltip', className: styles.tooltip }}
      relationship="label"
      {...props}
    >
      <Button icon={<SlideTextRegular />} size="large" />
    </Tooltip>
  );
};

Styled.parameters = {
  docs: {
    description: {
      story: `To style a tooltip, classNames must be passed through the content slot.`,
    },
  },
};
