import * as React from 'react';
import { Tree, Flex } from '@fluentui/react-northstar';
import { ActionsContext } from './actionsContext';
import { initialRosterData } from './data/initialRosterData';
import { useRosterActions } from './hooks/useRosterActions';
import { rosterStyles, rosterTreeStyles } from './styles/styles';

export const Roster: React.FunctionComponent<{}> = () => {
  const [rosterData, setRosterData] = React.useState(initialRosterData);
  const actions = useRosterActions(rosterData, setRosterData);

  return (
    <Flex styles={rosterStyles}>
      <ActionsContext.Provider value={actions}>
        <Tree items={rosterData} styles={rosterTreeStyles} />
      </ActionsContext.Provider>
    </Flex>
  );
};
