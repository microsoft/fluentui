import {
  Flex,
  Provider,
  ShorthandValue,
  Toolbar,
  ToolbarProps,
  ToolbarItemProps,
  ToolbarItemShorthandKinds,
  ToolbarMenuItemProps,
  ToolbarMenuItemShorthandKinds,
  teamsTheme,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
  TrashCanIcon,
  UnderlineIcon,
} from '@fluentui/react-icons-northstar';

type ToolbarItem = ShorthandValue<ToolbarItemProps & { kind?: keyof ToolbarItemShorthandKinds }>;
type OverflowItem = ShorthandValue<ToolbarMenuItemProps & { kind?: keyof ToolbarMenuItemShorthandKinds }>;

const FrameRenderer: React.FC<
  React.IframeHTMLAttributes<HTMLIFrameElement> & {
    children: (externalDocument: Document) => React.ReactElement;
  }
> = props => {
  const { children, ...rest } = props;
  const [node, setNode] = React.useState<HTMLIFrameElement>();

  React.useLayoutEffect(() => {
    if (node) {
      node.contentDocument.documentElement.style.fontSize = '14px';

      node.contentDocument.documentElement.style.height = '100%';
      node.contentDocument.documentElement.style.width = '100%';
      node.contentDocument.body.style.height = '100%';
      node.contentDocument.body.style.width = '100%';
    }
  }, [node]);

  return (
    <iframe {...rest} ref={setNode} title="iframe">
      {node && ReactDOM.createPortal(children(node.contentDocument), node.contentDocument.body)}
    </iframe>
  );
};

const EditorToolbar: React.FC<Pick<ToolbarProps, 'overflowSentinel'>> = ({ overflowSentinel }) => {
  const [overflowOpen, setOverflowOpen] = React.useState<boolean>(false);
  const overflowIndex = React.useRef<number>();

  const combinedItems: {
    toolbarItem: ToolbarItem;
    overflowItem?: OverflowItem;
  }[] = [
    { toolbarItem: { key: 'bold', icon: <BoldIcon /> } },
    { toolbarItem: { key: 'italic', icon: <ItalicIcon /> } },
    { toolbarItem: { key: 'underline', icon: <UnderlineIcon /> } },

    { toolbarItem: { key: 'divider-1', kind: 'divider' } },

    { toolbarItem: { key: 'highlight', icon: <HighlightIcon /> } },
    { toolbarItem: { key: 'font-color', icon: <FontColorIcon /> } },
    { toolbarItem: { key: 'font-size', icon: <FontSizeIcon /> } },

    {
      toolbarItem: { key: 'remove-format', icon: <RemoveFormatIcon /> },
      overflowItem: { key: 'remove-format', icon: <RemoveFormatIcon />, content: 'Clear formatting' },
    },
    { toolbarItem: { key: 'divider-2', kind: 'divider' } },

    {
      toolbarItem: { key: 'bullets', icon: <BulletsIcon /> },
      overflowItem: { key: 'bullets', icon: <BulletsIcon />, content: 'Bulleted list' },
    },
    {
      toolbarItem: { key: 'number-list', icon: <NumberListIcon /> },
      overflowItem: { key: 'number-list', icon: <NumberListIcon />, content: 'Number list' },
    },

    { toolbarItem: { key: 'divider-3', kind: 'divider' } },

    {
      toolbarItem: { key: 'link', icon: <LinkIcon /> },
      overflowItem: { key: 'link', icon: <LinkIcon />, content: 'Insert link' },
    },
    {
      toolbarItem: { key: 'code', icon: <CodeSnippetIcon /> },
      overflowItem: { key: 'code', icon: <CodeSnippetIcon />, content: 'Code snippet' },
    },
  ];

  return (
    <Flex>
      <Toolbar
        overflowSentinel={overflowSentinel}
        aria-label="visual test only with editor toolbar"
        styles={{ minWidth: 0, flexGrow: 1 }} // necessary for Toolbar with overflow inside a flex container
        items={_.map(combinedItems, 'toolbarItem')}
        overflow
        overflowItem={{ id: 'overflow-item' }}
        overflowOpen={overflowOpen}
        onOverflow={itemsVisible => {
          overflowIndex.current = itemsVisible - 1;
        }}
        onOverflowOpenChange={(e, { overflowOpen }) => setOverflowOpen(overflowOpen)}
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
      <Toolbar
        items={[
          {
            icon: <TrashCanIcon {...{ outline: true }} />,
            key: 'trash',
          },
        ]}
      />
    </Flex>
  );
};

const ToolbarExampleOverflowPositioningShorthand: React.FC<{ dir: 'ltr' | 'rtl' }> = ({ dir }) => (
  <FrameRenderer
    frameBorder="0"
    width="300px"
    height="300px"
    scrolling="no"
    style={{ border: '2px  dotted green', boxSizing: 'content-box' }}
  >
    {externalDocument => (
      <Provider
        dir={dir}
        styles={{ overflow: 'hidden', height: 'inherit', width: 'inherit' }}
        target={externalDocument}
        theme={teamsTheme}
      >
        <EditorToolbar />
      </Provider>
    )}
  </FrameRenderer>
);

export default ToolbarExampleOverflowPositioningShorthand;
