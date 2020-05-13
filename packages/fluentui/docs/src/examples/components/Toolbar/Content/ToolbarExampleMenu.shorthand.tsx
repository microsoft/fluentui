import { createCallbackLogFormatter } from '@fluentui/code-sandbox';
import { useLogKnob } from '@fluentui/docs-components';
import { Toolbar, SplitButton } from '@fluentui/react-northstar';
import * as React from 'react';
import { MoreIcon, PauseIcon, PlayIcon, BoldIcon, UnderlineIcon } from '@fluentui/react-icons-northstar';

const ToolbarSplitButton = () => (
  <>
    <SplitButton
      menu={[
        {
          key: 'group',
          content: 'New group message',
        },
        {
          key: 'channel',
          content: 'New channel message',
        },
      ]}
      button={{
        content: 'New conversation',
        'aria-roledescription': 'splitbutton',
        'aria-describedby': 'instruction-message',
      }}
      toggleButton={{
        'aria-label': 'more options',
        // do not close toolbar menu on click.
        onClick: e => e.stopPropagation(),
      }}
      styles={{ display: 'flex' }}
      // do not close toolbar menu on click.
      onMainButtonClick={e => e.stopPropagation()}
    />
    <span
      aria-hidden="true"
      id="instruction-message"
      style={{
        opacity: 0,
        height: '1px',
        width: '1px',
      }}
    >
      to open menu, press Alt + Arrow Down
    </span>
  </>
);

const ToolbarExampleMenuShorthand = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onItemClick = useLogKnob('onItemClick', null, createCallbackLogFormatter(['content']));
  const onMenuOpenChange = useLogKnob(
    'onMenuOpenChange',
    (e, { menuOpen }) => setMenuOpen(menuOpen),
    createCallbackLogFormatter(['menuOpen']),
  );

  return (
    <Toolbar
      aria-label="Toolbar can contain a menu"
      items={[
        {
          key: 'bold',
          content: 'bold',
          icon: <BoldIcon />,
          title: 'Bold',
        },
        {
          key: 'underline',
          content: 'underline',
          icon: <UnderlineIcon />,
          title: 'Underline',
        },
        {
          icon: <MoreIcon />,
          key: 'more',
          active: menuOpen,
          title: 'More',
          menu: {
            items: [
              { key: 'play', content: 'Play', icon: <PlayIcon /> },
              { key: 'split', disabled: true, as: 'div', content: <ToolbarSplitButton /> },
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
