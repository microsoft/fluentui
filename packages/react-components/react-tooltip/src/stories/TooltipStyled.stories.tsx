import * as React from 'react';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { SlideTextRegular } from '@fluentui/react-icons';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const getStyles = makeStyles({
  tooltip: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
  },
});

export const Styled = (props: Partial<TooltipProps>) => {
  const styles = getStyles();
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
