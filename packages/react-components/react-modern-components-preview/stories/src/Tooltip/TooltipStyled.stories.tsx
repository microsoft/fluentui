import * as React from 'react';

import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Tooltip } from '@fluentui/react-modern-components-preview/tooltip';
import type { TooltipProps } from '@fluentui/react-modern-components-preview/tooltip';
import { SlideTextRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export const Styled = (props: Partial<TooltipProps>): React.ReactNode => {
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
