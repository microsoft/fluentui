import * as React from 'react';

import Toolbar from 'src/components/Toolbar/Toolbar';
import { toggleButtonBehavior } from '@fluentui/accessibility';
import { isConformant, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProvider, findIntrinsicElement } from 'test/utils';
import { BoldIcon, ItalicIcon } from '@fluentui/react-icons-northstar';

type BaseComponentProps = { color?: string } & React.HTMLAttributes<HTMLButtonElement>;

const BaseComponent: React.FC<BaseComponentProps> = props => {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(false);

  const getItems = () => [
    {
      accessibility: toggleButtonBehavior,
      active: bold,
      icon: <BoldIcon {...{ outline: true }} />,
      title: 'Toggle bold',
      onClick: () => setBold(!bold),
      id: 'item1',
      key: 'toolbar-item-1',
    },
    {
      accessibility: toggleButtonBehavior,
      active: italic,
      icon: <ItalicIcon {...{ outline: true }} />,
      title: 'Toggle italic',
      onClick: () => setItalic(italic),
      id: 'item2',
      key: 'toolbar-item-2',
    },
  ];

  return <Toolbar items={getItems()} />;
};

describe('Toolbar', () => {
  isConformant(Toolbar);
  isConformant(Toolbar, {
    requiredProps: { overflow: true },
  });

  describe('aria-pressed is changing accordingly to state', () => {
    it('renders children', () => {
      const wrapper = mountWithProvider(<BaseComponent />);

      const toolbarButton = findIntrinsicElement(wrapper, `#item1`);
      expect(getRenderedAttribute(toolbarButton, 'aria-pressed', '')).toBe('false');

      toolbarButton.simulate('click');
      expect(getRenderedAttribute(toolbarButton, 'aria-pressed', '')).toBe('true');
    });
  });
});
