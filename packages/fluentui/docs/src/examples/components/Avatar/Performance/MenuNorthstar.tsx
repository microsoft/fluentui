import * as React from 'react';
import { MenuButton, Button, ExpandIcon } from '@fluentui/react-northstar';

const mapper = new Array(50).fill(0);

const Scenario = () => {
  return (
    <>
      {mapper.map(() => (
        <MenuButton
          open
          trigger={<Button icon={<ExpandIcon />} title="Open MenuButton" />}
          menu={[
            '1',
            '2',
            '3',
            {
              content: 'submenu',
              menu: ['4', '5'],
            },
          ]}
        />
      ))}
    </>
  );
};

export default Scenario;
