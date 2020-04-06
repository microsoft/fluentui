import * as React from 'react';
import { List, Checkbox } from '@fluentui/react-northstar';
// import { RosterAvatar } from './RosterAvatar';
import { useJitterState } from './hooks/useJitterState';
import { RosterUserName } from './RosterUsername';
import { RosterState } from './RosterState';
import { RosterMessage } from './RosterMessage';
import { withRosterActions } from './helpers/withRosterActions';
import { RosterSectionType, RosterVisuals } from './interface/roster.interface';
import withCustomComponent from './helpers/withCustomComponent';

export interface IRosterItemProps {
  userId: string;
  displayName: string;
  visuals: RosterVisuals;
  type: RosterSectionType;
  isMuted: boolean;
  message: string;
  selectable: boolean;
  selected: boolean;
  selectIndicator: any;
  id: string;
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
  selectable,
  message,
  userId,
  selected,
  ...props
}) => {
  const isActive = useJitterState({
    from: 500,
    to: 2000,
    enabled: (type === 'presenters' || type === 'attendees') && !isMuted,
  });

  return (
    <List.Item
      media={<Checkbox aria-label={displayName} checked={selected} />}
      header={<RosterUserName isActive={isActive} displayName={displayName} />}
      endMedia={<RosterState action={action} isMuted={isMuted} />}
      content={<RosterMessage message={message} />}
      key={userId}
      truncateHeader
      truncateContent
      selectable
      selected={selected}
      {...props}
    />
  );
};

const RosterItemWithActions = withRosterActions(RosterItemCustom);

export default withCustomComponent(RosterItemWithActions, [
  'isMuted',
  'visuals',
  'displayName',
  'action',
  'type',
  'selectable',
  'message',
  'userId',
  'selected',
]);
