import * as React from 'react';
import { IRosterItemInternalProps, IRosterItemProps } from '../interface/roster.interface';
import { useActions } from '../actionsContext';
import {
  ShorthandCollection,
  MenuItemProps,
  MenuShorthandKinds,
  Text,
  IconProps,
  Popup,
  Menu,
  Button,
} from '@fluentui/react-northstar';
import { rosterMenuPopupStyles } from '../styles/styles';

export const withRosterActions: (
  C: React.ComponentType<IRosterItemInternalProps>,
) => React.ComponentType<IRosterItemProps> = Component => props => {
  const { promote, demote, mute, unmute } = useActions();

  const [isOpen, setOpen] = React.useState(false);
  const [isContextOpen, setContextOpen] = React.useState(false);

  const { userId, type, isMuted } = props;

  const closeAll = () => {
    setOpen(false);
    setContextOpen(false);
  };

  const items: ShorthandCollection<MenuItemProps, MenuShorthandKinds> = [];

  if (props.type === 'attendees') {
    items.push({
      key: 'promote',
      content: <Text content="Promote" />,
      icon: {
        name: 'presenter',
        outline: true,
        xSpacing: 'after',
      } as IconProps,
      onClick: () => promote(userId),
    });
  } else if (type === 'presenters') {
    items.push({
      key: 'demote',
      content: <Text content="Demote" />,
      icon: {
        name: 'no-presenter',
        outline: true,
        xSpacing: 'after',
      } as IconProps,
      onClick: () => demote(userId),
    });
  }

  if (type !== 'suggestions') {
    items.push({
      key: 'mute',
      content: <Text content={isMuted ? 'Unmute' : 'Mute'} />,
      icon: {
        name: isMuted ? 'mic' : 'mic-off',
        outline: true,
        xSpacing: 'after',
      } as IconProps,
      onClick: () => (isMuted ? unmute(userId) : mute(userId)),
    });
  }

  if (!items.length) {
    return <Component {...props} action={null} />;
  }

  const menu = <Menu vertical items={items} onItemClick={closeAll} />;

  const actionButton = (
    <Popup
      open={isOpen}
      on="click"
      onOpenChange={(_, { open }) => setOpen(open)}
      position="below"
      align="end"
      trigger={
        <Button
          iconOnly
          text
          onClick={() => (isOpen ? setOpen(false) : setOpen(true))}
          variables={{
            isCallingSidePanelIconOnlyButton: true,
            isCallingRosterPopupButton: true,
          }}
          className="show-only-on-list-item-hover"
          icon="more"
          data-cid="ts-participant-action-button"
        />
      }
      content={{ content: menu, variables: rosterMenuPopupStyles }}
    />
  );

  return (
    <Popup
      open={isContextOpen}
      on="context"
      onOpenChange={(_, { open }) => setContextOpen(open)}
      trigger={
        <div>
          <Component {...props} action={actionButton} />
        </div>
      }
      content={{ content: menu, variables: rosterMenuPopupStyles }}
    />
  );
};
