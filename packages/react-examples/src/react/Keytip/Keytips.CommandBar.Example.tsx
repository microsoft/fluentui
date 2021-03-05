import * as React from 'react';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { keytipMap } from '@fluentui/react-examples/lib/react/Keytip/KeytipSetup';
import { Modal } from '@fluentui/react/lib/Modal';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { useBoolean, useConst } from '@fluentui/react-hooks';

const commandBarFarItemsProps = [
  {
    key: 'farItem1',
    text: 'Options',
    iconProps: { iconName: 'SortLines' },
    keytipProps: keytipMap.CommandButton3Keytip,
    subMenuProps: {
      items: [
        {
          key: 'emailMessage',
          text: 'Send Email',
          iconProps: { iconName: 'Mail' },
          keytipProps: keytipMap.SubmenuKeytip1,
        },
        {
          key: 'calendarEvent',
          text: 'Make Calendar Event',
          iconProps: { iconName: 'Calendar' },
          keytipProps: keytipMap.SubmenuKeytip2,
          subMenuProps: {
            items: [
              {
                key: 'testButton',
                text: 'Add to Outlook',
                keytipProps: keytipMap.SubmenuKeytip3,
              },
              {
                key: 'testButton2',
                text: 'Go to Bing',
                keytipProps: keytipMap.SubmenuKeytip4,
                href: 'http://www.bing.com',
                target: '_blank',
              },
            ],
          },
        },
        {
          key: 'splitButtonTest',
          text: 'Other...',
          split: true,
          keytipProps: keytipMap.SubmenuKeytip5,
          subMenuProps: {
            items: [
              {
                key: 'splitButtonSubMenu1',
                text: 'Submenu Item w/o Keytip',
              },
              {
                key: 'splitButtonSubMenu2',
                text: 'Submenu Item w/o Keytip',
              },
            ],
          },
        },
      ],
    },
  },
];

export const KeytipsCommandBarExample: React.FunctionComponent = () => {
  const [showModal, { toggle: toggleShowModal }] = useBoolean(false);
  const [showMessageBar, { toggle: toggleShowMessageBar }] = useBoolean(false);
  const commandBarItems = useConst(() => [
    {
      key: 'commandBarItem1',
      text: 'New',
      iconProps: { iconName: 'Add' },
      onClick: toggleShowModal,
      keytipProps: keytipMap.CommandButton1Keytip,
    },
    {
      key: 'commandBarItem2',
      text: 'Upload',
      iconProps: { iconName: 'Upload' },
      onClick: toggleShowMessageBar,
      keytipProps: keytipMap.CommandButton2Keytip,
    },
  ]);

  return (
    <>
      <CommandBar items={commandBarItems} farItems={commandBarFarItemsProps} />
      {showMessageBar && <MessageBar messageBarType={MessageBarType.success}>Success Uploading</MessageBar>}
      <Modal isOpen={showModal} onDismiss={toggleShowModal} isBlocking={false}>
        <h3>New Modal</h3>
      </Modal>
    </>
  );
};
