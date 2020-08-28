import { createCallbackLogFormatter } from '@fluentui/code-sandbox';
import { useLogKnob } from '@fluentui/docs-components';
import { Toolbar } from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, PauseIcon, PlayIcon, StrikeIcon, ItalicIcon } from '@fluentui/react-icons-northstar';

const ToolbarExampleMenuWithSubmenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onMenuOpenChange = useLogKnob(
    'onMenuOpenChange',
    (e, { menuOpen }) => setMenuOpen(menuOpen),
    createCallbackLogFormatter(['menuOpen']),
  );

  return (
    <Toolbar
      aria-label="Toolbar can contain a submenu in a menu"
      items={[
        {
          key: 'strikethrough',
          content: 'strikethrough',
          icon: <StrikeIcon />,
          title: 'Strikethrough',
        },
        {
          key: 'italic',
          content: 'italic',
          icon: <ItalicIcon />,
          title: 'Italic',
        },
        {
          'aria-label': 'more options',
          icon: <MoreIcon />,
          key: 'more',
          active: menuOpen,
          menu: [
            {
              key: 'play',
              content: 'Play',
              icon: <PlayIcon />,
              menu: {
                items: ['Play with audio', { content: 'Play with video', key: 'playVideo', menu: ['HD', 'Full HD'] }],
              },
            },
            { key: 'pause', content: 'Pause', icon: <PauseIcon /> },
            { key: 'divider', kind: 'divider' },
            'Without icon',
          ],
          menuOpen,
          onMenuOpenChange,
        },
      ]}
    />
  );
};

export default ToolbarExampleMenuWithSubmenuShorthand;
