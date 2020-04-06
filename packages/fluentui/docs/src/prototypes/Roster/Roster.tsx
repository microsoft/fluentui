import * as React from 'react';
import { Tree, Flex } from '@fluentui/react-northstar';
import { ActionsContext } from './actionsContext';
import initialRosterData from './data/initialRosterData';
import { useRosterActions } from './hooks/useRosterActions';
import { rosterStyles, rosterTreeStyles } from './styles/styles';
import RosterCheckbox from './RosterCheckbox';

export const Roster: React.FunctionComponent<{}> = () => {
  const [rosterData, setRosterData] = React.useState(initialRosterData);
  const actions = useRosterActions(rosterData, setRosterData);
  const items = [
    {
      id: 'tree-item-1',
      title: 'House Lannister',
      items: [
        {
          id: 'tree-item-11',
          title: 'Tywin',
          selectableParent: true,
          selectionIndicator: { content: 'select all' },
          items: [
            {
              id: 'tree-item-111',
              title: 'Jaime',
            },
            {
              id: 'tree-item-112',
              title: 'Cersei',
            },
            {
              id: 'tree-item-113',
              title: 'Tyrion',
            },
          ],
        },
        {
          id: 'tree-item-12',
          title: 'Kevan',
          items: [
            {
              id: 'tree-item-121',
              title: 'Lancel',
            },
            {
              id: 'tree-item-122',
              title: 'Willem',
            },
            {
              id: 'tree-item-123',
              title: 'Martyn',
            },
          ],
        },
      ],
    },
    {
      id: 'tree-item-2',
      title: 'House Targaryen',
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
              selectable: false,
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <Flex styles={rosterStyles}>
        <Tree items={items} styles={rosterTreeStyles} selectable />
      </Flex>
      <Flex styles={rosterStyles}>
        <Tree items={items} styles={rosterTreeStyles} selectable customSelectIndicator={RosterCheckbox} />
      </Flex>
      <Flex styles={rosterStyles}>
        <ActionsContext.Provider value={actions}>
          <Tree items={rosterData} styles={rosterTreeStyles} selectable />
        </ActionsContext.Provider>
      </Flex>
    </>
  );
};
