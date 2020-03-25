import * as React from 'react';
import { List } from '@fluentui/react-northstar';
import { RosterAvatar } from './RosterAvatar';
import { RosterUserName } from './RosterUsername';
import { RosterState } from './RosterState';
import { RosterMessage } from './RosterMessage';
import { rosterListItemStyles } from './styles/styles';
import { withRosterActions } from './helpers/withRosterActions';
import { useJitterState } from './hooks/useJitterState';
import { RosterSectionType, RosterVisuals } from './interface/roster.interface';

export interface IRosterItemProps {
  id: string;
  userId: string;
  displayName: string;
  visuals: RosterVisuals;
  type: RosterSectionType;
  isMuted: boolean;
}

export interface IRosterItemInternalProps extends IRosterItemProps {
  action: React.ReactNode;
}

const RosterItemInternal: React.FunctionComponent<IRosterItemInternalProps> = ({
  userId,
  visuals,
  displayName,
  action,
  isMuted,
  type,
  id,
  ...restProps
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
      {...restProps}
    />
  );
};

export const RosterItem = withRosterActions(RosterItemInternal);
