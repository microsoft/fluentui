import * as React from 'react';
import * as _ from 'lodash';

import { NavLink } from 'react-router-dom';
import { Menu, Tooltip, MenuItem } from '@fluentui/react-northstar';
import { OpenOutsideIcon } from '@fluentui/react-icons-northstar';

export interface PrototypeExampleControlsProps {
  examplePath: string;
}

const PrototypeExampleControls: React.FC<PrototypeExampleControlsProps> = props => {
  const items = [
    {
      icon: <OpenOutsideIcon style={{ width: '20px', height: '20px' }} />,
      children: (Component: typeof MenuItem, props) => (
        <Tooltip content="Popout" key="maximize" trigger={<Component {...props} />} />
      ),
      as: NavLink,
      to: `/maximize/${_.kebabCase(props.examplePath.split('/').slice(-1).pop())}`,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ];

  return <Menu iconOnly aria-label="Actions for example" items={items} />;
};
export default PrototypeExampleControls;
