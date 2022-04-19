import * as React from 'react';

import { Toolbar } from 'src/components/Toolbar/Toolbar';
import { toggleButtonBehavior } from '@fluentui/accessibility';
import { isConformant, getRenderedAttribute } from 'test/specs/commonTests';
import { mountWithProvider, findIntrinsicElement } from 'test/utils';
import { BoldIcon, ItalicIcon } from '@fluentui/react-icons-northstar';

type BaseComponentProps = { color?: string } & React.HTMLAttributes<HTMLButtonElement>;

const boldButtonId = 'item1';
const italicButtonId = 'item2';

const BaseComponent: React.FC<BaseComponentProps> = props => {
  const [bold, setBold] = React.useState(false);
  const [italic, setItalic] = React.useState(true);

  const getItems = () => [
    {
      accessibility: toggleButtonBehavior,
      active: bold,
      icon: <BoldIcon {...{ outline: true }} />,
      title: 'Toggle bold',
      onClick: () => setBold(!bold),
      id: boldButtonId,
      key: 'toolbar-item-1',
    },
    {
      accessibility: toggleButtonBehavior,
      active: italic,
      icon: <ItalicIcon {...{ outline: true }} />,
      title: 'Toggle italic',
      onClick: () => setItalic(!italic),
      id: italicButtonId,
      key: 'toolbar-item-2',
    },
  ];

  return <Toolbar items={getItems()} />;
};

describe('Toolbar', () => {
  isConformant(Toolbar, {
    testPath: __filename,
    constructorName: 'Toolbar',
    requiredProps: { overflow: true },
    skipAsPropTests: 'as-component',
  });

  describe('aria-pressed is changing accordingly to state', () => {
    it('renders children', () => {
      const wrapper = mountWithProvider(<BaseComponent />);

      const boldToolbarButton = findIntrinsicElement(wrapper, `#${boldButtonId}`);
      const italicToolbarButton = findIntrinsicElement(wrapper, `#${italicButtonId}`);
      expect(getRenderedAttribute(boldToolbarButton, 'aria-pressed', '')).toBe('false');
      expect(getRenderedAttribute(italicToolbarButton, 'aria-pressed', '')).toBe('true');

      boldToolbarButton.simulate('click');
      italicToolbarButton.simulate('click');

      expect(getRenderedAttribute(boldToolbarButton, 'aria-pressed', '')).toBe('true');
      expect(getRenderedAttribute(italicToolbarButton, 'aria-pressed', '')).toBe('false');
    });
  });

  describe('overflowItem', () => {
    it('popper props can be overriden', () => {
      const wrapper = mountWithProvider(
        <Toolbar items={[]} overflow overflowOpen overflowItem={{ menu: { popper: { position: 'below' } } }} />,
      );

      expect(wrapper.find('Popper').prop('positionFixed')).toBe(true);

      expect(wrapper.find('Popper').prop('position')).toBe('below');
    });
  });
});
