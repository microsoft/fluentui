import * as React from 'react';
import { List } from '@fluentui/react-northstar';
import { IRosterItemInternalProps } from './interface/roster.interface';
import { RosterAvatar } from './RosterAvatar';
import { RosterUserName } from './RosterUsername';
import { RosterState } from './RosterState';
import { RosterMessage } from './RosterMessage';
import { rosterListItemStyles } from './styles/styles';
import { withRosterActions } from './helpers/withRosterActions';
import { useJitterState } from './hooks/useJitterState';

const RosterItemInternal: React.FunctionComponent<IRosterItemInternalProps> = ({
  userId,
  visuals,
  displayName,
  action,
  isMuted,
  type,
}) => {
  const isActive = useJitterState({
    from: 500,
    to: 2000,
    enabled: (type === 'presenters' || type === 'attendees') && !isMuted,
  });
  return (
    <List.Item
      truncateHeader
      key={userId}
      media={<RosterAvatar isActive={isActive} visuals={visuals} />}
      header={<RosterUserName isActive={isActive} displayName={displayName} />}
      endMedia={<RosterState action={action} isMuted={isMuted} />}
      content={<RosterMessage />}
      styles={rosterListItemStyles}
    />
  );
};

export const RosterItem = withRosterActions(RosterItemInternal);
