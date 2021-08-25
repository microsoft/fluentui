import React from 'react';
import { Tooltip, Button } from '@fluentui/react-northstar';

export const selectors = {
  contentClassName: 'content',
  triggerClassName: 'trigger-button',
};

const TooltipDismissOnHoverContent = () => {
  return (
    <Tooltip
      dismissOnContentMouseEnter
      content={<div className={selectors.contentClassName}>Some content</div>}
      trigger={<Button className={selectors.triggerClassName} />}
    />
  );
};

export default TooltipDismissOnHoverContent;
