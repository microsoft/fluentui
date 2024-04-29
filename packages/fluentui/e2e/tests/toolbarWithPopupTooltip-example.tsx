import * as React from 'react';
import { Toolbar, Tooltip, HighlightIcon, FontColorIcon } from '@fluentui/react-northstar';

export const clickSelectors = {
  triggerId: 'trigger-click',
  contentId: 'content-click',
  popupId: 'popup-click',
};

export const hoverSelectors = {
  triggerId: 'trigger-hover',
  contentId: 'content-hover',
  popupId: 'popup-hover',
};

const ToolbarWithPopupTooltipExample = () => {
  const [fontOpen, setFontOpen] = React.useState(false);
  const [highlightOpen, sethHighlightOpen] = React.useState(false);

  return (
    <Toolbar
      aria-label="Toolbar can contain a popup"
      items={[
        {
          icon: <FontColorIcon outline />,
          key: 'font-color',
          title: 'Font color',
          active: fontOpen,
          popup: {
            position: 'after',
            content: {
              content: 'Font color Popup',
              id: clickSelectors.popupId,
            },
            onOpenChange: (_e, { open }) => {
              setFontOpen(open);
            },
            open: fontOpen,
          },
          children: (Component, props) => (
            <Tooltip
              content={{ content: 'Font color Tooltip', id: clickSelectors.contentId }}
              trigger={<Component {...props} />}
            />
          ),
          id: clickSelectors.triggerId,
        },
        {
          icon: <HighlightIcon outline />,
          key: 'highlight',
          title: 'Highlight',
          active: highlightOpen,
          popup: {
            position: 'after',
            content: {
              content: 'Highlight Popup',
              id: hoverSelectors.popupId,
            },
            onOpenChange: (_e, { open }) => {
              sethHighlightOpen(open);
            },
            open: highlightOpen,
            on: ['hover', 'context'],
            mouseLeaveDelay: 200,
          },
          children: (Component, props) => (
            <Tooltip
              content={{ content: 'Highlight Tooltip', id: hoverSelectors.contentId }}
              trigger={<Component {...props} />}
            />
          ),
          id: hoverSelectors.triggerId,
        },
      ]}
    />
  );
};

export default ToolbarWithPopupTooltipExample;
