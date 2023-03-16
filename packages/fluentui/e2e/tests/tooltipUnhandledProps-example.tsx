import React from 'react';
import { MenuButton, Tooltip, Button } from '@fluentui/react-northstar';

import { selectors } from './tooltipUnhandledProps-selectors';

const TooltipUnhandledProps = () => {
  return (
    <MenuButton
      trigger={<Tooltip content="Does not work" trigger={<Button className={selectors.triggerClassName} />} />}
      menu={[
        '1',
        '2',
        '3',
        {
          content: 'submenu',
          className: selectors.menuItemClassName,
          menu: {
            items: ['4', '5'],
          },
        },
      ]}
      on="click"
    />
  );
};

export default TooltipUnhandledProps;
