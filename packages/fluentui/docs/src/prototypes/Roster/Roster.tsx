import * as React from 'react';
import { Tree, TreeItemProps, Flex } from '@fluentui/react';
import { RosterItemData, RosterSectionType } from './interface/roster.interface';
import { RosterItem } from './RosterItem';
import { withTreeItemMemo } from './helpers/withTreeItemMemo';
import { ActionsContext } from './actionsContext';
import { initialRosterData } from './data/initialRosterData';
import { lexCompareData } from './helpers/utils';
import { RosterSectionTitle } from './RosterTitle';
import { useRosterActions } from './hooks/useRosterActions';
import { rosterStyles, rosterTreeStyles, rosterSectionStyles } from './styles/styles';

export const Roster: React.FunctionComponent<{}> = () => {
  return (
    <Flex styles={rosterStyles}>
      <RosterContent />
    </Flex>
  );
};

const RosterContent: React.FunctionComponent<{}> = () => {
  const [rosterData, setRosterData] = React.useState(initialRosterData);

  const { presenters: _presenters, attendees: _attendees, suggestions: _suggestions } = rosterData;

  const presenters = getSection('presenters', Array.from(_presenters.values()).sort(lexCompareData));
  const attendees = getSection('attendees', Array.from(_attendees.values()).sort(lexCompareData));
  const suggestions = getSection('suggestions', Array.from(_suggestions.values()).sort(lexCompareData));

  const actions = useRosterActions(rosterData, setRosterData);

  return (
    <ActionsContext.Provider value={actions}>
      <Tree
        as="div"
        items={[presenters, attendees, suggestions]}
        defaultActiveItemIds={['presenters', 'attendees', 'suggestions']}
        styles={rosterTreeStyles}
      />
    </ActionsContext.Provider>
  );
};

const customItemPropsArray: (keyof React.ComponentProps<typeof RosterItem>)[] = ['userId', 'visuals', 'displayName', 'type', 'isMuted'];
const TreeItemMemo = withTreeItemMemo(RosterItem, customItemPropsArray);

const getItem: (type: RosterSectionType, data: RosterItemData) => TreeItemProps = (type, data) => {
  const { userId, displayName, visuals, isMuted } = data;
  return {
    id: userId,
    children: (_, props) => (
      <TreeItemMemo {...props} key={userId} userId={userId} displayName={displayName} visuals={visuals} type={type} isMuted={isMuted} />
    )
  };
};

const getSection: (type: RosterSectionType, data: RosterItemData[]) => TreeItemProps = (type, data) => {
  return {
    id: type,
    title: <RosterSectionTitle type={type} />,
    items: data.map(d => getItem(type, d)),
    styles: rosterSectionStyles
  };
};
