import { createCallbackLogFormatter } from '@fluentui/code-sandbox';
import { useLogKnob } from '@fluentui/docs-components';
import { Toolbar, ShorthandValue, BoxProps } from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, PauseIcon, PlayIcon, BoldIcon, UnderlineIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onItemClick = useLogKnob('onItemClick', null, createCallbackLogFormatter(['content']));
  const onMenuOpenChange = useLogKnob(
    'onMenuOpenChange',
    (e, { menuOpen }) => setMenuOpen(menuOpen),
    createCallbackLogFormatter(['menuOpen']),
  );

  const toolbarItem = (itemName: string, itemIcon: ShorthandValue<BoxProps>) => ({
    key: itemName,
    content: itemName,
    icon: itemIcon,
    title: itemName,
  });

  return (
    <Toolbar
      aria-label="Toolbar can contain a menu"
      items={[
        toolbarItem('bold', <BoldIcon />),
        toolbarItem('underline', <UnderlineIcon />),
        {
          icon: <MoreIcon />,
          key: 'more',
          active: menuOpen,
          title: 'More',
          menu: {
            items: [
              { key: 'play', content: 'Play', icon: <PlayIcon /> },
              { key: 'pause', content: 'Pause', icon: <PauseIcon /> },
              { key: 'divider', kind: 'divider' },
              'Without icon',
            ],
            onItemClick,
          },
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  );
};

export default ToolbarExampleMenuShorthand;
