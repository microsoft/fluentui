import * as React from 'react';
import { List } from '@fluentui/react-northstar';
import { RosterAvatar } from './RosterAvatar';
import { useJitterState } from './hooks/useJitterState';
import { RosterUserName } from './RosterUsername';
import { RosterState } from './RosterState';
import { RosterMessage } from './RosterMessage';
import { withRosterActions } from './helpers/withRosterActions';
import { RosterSectionType, RosterVisuals } from './interface/roster.interface';

export interface IRosterItemProps {
  id: string;
  userId: string;
  displayName: string;
  visuals: RosterVisuals;
  type: RosterSectionType;
  isMuted: boolean;
  message: string;
  selectable: boolean;
}

export interface IRosterItemInternalProps extends IRosterItemProps {
  action: React.ReactNode;
}

const RosterItemCustom: React.FunctionComponent<IRosterItemInternalProps> = ({
  isMuted,
  visuals,
  displayName,
  action,
  type,
  id,
  selectable,
  message,
  userId,

  ...props
}) => {
  const isActive = useJitterState({
    from: 500,
    to: 2000,
    enabled: (type === 'presenters' || type === 'attendees') && !isMuted,
  });
  return (
    <List.Item
      media={<RosterAvatar isActive={isActive} visuals={visuals} />}
      header={<RosterUserName isActive={isActive} displayName={displayName} />}
      endMedia={<RosterState action={action} isMuted={isMuted} />}
      content={<RosterMessage message={message} />}
      key={userId}
      truncateHeader
      truncateContent
      selectable
      {...props}
    />
  );
};

export default withRosterActions(RosterItemCustom);
