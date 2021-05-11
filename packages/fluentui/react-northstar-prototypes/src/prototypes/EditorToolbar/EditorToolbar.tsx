import {
  Button,
  Divider,
  Flex,
  Form,
  Menu,
  Popup,
  Ref,
  ShorthandValue,
  Text,
  Toolbar,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  ToolbarMenuItemProps,
  ToolbarMenuItemShorthandKinds,
} from '@fluentui/react-northstar';
import { useEventListener } from '@fluentui/react-component-event-listener';
import { getCode, keyboardKey } from '@fluentui/accessibility';
import * as _ from 'lodash';
import * as React from 'react';

import { EditorToolbarAction, EditorToolbarState, FontFormatting } from './editorToolbarReducer';
import EditorToolbarTable from './EditorToolbarTable';
import {
  BoldIcon,
  BulletsIcon,
  CodeSnippetIcon,
  FontColorIcon,
  FontSizeIcon,
  HighlightIcon,
  ItalicIcon,
  LinkIcon,
  NumberListIcon,
  RemoveFormatIcon,
  TableIcon,
  TrashCanIcon,
  UnderlineIcon,
  ChevronDownIcon,
  QnaIcon,
} from '@fluentui/react-icons-northstar';

type EditorToolbarProps = EditorToolbarState & {
  dispatch: React.Dispatch<EditorToolbarAction>;
  target?: Document;
};

type ToolbarItem = ShorthandValue<ToolbarItemProps & { kind?: keyof ToolbarItemShorthandKinds }>;
type OverflowItem = ShorthandValue<ToolbarMenuItemProps & { kind?: keyof ToolbarMenuItemShorthandKinds }>;

const EditorToolbar: React.FC<EditorToolbarProps> = props => {
  const overflowIndex = React.useRef<number>();

  const linkItemRef = React.useRef<HTMLElement>(null);
  const toolbarRef = React.useRef<HTMLElement>(null);

  const fontFormattingItems = [
    {
      key: 'heading1',
      content: FontFormatting.Heading1,
      active: props.fontFormatting === FontFormatting.Heading1,
      onClick: () => props.dispatch({ type: 'FONT_FORMATTING', value: FontFormatting.Heading1 }),
    },
    {
      key: 'heading2',
      content: FontFormatting.Heading2,
      active: props.fontFormatting === FontFormatting.Heading2,
      onClick: () => props.dispatch({ type: 'FONT_FORMATTING', value: FontFormatting.Heading2 }),
    },
    {
      key: 'heading3',
      content: FontFormatting.Heading3,
      active: props.fontFormatting === FontFormatting.Heading3,
      onClick: () => props.dispatch({ type: 'FONT_FORMATTING', value: FontFormatting.Heading3 }),
    },
    {
      key: 'paragraph',
      content: FontFormatting.Paragraph,
      active: props.fontFormatting === FontFormatting.Paragraph,
      onClick: () => props.dispatch({ type: 'FONT_FORMATTING', value: FontFormatting.Paragraph }),
    },
  ];

  const combinedItems: {
    toolbarItem: ToolbarItem;
    overflowItem?: OverflowItem;
  }[] = [
    {
      toolbarItem: {
        key: 'bold',
        icon: <BoldIcon />,
        active: props.bold,
        onClick: () => props.dispatch({ type: 'BOLD', value: !props.bold }),
      },
    },
    {
      toolbarItem: {
        key: 'italic',
        icon: <ItalicIcon />,
        active: props.italic,
        onClick: () => props.dispatch({ type: 'ITALIC', value: !props.italic }),
      },
    },
    {
      toolbarItem: {
        key: 'underline',
        icon: <UnderlineIcon />,
        active: props.underline,
        onClick: () => props.dispatch({ type: 'UNDERLINE', value: !props.underline }),
      },
    },

    { toolbarItem: { key: 'divider-1', kind: 'divider' } },

    { toolbarItem: { key: 'highlight', icon: <HighlightIcon />, active: props.fontHighlight } },
    { toolbarItem: { key: 'font-color', icon: <FontColorIcon />, active: props.fontColor } },
    { toolbarItem: { key: 'font-size', icon: <FontSizeIcon />, active: props.fontSize } },

    {
      toolbarItem: {
        menu: fontFormattingItems,
        menuOpen: props.fontFormattingOpen,
        onMenuOpenChange: (e, { menuOpen }) => props.dispatch({ type: 'FONT_FORMATTING_OPEN', value: menuOpen }),
        children: (
          <Flex gap="gap.smaller">
            <Text styles={{ whiteSpace: 'nowrap' }} content={props.fontFormatting} />
            <ChevronDownIcon />
          </Flex>
        ),
      },
      overflowItem: {
        popup: {
          align: 'center',
          position: 'before',
          content: {
            children: () => (
              <Menu
                items={fontFormattingItems}
                onItemClick={() => {
                  props.dispatch({ type: 'MORE', value: false });
                }}
                vertical
              />
            ),
          },
          onOpenChange: (e, { open }) => {
            props.dispatch({ type: 'FONT_FORMATTING_OPEN', value: open });
          },
          open: props.fontFormattingOpen,
        },
        icon: <QnaIcon />,
        content: props.fontFormatting,
      },
    },

    {
      toolbarItem: { key: 'remove-format', icon: <RemoveFormatIcon /> },
      overflowItem: { key: 'remove-format', icon: <RemoveFormatIcon />, content: 'Clear formatting' },
    },
    { toolbarItem: { key: 'divider-2', kind: 'divider' } },

    {
      toolbarItem: { key: 'bullets', icon: <BulletsIcon />, active: props.itemList },
      overflowItem: {
        key: 'bullets',
        icon: <BulletsIcon />,
        active: props.itemList,
        content: 'Bulleted list',
      },
    },
    {
      toolbarItem: { key: 'number-list', icon: <NumberListIcon />, active: props.numberList },
      overflowItem: {
        key: 'number-list',
        icon: <NumberListIcon />,
        active: props.numberList,
        content: 'Number list',
      },
    },

    { toolbarItem: { key: 'divider-3', kind: 'divider' } },

    {
      toolbarItem: {
        key: 'link',
        icon: <LinkIcon />,
        active: props.link,
        children: (Component, props) => (
          <Ref innerRef={linkItemRef}>
            <Component {...props} />
          </Ref>
        ),
        onClick: () => props.dispatch({ type: 'LINK', value: true }),
      },
      overflowItem: {
        key: 'link',
        icon: <LinkIcon />,
        content: 'Insert link',
        onClick: () => props.dispatch({ type: 'LINK', value: true }),
      },
    },
    {
      toolbarItem: {
        key: 'code',
        icon: <CodeSnippetIcon />,
        active: props.code,
      },
      overflowItem: {
        key: 'code',
        icon: <CodeSnippetIcon />,
        content: 'Code snippet',
        active: props.code,
      },
    },
    {
      toolbarItem: {
        key: 'table',
        icon: <TableIcon />,
        content: 'Insert table',
        active: props.table,

        popup: {
          content: (
            <>
              <Text>Insert your table</Text>
              <EditorToolbarTable
                onClick={() => {
                  props.dispatch({ type: 'TABLE', value: false });
                  props.dispatch({ type: 'MORE', value: false });
                }}
              />
            </>
          ),
          onOpenChange: (e, { open }) => props.dispatch({ type: 'TABLE', value: open }),
          open: props.table,
        },
      },
    },
  ];

  const linkItemIndex = combinedItems.findIndex(
    // @ts-ignore
    item => item.overflowItem && item.overflowItem.key === 'link',
  );
  const linkInOverflowMenu = overflowIndex.current <= linkItemIndex;
  // Based on position of link item we choose target element for Popup. It's safe to access
  // ".current" in this case because Popup will be opened after item will be rendered
  const linkTarget = linkInOverflowMenu ? toolbarRef.current : linkItemRef.current;

  useEventListener({
    listener: (e: KeyboardEvent) => {
      const code = getCode(e);

      if (code === keyboardKey.K && e.ctrlKey) {
        // Ctrl+K is a browser hotkey, it's required to prevent defaults
        e.preventDefault();
        props.dispatch({ type: 'LINK', value: true });
      }
    },
    type: 'keydown',
    target: props.target,
  });
  useEventListener({
    listener: () => {
      // All controlled popups should be closed on resize

      if (props.table) {
        props.dispatch({ type: 'TABLE', value: false });
      }

      if (props.link) {
        props.dispatch({ type: 'LINK', value: false });
      }
    },
    type: 'resize',
    target: props.target.defaultView,
  });

  return (
    <>
      <Popup
        content={
          <>
            <Form
              fields={[
                {
                  label: 'URL',
                  name: 'address',
                  id: 'link-address',
                  key: 'address',
                  required: true,
                  inline: true,
                },
              ]}
            />
            <Divider hidden />
            <Flex gap="gap.small" hAlign="end">
              <Button content="Cancel" onClick={() => props.dispatch({ type: 'LINK', value: false })} />
              <Button content="Insert" onClick={() => props.dispatch({ type: 'LINK', value: false })} primary />
            </Flex>
          </>
        }
        open={props.link}
        pointing
        target={linkTarget}
      />

      <Flex>
        <Ref innerRef={toolbarRef}>
          <Toolbar
            styles={{ minWidth: 0, flexGrow: 1 }} // necessary for Toolbar with overflow inside a flex container
            items={_.map(combinedItems, 'toolbarItem')}
            overflow
            overflowOpen={props.more}
            onOverflow={itemsVisible => {
              overflowIndex.current = itemsVisible - 1;
            }}
            onOverflowOpenChange={(e, { overflowOpen }) => props.dispatch({ type: 'MORE', value: overflowOpen })}
            getOverflowItems={startIndex => {
              const firstToolbarItem = combinedItems[startIndex].toolbarItem;
              let actualIndex = startIndex;

              // We want to remove first item if it's a divider
              // @ts-ignore
              if (firstToolbarItem.kind === 'divider') {
                actualIndex += 1;
              }

              return combinedItems.slice(actualIndex).map(item => item.overflowItem || item.toolbarItem);
            }}
          />
        </Ref>
        <Toolbar items={[{ key: 'trash', icon: <TrashCanIcon {...{ outline: true }} /> }]} />
      </Flex>
    </>
  );
};

EditorToolbar.defaultProps = {
  target: document,
};

export default EditorToolbar;
