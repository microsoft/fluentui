import * as React from 'react';
import { Toolbar, Button, Form, Input } from '@fluentui/react-northstar';
import { MoreIcon, ItalicIcon, UnderlineIcon } from '@fluentui/react-icons-northstar';

const CustomPopup = ({ onConfirm }) => {
  return (
    <Form
      onSubmit={onConfirm}
      fields={[
        {
          label: 'First name',
          name: 'firstName',
          id: 'first-name-inline-shorthand',
          key: 'first-name',
          required: true,
          inline: true,
          control: {
            as: Input,
            showSuccessIndicator: false,
          },
        },
        {
          control: {
            as: Button,
            content: 'Submit',
          },
          key: 'submit',
        },
      ]}
    />
  );
};

const ToolbarExampleActionPopupInMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <Toolbar
      aria-label="Popup with an action in menu"
      items={[
        {
          key: 'underline',
          content: 'underline',
          icon: <UnderlineIcon />,
          title: 'Underline',
        },
        {
          key: 'italic',
          content: 'italic',
          icon: <ItalicIcon />,
          title: 'Italic',
        },
        {
          icon: <MoreIcon />,
          key: 'more',
          active: menuOpen,
          title: 'More',
          menu: [
            {
              content: 'Open Popup',
              popup: (
                <CustomPopup
                  onConfirm={() => {
                    setMenuOpen(false);
                  }}
                />
              ),
            },
          ],
          menuOpen,
          onMenuOpenChange: (e, { menuOpen }) => {
            setMenuOpen(menuOpen);
          },
        },
      ]}
    />
  );
};

export default ToolbarExampleActionPopupInMenu;
