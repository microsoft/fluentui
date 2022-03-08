import * as React from 'react';

import { Tooltip, TooltipProps } from '../Tooltip';
import { Button } from '@fluentui/react-button';
import { SlideTextRegular } from '@fluentui/react-icons';
import { makeStyles } from '@griffel/react';

const getStyles = makeStyles({
  tooltip: {
    backgroundColor: 'green',
    color: 'white',
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
