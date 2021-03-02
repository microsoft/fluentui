import * as React from 'react';
import { treeAsListboxBehavior, Box, Tree, Button, Flex, Text } from '@fluentui/react-northstar';

const TreeActionsUsingPopup = ({ useMacAccessabilityBehavior }) => {
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
          return <TreeTitleModifyAriaDisableButton />;
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

  const TreeTitleModifyAriaDisableButton = () => {
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const buttonRef = React.useRef(null);
    const flexRef = React.useRef(null);

    return (
      <Box
        role={useMacAccessabilityBehavior ? 'option' : 'treeitem'}
        ref={flexRef}
        data-is-focusable={true}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            e.stopPropagation();
            setButtonDisabled(false);
            buttonRef.current.focus();
          }
        }}
      >
        <Flex fill vAlign="center">
          <Flex.Item size={'size.quarter'}>
            <Text content={'Tree item with button'} size="small" />
          </Flex.Item>
          <Button
            tabIndex={-1}
            data-is-focusable={!buttonDisabled}
            aria-hidden={buttonDisabled}
            role="application"
            aria-label="Mute all"
            aria-roledescription="button"
            ref={buttonRef}
            onKeyDown={e => {
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                e.stopPropagation();
                setButtonDisabled(true);
                flexRef.current.focus();
              }
            }}
            content={<Text size="small" content={'Mute all'} />}
          />
        </Flex>
      </Box>
    );
  };

  return (
    <Tree
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
