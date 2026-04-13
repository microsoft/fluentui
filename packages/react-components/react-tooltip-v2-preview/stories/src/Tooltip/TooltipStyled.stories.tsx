import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { SlideTextRegular } from '@fluentui/react-icons';
import { Tooltip, type TooltipProps } from '@fluentui/react-tooltip-v2-preview';

const useStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export const Styled = (props: Partial<TooltipProps>): JSXElement => {
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
