import * as React from 'react';
import {
  Toolbar,
  Tooltip,
  ToolbarItemShorthandKinds,
  tooltipAsLabelBehavior,
  ToolbarItemProps,
  ToolbarDividerProps,
  ToolbarMenuItemProps,
} from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import { BoldIcon, CodeSnippetIcon, ItalicIcon, MoreIcon, QuoteIcon } from '@fluentui/react-icons-northstar';

type IntermediateToolbarItem = (ToolbarItemProps | ToolbarMenuItemProps | ToolbarDividerProps) & {
  key: string;
  kind?: keyof ToolbarItemShorthandKinds;
  tooltip?: string;
};

const ToolbarExampleShorthand = () => {
  const [isBold, setBold] = useBooleanKnob({ name: 'bold', initialValue: true });
  const [isItalic, setItalic] = useBooleanKnob({ name: 'isItalic', initialValue: false });

  const [moreMenuOpen, setMoreMenuOpen] = useBooleanKnob({
    name: 'moreMenuOpen',
    initialValue: false,
  });

  const intermediateItems: IntermediateToolbarItem[] = [
    {
      key: 'bold',
      kind: 'toggle' as const,
      active: isBold,
      tooltip: 'Bold',
      icon: <BoldIcon outline />,
      onClick: () => setBold(!isBold),
    },
    {
      key: 'italic',
      kind: 'toggle' as const,
      active: isItalic,
      tooltip: 'Italic',
      icon: <ItalicIcon outline />,
      onClick: () => setItalic(!isItalic),
    },
    { key: 'divider1', kind: 'divider' as const },
    {
      key: 'more',
      icon: <MoreIcon outline />,
      active: moreMenuOpen,
      tooltip: 'More options',
      menu: [
        {
          key: 'quote',
          content: 'Quote',
          icon: <QuoteIcon />,
        },
        {
          key: 'code-snippet',
          content: 'Code snippet',
          icon: <CodeSnippetIcon />,
        },
      ],
      menuOpen: moreMenuOpen,
      onMenuOpenChange: (e, { menuOpen }) => setMoreMenuOpen(menuOpen),
    },
  ];

  return (
    <Toolbar
      aria-label="With tooltips"
      items={intermediateItems.map(
        (item): ToolbarItemProps => ({
          ...item,
          // rendering Tooltip for the Toolbar Item
          children: item.tooltip
            ? (ToolbarItem, props) => {
                const { tooltip, key, ...rest } = props;
                // Adding tooltipAsLabelBehavior as the ToolbarItems contains only icon
                return (
                  <Tooltip
                    key={key}
                    trigger={<ToolbarItem {...rest} />}
                    accessibility={tooltipAsLabelBehavior}
                    content={tooltip}
                  />
                );
              }
            : undefined,
        }),
      )}
    />
  );
};

export default ToolbarExampleShorthand;
