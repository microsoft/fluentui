import * as React from 'react';
import { Popup, Tooltip } from '@fluentui/react-northstar';

export const selectors = {
  trigger: 'tooltip-trigger',
  content: 'tooltip-content',
};

const PopupWithTooltipTriggerExample = () => {
  return (
    <Popup
      on="context"
      trigger={
        <Tooltip
          content={<div id={selectors.content}>tooltip content</div>}
          trigger={<button id={selectors.trigger}>Hi</button>}
        />
      }
      content="Hi"
    />
  );
};

export default PopupWithTooltipTriggerExample;
