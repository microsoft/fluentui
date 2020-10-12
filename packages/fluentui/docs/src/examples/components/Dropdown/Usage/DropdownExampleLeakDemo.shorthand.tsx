import { Dropdown, Button } from '@fluentui/react-northstar';
import * as React from 'react';

const DropdownExampleLeakDemo = () => {
  const [show, toggle] = React.useState(false);
  const toggleDropdown = React.useCallback(() => toggle(prev => !prev), [toggle]);
  return (
    <>
      <p>Dropdown Leak Demo</p>
      <Button content={'Mount/Unmount'} onClick={toggleDropdown} />
      {show ? <Dropdown items={['1', '2', '3']} /> : null}
    </>
  );
};

export default DropdownExampleLeakDemo;
