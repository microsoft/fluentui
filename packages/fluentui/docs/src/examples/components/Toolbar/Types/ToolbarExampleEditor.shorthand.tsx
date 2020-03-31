import * as React from 'react';
import { Toolbar, Input, Button, Form } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const fields = [
  {
    label: 'First name',
    name: 'firstName',
    id: 'first-name-inline-shorthand',
    key: 'first-name',
    required: true,
    inline: true,
  },
  {
    label: 'Last name',
    name: 'lastName',
    id: 'last-name-inline-shorthand',
    key: 'last-name',
    required: true,
    inline: true,
  },
  {
    label: 'I agree to the Terms and Conditions',
    control: {
      as: 'input',
    },
    type: 'checkbox',
    id: 'conditions-inline-shorthand',
    key: 'conditions',
  },
  {
    control: {
      as: Button,
      content: 'Submit',
    },
    key: 'submit',
  },
];

const HighlightPopup = ({ onConfirm }) => {
  return <Form onSubmit={onConfirm} fields={fields} />;
};

const ToolbarExampleEditorShorthand = () => {
  const [isBold, setBold] = useBooleanKnob({ name: 'bold', initialValue: true });
  const [isItalic, setItalic] = useBooleanKnob({ name: 'isItalic', initialValue: false });
  const [isUnderline, setUnderline] = useBooleanKnob({ name: 'isUnderline', initialValue: false });
  const [isStrike, setStrike] = useBooleanKnob({ name: 'isStrike', initialValue: false });

  const [highlightOpen, setHighlightOpen] = useBooleanKnob({
    name: 'highlightOpen',
    initialValue: false,
  });
  const [fontColorActive, setFontColorActive] = useBooleanKnob({
    name: 'fontColorActive',
    initialValue: false,
  });

  const [moreMenuOpen, setMoreMenuOpen] = useBooleanKnob({
    name: 'moreMenuOpen',
    initialValue: false,
  });

  const [log, setLog] = React.useState<string[]>([]);
  const writeLog = message => {
    setLog(prevLog => [`${new Date().toLocaleTimeString()}: ${message}`, ...prevLog]);
  };

  const [bulletListActive, setBulletListActive] = React.useState(false);
  const [numberListActive, setNumberListActive] = React.useState(false);
  const [toDoListActive, setToDoListActive] = React.useState(false);

  return (
    <>
      <Toolbar
        aria-label="Text editor"
        items={[
          {
            key: 'bold',
            kind: 'toggle',
            active: isBold,
            icon: { name: 'bold', outline: true },
            title: 'Toggle bold',
            onClick: () => {
              setBold(!isBold);
            },
          },
          {
            key: 'italic',
            kind: 'toggle',
            active: isItalic,
            icon: { name: 'italic', outline: true },
            title: 'Toggle italic',
            onClick: () => {
              setItalic(!isItalic);
            },
          },
          {
            key: 'underline',
            kind: 'toggle',
            active: isUnderline,
            icon: { name: 'underline', outline: true },
            title: 'Toggle underline',
            onClick: () => {
              setUnderline(!isUnderline);
            },
          },
          {
            key: 'strike',
            kind: 'toggle',
            active: isStrike,
            disabled: true,
            icon: { name: 'strike', outline: true },
            title: 'Toggle strike',
            onClick: () => {
              setStrike(!isStrike);
            },
          },
          { key: 'divider1', kind: 'divider' },
          {
            key: 'highlight',
            icon: { name: 'highlight', outline: true },
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
            key: 'font-color',
            icon: { name: 'font-color', outline: true },
            active: fontColorActive,
            title: 'Font color',
            popup: {
              content: <Input icon="search" placeholder="Search..." />,
              onOpenChange: () => {
                setFontColorActive(!fontColorActive);
              },
            },
          },
          { key: 'font-size', icon: { name: 'font-size', outline: true }, title: 'Font size' },
          {
            key: 'remove-format',
            icon: { name: 'remove-format', outline: true },
            title: 'Remove formatting',
          },
          { key: 'divider2', kind: 'divider' },
          {
            key: 'radiogroup',
            kind: 'group',
            items: [
              {
                key: 'bullets',
                icon: { name: 'bullets', outline: true },
                active: bulletListActive,
                title: 'Bullets',
                onClick: () => {
                  setBulletListActive(!bulletListActive);

                  // deselect other radio items
                  setNumberListActive(false);
                  setToDoListActive(false);
                },
              },
              {
                key: 'number-list',
                icon: { name: 'number-list', outline: true },
                active: numberListActive,
                title: 'Number list',
                onClick: () => {
                  setNumberListActive(!numberListActive);

                  // deselect other radio items
                  setBulletListActive(false);
                  setToDoListActive(false);
                },
              },
              {
                key: 'to-do-list',
                icon: { name: 'to-do-list', outline: true },
                active: toDoListActive,
                title: 'ToDo list',
                onClick: () => {
                  setToDoListActive(!toDoListActive);

                  // deselect other radio items
                  setBulletListActive(false);
                  setNumberListActive(false);
                },
              },
            ],
          },
          { key: 'divider3', kind: 'divider' },
          { key: 'outdent', icon: { name: 'outdent', outline: true }, title: 'Outdent' },
          { key: 'indent', icon: { name: 'indent', outline: true }, title: 'Indent' },
          { key: 'divider4', kind: 'divider' },
          {
            key: 'more',
            icon: { name: 'more', outline: true },
            active: moreMenuOpen,
            title: 'More',
            menu: [
              {
                content: 'Quote',
                icon: 'quote',
                onClick: () => {
                  writeLog('... -> Quote');
                },
              },
              {
                content: 'Link',
                icon: 'link',
                disabled: true,
                onClick: () => {
                  writeLog('SHOULD NOT BE CALLED, ITEM IS DISABLED... -> Link');
                },
              },
              {
                content: 'Code snippet',
                icon: 'code-snippet',
                onClick: () => writeLog('... -> Code snippet'),
              },
            ],
            menuOpen: moreMenuOpen,
            onMenuOpenChange: (e, { menuOpen }) => {
              writeLog(`setting menu to ${menuOpen ? 'open' : 'close'}`);
              setMoreMenuOpen(menuOpen);
            },
          },
        ]}
      />
      <br />
      <button onClick={() => setLog([])}>Clear log</button>
      <pre>
        {log.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </pre>
    </>
  );
};

export default ToolbarExampleEditorShorthand;
