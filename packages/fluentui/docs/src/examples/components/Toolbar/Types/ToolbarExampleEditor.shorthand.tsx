import * as React from 'react';
import { Toolbar, Input, Button, Form } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikeIcon,
  HighlightIcon,
  FontColorIcon,
  FontSizeIcon,
  RemoveFormatIcon,
  OutdentIcon,
  IndentIcon,
  MoreIcon,
  SearchIcon,
  ToDoListIcon,
  NumberListIcon,
  BulletsIcon,
  QuoteIcon,
  LinkIcon,
  CodeSnippetIcon,
} from '@fluentui/react-icons-northstar';

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
            icon: <BoldIcon {...{ outline: true }} />,
            key: 'bold',
            kind: 'toggle',
            active: isBold,
            title: 'Toggle bold',
            onClick: () => {
              setBold(!isBold);
            },
          },
          {
            icon: <ItalicIcon {...{ outline: true }} />,
            key: 'italic',
            kind: 'toggle',
            active: isItalic,
            title: 'Toggle italic',
            onClick: () => {
              setItalic(!isItalic);
            },
          },
          {
            icon: <UnderlineIcon {...{ outline: true }} />,
            key: 'underline',
            kind: 'toggle',
            active: isUnderline,
            title: 'Toggle underline',
            onClick: () => {
              setUnderline(!isUnderline);
            },
          },
          {
            icon: <StrikeIcon {...{ outline: true }} />,
            key: 'strike',
            kind: 'toggle',
            active: isStrike,
            disabled: true,
            title: 'Toggle strike',
            onClick: () => {
              setStrike(!isStrike);
            },
          },
          { key: 'divider1', kind: 'divider' },
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
            icon: <FontSizeIcon {...{ outline: true }} />,
            key: 'font-size',
            title: 'Font size',
          },
          {
            icon: <RemoveFormatIcon {...{ outline: true }} />,
            key: 'remove-format',
            title: 'Remove formatting',
          },
          { key: 'divider2', kind: 'divider' },
          {
            key: 'radiogroup',
            kind: 'group',
            items: [
              {
                key: 'bullets',
                icon: <BulletsIcon {...{ outline: true }} />,
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
                icon: <NumberListIcon {...{ outline: true }} />,
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
                icon: <ToDoListIcon {...{ outline: true }} />,
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
          {
            icon: <OutdentIcon {...{ outline: true }} />,
            key: 'outdent',
            title: 'Outdent',
          },
          {
            icon: <IndentIcon {...{ outline: true }} />,
            key: 'indent',
            title: 'Indent',
          },
          { key: 'divider4', kind: 'divider' },
          {
            icon: <MoreIcon {...{ outline: true }} />,
            key: 'more',
            active: moreMenuOpen,
            title: 'More',
            menu: [
              {
                content: 'Quote',
                icon: <QuoteIcon />,
                onClick: () => {
                  writeLog('... -> Quote');
                },
              },
              {
                content: 'Link',
                icon: <LinkIcon />,
                disabled: true,
                onClick: () => {
                  writeLog('SHOULD NOT BE CALLED, ITEM IS DISABLED... -> Link');
                },
              },
              {
                content: 'Code snippet',
                icon: <CodeSnippetIcon />,
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
