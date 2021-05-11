import { useNumberKnob } from '@fluentui/docs-components';
import { SplitButton } from '@fluentui/react-northstar';
import * as React from 'react';

const items = [
  { key: 'group', content: 'New group message' },
  { key: 'channel', content: 'New channel message' },
  { key: 'conversation', content: 'New conversation' },
];

const SplitButtonMainOptionChangeExample = () => {
  const [activeIndex, setActiveIndex] = useNumberKnob({ name: 'activeIndex', min: 0, max: 2, initialValue: 0 });
  const activeItem = items[activeIndex];

  return (
    <SplitButton
      button={activeItem}
      menu={{
        activeIndex,
        items,
      }}
      onMenuItemClick={(e, { index }) => setActiveIndex(index)}
    />
  );
};

export default SplitButtonMainOptionChangeExample;
