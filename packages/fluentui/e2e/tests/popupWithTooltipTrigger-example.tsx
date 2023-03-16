import * as React from 'react';
import { Popup, Tooltip } from '@fluentui/react-northstar';

import { selectors } from './popupWithTooltipTrigger-selectors';

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
