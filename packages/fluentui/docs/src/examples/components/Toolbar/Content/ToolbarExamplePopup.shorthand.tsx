import * as React from 'react';
import { Toolbar, Input, Button, Form } from '@fluentui/react-northstar';
import { HighlightIcon, FontColorIcon, SearchIcon, ItalicIcon } from '@fluentui/react-icons-northstar';

const HighlightPopup = ({ onConfirm }) => {
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

const ToolbarExamplePopupShorthand = () => {
  const [highlightOpen, setHighlightOpen] = React.useState(false);
  const [fontColorActive, setFontColorActive] = React.useState(false);
  return (
    <Toolbar
      aria-label="Toolbar can contain a popup"
      items={[
        {
          icon: <HighlightIcon {...{ outline: true }} />,
          key: 'highlight',
          active: highlightOpen,
          title: 'Highlight',
          popup: {
            content: (
              <HighlightPopup
                onConfirm={() => {
                  setHighlightOpen(false);
                }}
              />
            ),
            onOpenChange: (e, { open }) => {
              setHighlightOpen(open);
            },
            open: highlightOpen,
          },
        },
        {
          icon: <FontColorIcon {...{ outline: true }} />,
          key: 'font-color',
          active: fontColorActive,
          title: 'Font color',
          popup: {
            content: <Input icon={<SearchIcon />} placeholder="Search..." />,
            onOpenChange: () => {
              setFontColorActive(!fontColorActive);
            },
          },
        },
        {
          icon: <ItalicIcon outline />,
          key: 'italic',
          title: 'Italic',
        },
      ]}
    />
  );
};

export default ToolbarExamplePopupShorthand;
