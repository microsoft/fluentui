import * as React from 'react';
import * as _ from 'lodash';
import { Toolbar } from '@fluentui/react-northstar';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleOverflow = () => {
  const iconsNames = ['bold', 'italic', 'underline'];
  const icons = [<BoldIcon />, <ItalicIcon />, <UnderlineIcon />];

  const itemData = _.times(40, i => ({
    key: `b${i}`,
    content: `${iconsNames[i % iconsNames.length]} #${i}`,
    icon: icons[i % icons.length],
    title: `${iconsNames[i % iconsNames.length]} #${i}`,
  }));

  const toolbarItems = itemData.map(item => {
    return { ...item, content: undefined };
  });
  const [overflowOpen, setOverflowOpen] = React.useState(false);

  return (
    <Toolbar
      aria-label="Toolbar overflow menu"
      items={toolbarItems}
      overflow
      overflowOpen={overflowOpen}
      overflowItem={{ title: 'More' }}
      onOverflowOpenChange={(e, { overflowOpen }) => {
        setOverflowOpen(overflowOpen);
      }}
      getOverflowItems={startIndex => itemData.slice(startIndex)}
    />
  );
};

export default ToolbarExampleOverflow;
