import * as React from 'react';
import { List } from '@fluentui/react-northstar';
// import { RosterAvatar } from './RosterAvatar';
import { useJitterState } from './hooks/useJitterState';
import { RosterUserName } from './RosterUsername';
import { RosterState } from './RosterState';
import { RosterMessage } from './RosterMessage';
import { withRosterActions } from './helpers/withRosterActions';
import { RosterSectionType, RosterVisuals } from './interface/roster.interface';

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
  toggleSelect: () => void;
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
  toggleSelect,
  selectIndicator,
  ...props
}) => {
  const isActive = useJitterState({
    from: 500,
    to: 2000,
    enabled: (type === 'presenters' || type === 'attendees') && !isMuted,
  });
  return (
    <List.Item
      media={selectIndicator}
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

export default function(
  Component,
  {
    isMuted,
    visuals,
    displayName,
    action,
    type,
    selectable,
    message,
    userId,
    selected,
    toggleSelect,
    selectIndicator,
    ...restProps
  },
) {
  // selectIndicator will be always undefined since we are using children prop. It should be moved up to TreeItem or find a better solution
  return (
    <Component {...restProps}>
      <RosterItemWithActions
        {...{
          isMuted,
          visuals,
          displayName,
          action,
          type,
          selectable,
          message,
          userId,
          selected,
          toggleSelect,
          selectIndicator,
        }}
      />
    </Component>
  );
}
