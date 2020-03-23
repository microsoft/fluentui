import { useBooleanKnob } from '@fluentui/docs-components';
import { Menu } from '@fluentui/react-northstar';
import * as React from 'react';

import useAccessibilityKnob from '../../../components/ComponentDoc/useAccessibilityKnob';

const MenuPlayground: React.FunctionComponent = () => {
  const accessibility = useAccessibilityKnob('Menu');
  const [pointing] = useBooleanKnob({ name: 'pointing' });
  const [primary] = useBooleanKnob({ name: 'primary' });
  const [vertical] = useBooleanKnob({ name: 'vertical' });

  return (
    <Menu
      accessibility={accessibility}
      items={[
        'Profile',
        'My account',
        {
          key: 'messages',
          content: 'Messages',
          menu: ['Drafts', 'Archive'],
        },
        'Logout',
      ]}
      pointing={pointing}
      primary={primary}
      vertical={vertical}
    />
  );
};

export default MenuPlayground;
