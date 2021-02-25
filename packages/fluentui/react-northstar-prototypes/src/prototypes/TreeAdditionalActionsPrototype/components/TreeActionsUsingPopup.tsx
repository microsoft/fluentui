import * as React from 'react';
import { Tree, Popup, Button, Flex, Text, treeAsListboxBehavior } from '@fluentui/react-northstar';

const items = [
  {
    id: 'tree-item-0',
    title: 'House Targaryen',
    items: [
      {
        id: 'tree-item-01',
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-011',
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-012',
            title: 'Viserys',
          },
          {
            id: 'tree-item-013',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-1',
    title: {
      children: (C, p) => {
        return <TreeTitleWithPopupButton />;
      },
    },
    items: [],
  },
  {
    id: 'tree-item-2',
    title: 'House Targaryen 2',
    items: [
      {
        id: 'tree-item-21',
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-211',
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-212',
            title: 'Viserys',
          },
          {
            id: 'tree-item-213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
  {
    id: 'tree-item-3',
    title: 'House Targaryen 3',
    items: [
      {
        id: 'tree-item-31',
        title: 'Aerys',
        items: [
          {
            id: 'tree-item-311',
            title: 'Rhaegar',
          },
          {
            id: 'tree-item-312',
            title: 'Viserys',
          },
          {
            id: 'tree-item-313',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
];

const TreeTitleWithPopupButton = () => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);

  return (
    <Flex
      data-is-focusable={true}
      onKeyDown={e => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopPropagation();
          setPopupOpen(true);
        }
      }}
      fill
      vAlign="center"
    >
      <Flex.Item size={'size.quarter'}>
        <Text content={'Tree item title'} size="small" />
      </Flex.Item>
      <Popup
        position="above"
        align="start"
        offset={({ popper }) => [0, -popper.height]}
        trapFocus
        content={
          <Button
            content="Mute all"
            aria-hidden={!popupOpen}
            onClick={() => {
              setPopupOpen(false);
            }}
            onKeyDown={e => {
              if (e.key === 'ArrowLeft') {
                setPopupOpen(false);
              }
            }}
          />
        }
        onOpenChange={(e, data) => setPopupOpen(data.open)}
        open={popupOpen}
        target={wrapperRef.current}
      />
      <Button
        data-cid={'calling_roster_button_mute_all'}
        tabIndex={-1}
        data-is-focusable={false}
        aria-hidden={true}
        key={'muteAll'}
        ref={wrapperRef}
        styles={{
          visibility: popupOpen ? 'hidden' : 'visible',
        }}
        variables={{ isCallingRosterSectionAction: true }}
        content={<Text size="small" content={'Mute all'} />}
      />
    </Flex>
  );
};

const TreeActionsUsingPopup = ({ useMacAccessabilityBehavior }) => {
  return (
    <Tree
      aria-expanded="true"
      accessibility={useMacAccessabilityBehavior ? treeAsListboxBehavior : undefined}
      tabIndex={0}
      aria-setsize={4}
      aria-posinset={1}
      aria-level={1}
      data-is-focusable={true}
      items={items}
    />
  );
};

export default TreeActionsUsingPopup;
